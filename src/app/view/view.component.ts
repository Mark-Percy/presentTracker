import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  eventName: string | null = null;
  eventId : string | null = null;
  
  constructor(private route: ActivatedRoute, private eventService: EventsService, private router: Router) {
    // this.eventService.getEvent()
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(async params => {
      const year = params.get('year')
      const id = params.get('event')
      if(year && id) {
        const event = await this.eventService.getEvent(year, id)
        console.log(event.data())
        this.eventName = event.get('name')
      }

      else this.router.navigate(['dashboard'])
    })
  }
}
