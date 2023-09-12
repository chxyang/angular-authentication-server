import { Component, inject } from '@angular/core';
import { EventService } from '../event.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
interface SpecialEvent{
  name : String,
  description : String,
  date : Date
}

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent {
  private _eventService: EventService
  public specialEvents:SpecialEvent[]
  public _router: Router

  constructor( http:HttpClient) {
    this._eventService = new EventService(http)
    this.specialEvents = []
    this._router = inject(Router)
   }
  ngOnInit(): void {
    this._eventService.getSpecialEvents().subscribe(
      res => this.specialEvents = res,
      err => {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this._router.navigate(['/login'])
          }
        }
      }
    )
  }
}
