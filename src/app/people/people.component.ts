import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PeopleService, Person } from '../people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent {
  addPerson:boolean = false;
  personForm = this.fb.group({
    name: '',
    dob : '',

  })

  people = this.peopleService.getAllPeople();

  constructor(private fb: FormBuilder, private peopleService: PeopleService) {}

  addPersonStore() {
    if(!this.personForm.value.name) return;
    if(!this.personForm.value.dob) return;
    const person: Person = {
      name: this.personForm.value.name,
      dob: new Date(this.personForm.value.dob)
    }
    this.peopleService.addPerson(person);
    this.personForm.reset();
    this.addPerson = false;
  }

}
