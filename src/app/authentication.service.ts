import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth'
import { doc, Firestore, setDoc} from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private auth: Auth, private fs: Firestore) { }

  async createUserWithEmail(email: string, password: string) {
    const uid = (await createUserWithEmailAndPassword(this.auth, email, password)).user.uid;
    const userDocRef = doc(this.fs, `users/${uid}`);
    await setDoc(userDocRef, {})
    return {'success': 1, uid: uid}
  }

  logout() {
    signOut(this.auth)
  }

  async login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
  }
}
