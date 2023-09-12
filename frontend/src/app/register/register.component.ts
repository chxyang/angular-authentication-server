import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit{
  public email:String=""
  public password:String="" 
  private _auth: AuthService
  private _router: Router

  registerUserData = {
    email: this.email,
    password: this.password
  }
  constructor(http:HttpClient, router:Router) {
    this._auth = new AuthService(http)
    this._router = router
   }

  ngOnInit(): void {
  }
  registerUser(){
      this._auth.registerUser(this.registerUserData).subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token', res.token)
        this._router.navigate(['/events'])
      },
      err => console.log(err)
    )
    // console.log(this.registerUserData)
  }

}
