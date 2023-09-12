import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerUrl = "http://localhost:4000/api/register"
  private _loginUrl = "http://localhost:4000/api/login"
  private _router: Router

  constructor(private http: HttpClient) { 
    this._router = new Router()
  }
  public registerUser(user: any){
    return this.http.post<any>(this._registerUrl, user)
  }
  public login(user: any){
    return this.http.post<any>(this._loginUrl, user)
  }

  public loggedIn(){
    return !!localStorage.getItem('token')
  }

  public getToken(){
    return localStorage.getItem('token')
  }

  public logout(){
    localStorage.removeItem('token')
    this._router.navigate(['/events'])
  }
}
