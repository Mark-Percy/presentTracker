import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService, personInEvent } from '../events.service';
import { PeopleService, Person } from '../people.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  eventName: string | null = null;
  eventId : string | null = null;
  eventPeople: personInEvent[] | null = null;
  year : string | null = null;
  people = this.peopleService.getAllPeople()
  unaddedPeople: Person[] = [];
  addedPeople: Person[] = [];
  eventStages: string[] = []
  defaultStages: string[] = ['Bought', 'Wrapped'];

  checkForm = this.fb.array
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventsService,
    private peopleService: PeopleService,
    private fb: FormBuilder,
  ) {
    this.people.forEach((data => {
      data.forEach(val => {
        if(this.eventPeople && val.id && this.eventPeople.some(person => person.id === val.id)) this.addedPeople.push(val)
        else this.unaddedPeople.push(val)
      })
    }))
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(async params => {
      const year = params.get('year');
      const id = params.get('event');
      this.eventId = id;
      this.year = year;
      if(year && id) {
        const event = await this.eventService.getEvent(year, id)
        this.eventName = event.get('name');
        this.eventPeople = event.get('people')
        this.eventStages = event.get('stages')
      }

      else this.router.navigate(['dashboard']);
    })
  }

  addToEvent(id: string | undefined) {
    if(!id) {
      return;
    }
    const personAdded:personInEvent = {id:id, completedTasks: []}
    const person = this.unaddedPeople.find(person => person.id == id)
    this.unaddedPeople = this.unaddedPeople.filter(person => person.id !== id)
    if(person) {
      this.addedPeople.push(person)
    }
    if(this.year && this.eventId) this.eventService.addPersonToEvent(this.year, this.eventId, personAdded);
  }

  addDefaultStages() {
    if(this.year && this.eventId) this.eventService.addStages(this.year, this.eventId, this.defaultStages)
  }

  updateCheck(id: string | undefined, stage: number) {
    if(!id || !this.eventPeople) return
    const person = this.eventPeople.find(p => p.id === id);
    if(!person) return
    person.completedTasks.push(stage)
  }

  save() {
    if(!this.year || !this.eventId || !this.eventPeople) return
    this.eventService.saveStages(this.year, this.eventId, this.eventPeople)

  }

  checkIfComplete(personId: string | undefined, stage: number): boolean {
    if(!personId || !this.eventPeople) return false;
    const person = this.eventPeople.find(p => p.id === personId);
    if(!person) return false;
    return person.completedTasks.includes(stage); 
  }
}
