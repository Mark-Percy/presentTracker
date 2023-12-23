import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EventsService } from '../events.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  addNewEvent: boolean = false;
  selectedYear: number = new Date().getFullYear();
  events = this.eventService.getEventsforYear(this.selectedYear);

  eventForm = this.fb.group({
    name: ['', Validators.required],
    year: [new Date().getFullYear(), Validators.required]
  });
  constructor(private fb: FormBuilder, private eventService: EventsService, private authService: AuthenticationService) {}

  addEvent() {
    const name = this.eventForm.value.name;
    const year = this.eventForm.value.year;
    if(name && year) this.eventService.addEvent(name, year);
  }

  remove(id: string) {
    this.eventService.removeEvent(this.selectedYear, id);
  }

}
