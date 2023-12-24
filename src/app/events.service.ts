import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, deleteDoc, getDoc, updateDoc } from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private fs: Firestore, private authService: AuthenticationService) { }

  addEvent(name: string, year: number) {
    const uid = this.authService.getUid();
    const eventCollection = collection(this.fs, `users/${uid}/${year}`);
    addDoc(eventCollection, {name: name});
  }

  async getEvent(year: string, id: string) {
    const uid = this.authService.getUid();
    const eventRef = doc(this.fs, `/users/${uid}/${year}/${id}`);
    const eventSnap = await getDoc(eventRef);
    return eventSnap;
  }

  getEventsforYear(year: number) {
    const uid = this.authService.getUid();
    const eventsCol = collection(this.fs, `users/${uid}/${year}`);
    return collectionData(eventsCol, {idField: 'id'});
  }

  removeEvent(year: number, id: string) {
    const uid = this.authService.getUid();
    const docRef = doc(this.fs, `users/${uid}/${year}/${id}`);
    deleteDoc(docRef);
  }

  async addPersonToEvent(year: string, eventId: string, person: personInEvent) {
    const uid = this.authService.getUid();
    const docRef = doc(this.fs, `users/${uid}/${year}/${eventId}`);
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()) {
      const peopleAdd = docSnap.get('people')
      if(peopleAdd) {
        peopleAdd.push(person);
        updateDoc(docRef, {people: peopleAdd})
      } else updateDoc(docRef, {people: [person]});
    }

  }

  async addStages(year: string, eventId:string, stages: string[]) {
    const uid = this.authService.getUid();
    const eventRef = doc(this.fs, `users/${uid}/${year}/${eventId}`);
    const eventSnap = await getDoc(eventRef);
    if(eventSnap.exists()) {
      const existingStages = eventSnap.get('stages');
      let merged = [];
      if(existingStages) {
        merged = stages.concat(existingStages);
      } else {
        merged = stages;
      }
      updateDoc(eventRef, {stages: merged})
    }
  }

  saveStages(year: string,  eventId: string, peopleStages: personInEvent[]) {
    const uid = this.authService.getUid();
    const eventRef = doc(this.fs, `users/${uid}/${year}/${eventId}`)
    updateDoc(eventRef, {people: peopleStages})
  }
}

export interface personInEvent {
  id: string
  completedTasks: number[]
}
