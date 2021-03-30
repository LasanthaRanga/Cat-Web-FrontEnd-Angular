import { Component, OnInit } from '@angular/core';
import * as allert from '../allert';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import * as statics from '../global';

@Component({
  selector: 'app-waterbowser',
  templateUrl: './waterbowser.component.html',
  styleUrls: ['./waterbowser.component.css']
})
export class WaterbowserComponent implements OnInit {
  mg: allert.Globle;
  waterbowser = statics.ip + 'waterbowser/';
  condition: boolean = false;

  userpending_list;

  moreappid;
  moretype;
  moredate;
  moreadress;
  morereason;
  moredistance;
  moretime;
  moresttime;
  moreendtime;

  amount;

  constructor(private http: HttpClient) {
    this.mg = new allert.Globle();
    this.getuserpending();
   }

  ngOnInit() {
  }

  getuserpending(){
    this.http.post(this.waterbowser + 'getallpending', {}).subscribe(res => {
      console.log(res);
      this.userpending_list=res;
    });
  }

  moreby_id(ids){
    this.http.post(this.waterbowser + 'allappbyid', {id:ids}).subscribe(res => {
      this.moreappid=res[0].wb_detail_id;
      this.moretype=res[0].wb_type_name;
      const pipe = new DatePipe('en-US');
      this.moredate=res[0].wb_date;
      this.moredate = pipe.transform(this.moredate, 'yyyy/MM/dd');
      this.moreadress=res[0].wb_location;
      this.morereason=res[0].wb_reason;
      this.moredistance=res[0].wb_distance_with_town;
      this.moretime=res[0].wb_time_diuration;
      this.moresttime=res[0].wb_start_date;
      this.moreendtime=res[0].wb_end_date;
      this.condition=true;
      localStorage.setItem('w_detailid', JSON.stringify(ids));
      localStorage.setItem('g_cus_id', JSON.stringify(res[0].wb_cus_id));
      console.log(res);
    });
  }

  addamount(){
    var xx = localStorage.getItem('w_detailid');
    this.http.post(this.waterbowser + 'w_addpay', {amount:this.amount,detailid:xx}).subscribe(res => {
    this.save_paydetails(xx);
      this.getuserpending();
      this.mg.message('success', 'Approved');
      this.condition=false;
      this.amount='';
    });
  }

  save_paydetails(detail_id){
    var app_cat=12;
    var cus_id = localStorage.getItem('g_cus_id');
    this.http.post(this.waterbowser + 'savepaydetail', {onlin_pay_app_cat:app_cat,online_pay_application_id:detail_id,online_pay_amount:this.amount,cusid:cus_id}).subscribe(res => {
      console.log(res);
      });
  }



}
