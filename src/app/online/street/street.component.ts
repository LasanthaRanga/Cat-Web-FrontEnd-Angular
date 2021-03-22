import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as statics from '../../global';
import * as allert from '../../allert';

@Component({
  selector: 'app-street',
  templateUrl: './street.component.html',
  styleUrls: ['./street.component.css']
})
export class StreetComponent implements OnInit {

  url = statics.ip;
  applicantName = "";
  appAddress = "";
  mg;
  constructor(private http: HttpClient,) {
    this.mg = new allert.Globle();
  }

  ngOnInit() {
    this.applicantName = "Naveen";

  }


  save() {
    console.log(this.appAddress);

    let obj = {
      aapp: this.applicantName,
      appAddress: this.applicantName
    }

    console.log(obj);


    this.http.post(this.url + 'street/saveStreet', obj).subscribe(
      res => {
        console.log(res);


      },
      err => { console.log(err); }
    );

  }

}
