import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  private _authService:AuthService
  constructor(http:HttpClient){
    this._authService = new AuthService(http)
  }

  public getAuthService():AuthService{
    return this._authService
  }
}
