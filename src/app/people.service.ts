import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private fs: Firestore, private authService: AuthenticationService) { }

  addPerson(person: Person) {
    const uid = this.authService.getUid()
    const personCol = collection(this.fs, `users/${uid}/people`);
    addDoc(personCol, person)
  }

  getAllPeople() {
    const uid = this.authService.getUid()
    const peopleCol = collection(this.fs, `users/${uid}/people`);
    return collectionData(peopleCol, {idField: 'id'});
  }
}

export interface Person {
  name: string
  dob: Date
}