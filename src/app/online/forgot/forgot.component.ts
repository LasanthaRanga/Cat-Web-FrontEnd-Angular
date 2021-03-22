import { Component, OnInit } from '@angular/core';
import * as statics from '../../global';
import * as allert from '../../allert';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  mobile;
  verification;
  active = false;
  active2 = false;

  password;
  password2;

  loadign = false;

  url = statics.ip + 'onlinecustomer/';
  mg: allert.Globle;

  constructor(private http: HttpClient, private router: Router) {
    this.mg = new allert.Globle();
  }

  ngOnInit() {
  }

  gerVerification() {
    this.loadign = true;
    console.log(this.mobile);
    let body = { mobile: this.mobile }
    let data;
    this.http.post(this.url + 'getVerification', body).subscribe(res => {
      data = res;
      console.log(data);
      if (res) {
        if (data['mg'] == "Ok") {
          this.active = true;
          this.mg.message('success', 'Enter Your Verification Code');
          this.loadign = false;
        } else {
          this.mg.message('warning', 'Mobile Number is Not Registered');
          this.loadign = false;
        }
      }

    });

  }

  recover() {
    let body = { mobile: this.mobile, code: this.verification }
    this.http.post(this.url + 'recover', body).subscribe(res => {

      console.log(res);
      if (res['mg'] == 'Ok') {
        this.active2 = true;
      } else {

      }
    });
  }

  resetPassword() {
    if (this.password == this.password2) {
      let body = { mobile: this.mobile, code: this.verification, pword: this.password2 }
      this.http.post(this.url + 'reset', body).subscribe(res => {
        console.log(res);
        if (res) {
          this.mg.message('success', 'password reset successfully');
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.mg.message('warning', 'Password not match');
    }
  }

}
