import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../events.service';
import { PeopleService, Person } from '../people.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  eventName: string | null = null;
  eventId : string | null = null;
  eventPeople: string[] | null = null;
  year : string | null = null;
  people = this.peopleService.getAllPeople()
  unaddedPeople: Person[] = [];
  addedPeople: Person[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventsService,
    private peopleService: PeopleService,
  ) {
    this.people.forEach((data => {
      data.forEach(val => {
        if(this.eventPeople && val.id && this.eventPeople.includes(val.id)) this.addedPeople.push(val)
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
      }

      else this.router.navigate(['dashboard']);
    })
  }

  addToEvent(id: string | undefined) {
    if(!id) {
      return;
    }
    const peopleAdded = this.addedPeople.map(person => person.id);
    peopleAdded.push(id)
    const person = this.unaddedPeople.find(person => person.id == id)
    this.unaddedPeople = this.unaddedPeople.filter(person => person.id !== id)
    if(person) {
      this.addedPeople.push(person)
    }
    if(this.year && this.eventId) this.eventService.addPersonToEvent(this.year, this.eventId, peopleAdded);
  }
}
