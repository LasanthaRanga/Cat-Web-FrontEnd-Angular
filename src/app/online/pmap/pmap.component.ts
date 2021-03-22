import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as statics from '../../global';
import * as allert from '../../allert';
import { LoginService } from '../../../app/service/login/login.service';


@Component({
  selector: 'app-pmap',
  templateUrl: './pmap.component.html',
  styleUrls: ['./pmap.component.css']
})
export class PmapComponent implements OnInit {

  fullname = '';
  mobile = '';
  nic = '';
  email = '';
  cusid = 0;
  mg = null;
  url = statics.ip;
  name;


  owner; kform; astno; street; recit; des;



  constructor(private http: HttpClient, private login: LoginService, private router: Router,) {
    this.mg = new allert.Globle();
  }

  dataSource = <any>[];
  displayedColumns: string[] = ['idSubject', 'subject_name', 'subject_code', 'dip_name'];




  ngOnInit() {
    let xx = sessionStorage.getItem('loged');
    let yy = JSON.parse(xx);
    this.fullname = yy[0].fullname;
    this.mobile = yy[0].mobile;
    this.nic = yy[0].nic;
    this.email = yy[0].email;
    this.cusid = yy[0].idOnline;
  }

  map(form: NgForm) {
    console.log(this.owner);
    console.log(this.kform);
    console.log(this.recit);

    let ma = {
      idoncus: this.cusid,
      owner: this.owner,
      kform: this.kform,
      recit: this.recit,
      des: this.des,
      astno: this.astno,
      street: this.street
    };

    console.log(ma);

    this.http.post(this.url + 'onlinecuspro/map', ma).subscribe(
      res => {
        console.log(res);
        this.mg.message('success', 'Added to property list');
        this.router.navigate(['/onhome/']);
      },
      err => { console.log(err); }
    );


  }

  logOut() {
    this.login.logOut();
  }

  getNames() {
    this.http.post(this.url + 'userlogin/keyval', { key: 'name' }).subscribe(res => {
      this.name = res[0].value;
    });
  }

}
