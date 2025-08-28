import { Injectable, inject } from '@angular/core';
import { 
  Firestore, 
  collection, 
  query, 
  where, 
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  CollectionReference,
  DocumentData
} from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Feature } from 'ol';
import { Style } from 'ol/style';
import { Point } from 'ol/geom';
import { Vector as VectorSource } from 'ol/source';

export interface DrawingFeature {
  id?: string;
  type: string;
  coordinates: number[][];
  style: any;
  creator: {
    uid: string;
    displayName: string;
    team: 'Colonial' | 'Warden' | null;
  };
  timestamp: number;
  team: 'Colonial' | 'Warden' | 'Neutral';
  description?: string;
  visibility: 'Public' | 'Team' | 'Private';
  tags: string[];
  lastModified?: number;
  lastModifiedBy?: {
    uid: string;
    displayName: string;
    team: 'Colonial' | 'Warden' | null;
  };
}

@Injectable({
  providedIn: 'root'
})
export class DrawingService {
  private activeFeatures = new BehaviorSubject<Map<string, Feature>>(new Map());
  private userTeam = new BehaviorSubject<'Colonial' | 'Warden' | null>(null);
  private firestore: Firestore = inject(Firestore);
  private authService: AuthService = inject(AuthService);
  private drawingsCollection: CollectionReference<DocumentData>;

  constructor() {
    this.drawingsCollection = collection(this.firestore, 'drawings');
    this.setupRealtimeSync();
  }

  private setupRealtimeSync(): void {
    combineLatest([
      this.authService.getCurrentUser(),
      this.userTeam
    ]).subscribe(([user, team]) => {
      if (!user) return;

      // Get all drawings without filtering
      const q = query(this.drawingsCollection);

      onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const data = change.doc.data() as DrawingFeature;
          
          if (change.type === 'added' || change.type === 'modified') {
            this.updateFeature(change.doc.id, data);
          } else if (change.type === 'removed') {
            this.removeFeature(change.doc.id);
          }
        });
      });
    });
  }

  async addDrawing(feature: DrawingFeature): Promise<string> {
    try {
      const user = await firstValueFrom(this.authService.getCurrentUser());
      if (!user) throw new Error('Must be logged in to draw');
      
      const team = this.userTeam.value;
      if (!team) throw new Error('Must select a team to draw');

      const drawingData = {
        ...feature,
        creator: {
          uid: user.uid,
          displayName: user.displayName,
          team: team
        },
        timestamp: Date.now(),
        lastModified: Date.now(),
        team: team,
        visibility: 'Public',  // Make all drawings public by default
        lastModifiedBy: {
          uid: user.uid,
          displayName: user.displayName,
          team: team
        }
      };

      console.log('Saving drawing:', drawingData);
      const docRef = await addDoc(this.drawingsCollection, drawingData);
      console.log('Drawing saved with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error adding drawing:', error);
      throw error;
    }
  }

  getDrawings(): Observable<DrawingFeature[]> {
    return new Observable<DrawingFeature[]>(observer => {
      const q = query(this.drawingsCollection);
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const drawings = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as DrawingFeature));
        observer.next(drawings);
      }, error => {
        observer.error(error);
      });
      
      return unsubscribe;
    });
  }

  async updateDrawing(id: string, updates: Partial<DrawingFeature>): Promise<void> {
    const user = await firstValueFrom(this.authService.getCurrentUser());
    if (!user) throw new Error('Must be logged in to update drawings');

    const team = this.userTeam.value;
    if (!team) throw new Error('Must be part of a team to update drawings');

    const docRef = doc(this.firestore, 'drawings', id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error('Drawing not found');
    }

    const drawing = docSnap.data() as DrawingFeature;

    // Check permissions
    if (drawing.visibility === 'Private' && drawing.creator.uid !== user.uid) {
      throw new Error('Cannot modify private drawings of other users');
    }

    if (drawing.visibility === 'Team' && drawing.team !== team) {
      throw new Error('Cannot modify drawings from other teams');
    }

    const updateData = {
      ...updates,
      lastModified: Date.now(),
      lastModifiedBy: {
        uid: user.uid,
        displayName: user.displayName,
        team
      }
    };

    // Prevent changing visibility of team drawings to private
    if (updateData.visibility === 'Private') {
      delete updateData.visibility;
    }

    await updateDoc(docRef, updateData);
  }

  async deleteDrawing(id: string): Promise<void> {
    const user = await firstValueFrom(this.authService.getCurrentUser());
    if (!user) throw new Error('Must be logged in to delete drawings');

    const docRef = doc(this.firestore, 'drawings', id);
    await deleteDoc(docRef);
  }

  private updateFeature(id: string, data: DrawingFeature) {
    const features = this.activeFeatures.value;
    // Convert DrawingFeature to OpenLayers Feature
    const olFeature = this.convertToOLFeature(data);
    features.set(id, olFeature);
    this.activeFeatures.next(features);
  }

  private removeFeature(id: string) {
    const features = this.activeFeatures.value;
    features.delete(id);
    this.activeFeatures.next(features);
  }

  private convertToOLFeature(data: DrawingFeature): Feature {
    const feature = new Feature({
      geometry: new Point(data.coordinates[0]),
      ...data  // Include all drawing data in the feature
    });
    
    if (data.style) {
      try {
        const style = new Style(data.style);
        feature.setStyle(style);
      } catch (error) {
        console.error('Failed to set style:', error);
      }
    }
    
    // Store the original drawing data for reference
    feature.set('drawingData', data);
    return feature;
  }

  setUserTeam(team: 'Colonial' | 'Warden' | null): void {
    this.userTeam.next(team);
  }

  getActiveFeatures(): Observable<Feature[]> {
    return this.activeFeatures.pipe(
      map(features => Array.from(features.values()))
    );
  }
}
