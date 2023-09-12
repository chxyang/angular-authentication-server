import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public email: String = ""
  public password: String = ""
  private _auth: AuthService
  private _router: Router

  loginUserData = {
    email: this.email,
    password: this.password
  }

  constructor(http: HttpClient, router: Router) {
    this._auth = new AuthService(http)
    this._router = router
  }

  login() {
    this._auth.login(this.loginUserData).subscribe(
      res => {
        console.log(res),
        localStorage.setItem('token', res.token)
        this._router.navigate(['/events'])
      },
      err => console.log(err)
    )
  }

}
