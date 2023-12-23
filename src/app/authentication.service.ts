import { Injectable } from '@angular/core';
import { Auth, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth'
import { doc, Firestore, setDoc} from '@angular/fire/firestore'
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: User | null = null
  
  constructor(private auth: Auth, private fs: Firestore) {
    this.auth.onAuthStateChanged((user) => {
      if(user) {
        this.user = user;
        localStorage.setItem('uid', user.uid);
      }
    });
  }

  async createUserWithEmail(email: string, password: string) {
    const uid = (await createUserWithEmailAndPassword(this.auth, email, password)).user.uid;
    const userDocRef = doc(this.fs, `users/${uid}`);
    await setDoc(userDocRef, {})
    return {'success': 1, uid: uid}
  }

  logout() {
    signOut(this.auth)
    localStorage.removeItem('uid');
  }

  async login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  getUid() {
    if(this.user) return this.user.uid;
    else return localStorage.getItem('uid');
  }
}
