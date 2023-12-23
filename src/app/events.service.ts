import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private fs: Firestore, private authService: AuthenticationService) { }

  addEvent(name: string, year: number) {
    if(!this.authService.user) {
      return
    }
    const uid = this.authService.user.uid; 
    const eventCollection = collection(this.fs, `users/${uid}/${year}`);
    addDoc(eventCollection, {name: name});
  }

  getEventsforYear(year: number) {
    let uid: string | null = '';
    if(this.authService.user) uid = this.authService.user.uid;
    else uid = localStorage.getItem('uid');
    const eventsCol = collection(this.fs, `users/${uid}/${year}`);
    return collectionData(eventsCol, {idField: 'id'});
  }

  removeEvent(year: number, id: string) {
    let uid: string | null = '';
    if(!this.authService.user) {
      uid = localStorage.getItem('uid');
    } else {
      uid = this.authService.user.uid;
    }
    const docRef = doc(this.fs, `users/${uid}/${year}/${id}`);
    deleteDoc(docRef);
  }
}
