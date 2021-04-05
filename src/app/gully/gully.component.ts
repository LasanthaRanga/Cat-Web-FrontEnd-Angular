import { Component, OnInit } from '@angular/core';
import * as allert from '../allert';
import { HttpClient } from '@angular/common/http';
import * as statics from '../global';

@Component({
  selector: 'app-gully',
  templateUrl: './gully.component.html',
  styleUrls: ['./gully.component.css']
})
export class GullyComponent implements OnInit {
  mg: allert.Globle;
  list;
  urlgully = statics.ip + 'gully/';


  lino;
  linature;
  lidate;
  litown;
  liprogress;
  cusid;
  lidistance;

  condition: boolean = false;

  amount;

  constructor(private http: HttpClient) {
    this.mg = new allert.Globle();
    this.getpendinglist();
   }

  ngOnInit() {
  }

  getpendinglist(){
    this.http.post(this.urlgully + 'getallpendinglist', {}).subscribe(res => {
      this.list=res;
    console.log(this.list);
    });
  }

  moreinfo(id){
    this.http.post(this.urlgully + 'moreinfo', {appid:id}).subscribe(res => {
    console.log(res);
    this.lino=res[0].g_detail_id;
    this.linature=res[0].g_nature;
    this.lidate=res[0].g_date;
    this.litown=res[0].tname;
    this.liprogress=res[0].name;
    this.cusid=res[0].g_cus_id;
    this.lidistance=res[0].g_distance;
    this.condition=true;
    localStorage.setItem('detailid', JSON.stringify(id));
    localStorage.setItem('g_cus_id', JSON.stringify(this.cusid));
    });
  }

  saveBasic(){

  }

  addamount(){
    var xx = localStorage.getItem('detailid');
    this.http.post(this.urlgully + 'addamount', {amount:this.amount,g_detail_id:xx}).subscribe(res => {
      this.save_paydetails(xx);
      this.getpendinglist();
      this.mg.message('success', 'Approved');
      this.condition=false;
      this.amount='';
    });
  }


  save_paydetails(detail_id){
    var app_cat=17;
    var cus_id = localStorage.getItem('g_cus_id');
    this.http.post(this.urlgully + 'savepaydetail', {onlin_pay_app_cat:app_cat,online_pay_application_id:detail_id,online_pay_amount:this.amount,cusid:cus_id}).subscribe(res => {
      console.log(res);
      });
  }
}
