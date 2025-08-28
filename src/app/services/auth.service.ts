import { Injectable, inject, NgZone } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, user, updateProfile } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc, updateDoc, collection } from '@angular/fire/firestore';
import { Observable, from, map, of, switchMap } from 'rxjs';
import { User, Team } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  private zone: NgZone = inject(NgZone);

  async login(email: string, password: string): Promise<void> {
    try {
      console.log('Attempting login...');
      const credential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('Firebase auth successful');

      if (credential.user) {
        const userDoc = doc(this.firestore, 'users', credential.user.uid);
        const userSnap = await getDoc(userDoc);
        
        if (!userSnap.exists()) {
          console.error('User document not found in Firestore');
          throw new Error('User data not found. Please register again.');
        }

        console.log('Updating last login...');
        await updateDoc(userDoc, {
          lastLogin: new Date()
        });
        console.log('Login successful');
      } else {
        console.error('No user returned from Firebase auth');
        throw new Error('Login failed. Please try again.');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        throw new Error('Invalid email or password');
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Too many failed attempts. Please try again later');
      }
      throw error;
    }
  }

  async register(email: string, password: string, username: string, team: Team): Promise<void> {
    let firebaseUser = null;
    try {
      console.log('Starting registration process...');
      
      // First create the auth account
      const credential = await createUserWithEmailAndPassword(this.auth, email, password);
      console.log('Firebase auth account created');

      if (!credential.user) {
        throw new Error('Registration failed: No user created');
      }

      firebaseUser = credential.user;

      // Update the user profile
      console.log('Updating user profile...');
      await updateProfile(firebaseUser, {
        displayName: username
      });
      console.log('Profile updated');

      // Create user document with proper metadata
      const userData = {
        uid: firebaseUser.uid,
        email,
        displayName: username,
        team,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        lastTeamSwitch: new Date().toISOString()
      };
      
      // Create the user document with merge option to handle potential race conditions
      const userDoc = doc(this.firestore, 'users', firebaseUser.uid);
      console.log('Creating Firestore document...');
      await setDoc(userDoc, userData, { merge: true });
      
      console.log('Registration complete');
    } catch (error: any) {
      console.error('Registration error:', error);
      // If we fail after creating the auth account but before completing setup,
      // try to clean up the auth account
      try {
        if (firebaseUser) {
          await firebaseUser.delete();
        }
      } catch (deleteError) {
        console.error('Failed to clean up incomplete registration:', deleteError);
      }
      throw error;
    }
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  async switchTeam(userId: string, newTeam: Team): Promise<{ success: boolean; message: string }> {
    const userDoc = doc(this.firestore, 'users', userId);
    const userSnap = await getDoc(userDoc);
    
    if (!userSnap.exists()) {
      return { success: false, message: 'User not found' };
    }

    const userData = userSnap.data() as User;
    const lastSwitch = userData.lastTeamSwitch || new Date(0);
    const cooldownDays = 3;
    const cooldownMs = cooldownDays * 24 * 60 * 60 * 1000;
    const now = new Date();

    if (now.getTime() - lastSwitch.getTime() < cooldownMs) {
      const remainingDays = Math.ceil((cooldownMs - (now.getTime() - lastSwitch.getTime())) / (24 * 60 * 60 * 1000));
      return { 
        success: false, 
        message: `Team switch is on cooldown. Please wait ${remainingDays} days before switching teams.`
      };
    }

    await updateDoc(userDoc, {
      team: newTeam,
      lastTeamSwitch: now
    });

    return { success: true, message: 'Team switched successfully' };
  }

  getCurrentUser(): Observable<User | null> {
    return new Observable(subscriber => {
      this.zone.runOutsideAngular(() => {
        return user(this.auth).pipe(
          switchMap(firebaseUser => {
            if (!firebaseUser) return of(null);
            
            return from(getDoc(doc(this.firestore, 'users', firebaseUser.uid))).pipe(
              map(docSnap => {
                if (!docSnap.exists()) return null;
                const userData = docSnap.data() as User;
                return {
                  ...userData,
                  uid: firebaseUser.uid,
                  email: firebaseUser.email || '',
                  displayName: userData.displayName || firebaseUser.displayName || ''
                };
              })
            );
          })
        ).subscribe({
          next: (user) => this.zone.run(() => subscriber.next(user)),
          error: (error) => this.zone.run(() => subscriber.error(error)),
          complete: () => this.zone.run(() => subscriber.complete())
        });
      });
    });
  }
}
