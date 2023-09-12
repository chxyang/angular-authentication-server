import { Component } from '@angular/core';
import { EventService } from '../event.service';
import { HttpClient } from '@angular/common/http';
interface Event {
  name : String,
  description : String,
  date : Date
}

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  public events:Event[]
  private _eventService: EventService


  constructor(http:HttpClient) {
    this._eventService = new EventService(http)
    this.events = []
  }

  ngOnInit(): void {
    this._eventService.getEvents().subscribe(
      res => this.events = res,
      err => console.log(err)
    )
  }
}
