import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import * as statics from "../../global";
import * as allert from "../../allert";
import { LoginService } from "../../../app/service/login/login.service";

@Component({
  selector: "app-onhome",
  templateUrl: "./onhome.component.html",
  styleUrls: ["./onhome.component.css"],
})
export class OnhomeComponent implements OnInit {
  constructor(
    private router: Router,
    private http: HttpClient,
    private login: LoginService
  ) {}

  name;
  dataSource = <any>[];
  displayedColumns: string[] = ["owner_name", "status"];

  url = statics.ip;
  fullname = "";
  mobile = "";
  nic = "";
  email = "";
  cusid = 0;
  kformid;

  con_name;
  con_email;
  con_mobile;

  ngOnInit() {
    this.getNames();
    let xx = sessionStorage.getItem("loged");
    let yy = JSON.parse(xx);
    // console.log(yy);
    this.fullname = yy[0].fullname;
    this.mobile = yy[0].mobile;
    this.nic = yy[0].nic;
    this.email = yy[0].email;
    this.cusid = yy[0].idOnline;
    this.loadMyProperty();
  }

  gotoMap() {
    this.router.navigate(["/pmap"]);
  }

  getNames() {
    this.http
      .post(this.url + "userlogin/keyval", { key: "con_name" })
      .subscribe((res) => {
        this.con_name = res[0].value;
      });
    this.http
      .post(this.url + "userlogin/keyval", { key: "con_email" })
      .subscribe((res) => {
        this.con_email = res[0].value;
      });
    this.http
      .post(this.url + "userlogin/keyval", { key: "con_mobile" })
      .subscribe((res) => {
        this.con_mobile = res[0].value;
      });
  }

  loadMyProperty() {
    this.http
      .post(this.url + "onlinecuspro/prop", { idoncus: this.cusid })
      .subscribe(
        (res) => {
          this.dataSource = res;
          console.log(res);
        },
        (err) => {}
      );
  }

  goToProperty(id, cat) {
    if (cat == 2) {
      this.router.navigate(["/payassess/" + id]);
    }
  }

  gotoPay() {
    console.log(this.kformid);
    if (this.kformid > 0) {
      this.router.navigate(["/payassess/" + this.kformid]);
    }
  }

  logOut() {
    this.login.logOut();
  }
}
