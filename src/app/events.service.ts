import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, deleteDoc, getDoc, updateDoc } from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private fs: Firestore, private authService: AuthenticationService) { }

  addEvent(name: string, year: number) {
    const uid = this.authService.getUid()
    const eventCollection = collection(this.fs, `users/${uid}/${year}`);
    addDoc(eventCollection, {name: name});
  }

  async getEvent(year: string, id: string) {
    const uid = this.authService.getUid()
    const eventRef = doc(this.fs, `/users/${uid}/${year}/${id}`);
    const eventSnap = await getDoc(eventRef)
    return eventSnap
  }

  getEventsforYear(year: number) {
    const uid = this.authService.getUid()
    const eventsCol = collection(this.fs, `users/${uid}/${year}`);
    return collectionData(eventsCol, {idField: 'id'});
  }

  removeEvent(year: number, id: string) {
    const uid = this.authService.getUid()
    const docRef = doc(this.fs, `users/${uid}/${year}/${id}`);
    deleteDoc(docRef);
  }

  addPersonToEvent(year: string, eventId: string, people: (string| undefined)[]) {
    const uid = this.authService.getUid()
    const docRef = doc(this.fs, `users/${uid}/${year}/${eventId}`);
    updateDoc(docRef, {people: people})

  }
}
