import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login/login.service';
import { Router } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';
import { HttpClient } from '@angular/common/http';
import * as statics from '../global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private LOGO = require('../../assets/images/cat.png');
  url = statics.ip;
  name;
  unames = '';
  pwords = '';

  constructor(private _loginService: LoginService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.getNames();
    var xx = sessionStorage.getItem('loged');
    if (xx != null) {
      this.router.navigate(['/home']);
    }
  }

  login() {
    console.log(this.unames + this.pwords);
    this._loginService.login(this.unames, this.pwords);
  }


  getNames() {
    this.http.post(this.url + 'userlogin/keyval', { key: 'name' }).subscribe(res => {
      this.name = res[0].value;
    });
  }

  register() {
    this.router.navigate(['/register']);
  }

  forgot() {
    this.router.navigate(['/forgot']);
  }


}
