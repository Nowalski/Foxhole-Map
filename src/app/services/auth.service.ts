import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { Firestore, doc, setDoc, collection } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);

  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password);
  }

  async register(email: string, password: string, username: string): Promise<void> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    if (credential.user) {
      const userDoc = doc(this.firestore, 'users', credential.user.uid);
      await setDoc(userDoc, {
        email,
        username,
        createdAt: new Date(),
        lastLogin: new Date()
      });
    }
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  getCurrentUser(): Observable<User | null> {
    return user(this.auth).pipe(
      map(firebaseUser => {
        if (!firebaseUser) return null;
        return {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || ''
        };
      })
    );
  }
}
