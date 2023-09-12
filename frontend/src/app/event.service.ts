import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _eventsUrl = "http://localhost:4000/api/events"
  private _specialEventsUrl = "http://localhost:4000/api/special"

  constructor(private http: HttpClient) { }
  getEvents() {
    return this.http.get<any>(this._eventsUrl)
  }

  getSpecialEvents() {
    return this.http.get<any>(this._specialEventsUrl)
  }
}
