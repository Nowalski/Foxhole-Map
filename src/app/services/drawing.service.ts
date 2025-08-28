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
  };
  timestamp: number;
  team?: 'colonial' | 'warden' | 'neutral';
  description?: string;
  visibility: 'public' | 'team' | 'private';
  tags: string[];
}

@Injectable({
  providedIn: 'root'
})
export class DrawingService {
  private activeFeatures = new BehaviorSubject<Map<string, Feature>>(new Map());
  private userTeam = new BehaviorSubject<'colonial' | 'warden' | null>(null);
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

      const q = query(
        this.drawingsCollection,
        where('visibility', 'in', ['public', 'team']),
        where('timestamp', '>', Date.now() - 24 * 60 * 60 * 1000) // Last 24h
      );

      onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const data = change.doc.data() as DrawingFeature;
          
          // Filter based on visibility and team
          if (data.visibility === 'team' && data.team !== team) return;

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
    const user = await firstValueFrom(this.authService.getCurrentUser());
    if (!user) throw new Error('Must be logged in to draw');

    const drawingData = {
      ...feature,
      creator: {
        uid: user.uid,
        displayName: user.displayName
      },
      timestamp: Date.now(),
      team: this.userTeam.value
    };

    const docRef = await addDoc(this.drawingsCollection, drawingData);
    return docRef.id;
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

    const docRef = doc(this.firestore, 'drawings', id);
    await updateDoc(docRef, updates);
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
      geometry: new Point(data.coordinates[0])
    });
    
    if (data.style) {
      feature.setStyle(new Style(data.style));
    }
    
    // Store the original drawing data for reference
    feature.set('drawingData', data);
    return feature;
  }

  setUserTeam(team: 'colonial' | 'warden' | null): void {
    this.userTeam.next(team);
  }

  getActiveFeatures(): Observable<Feature[]> {
    return this.activeFeatures.pipe(
      map(features => Array.from(features.values()))
    );
  }
}
