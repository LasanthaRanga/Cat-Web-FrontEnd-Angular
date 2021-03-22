import { Component, OnInit } from '@angular/core';
import * as allert from '../../allert';
import { HttpClient } from '@angular/common/http';
import * as statics from '../../global';
import { DatePipe } from '@angular/common';
declare let Checkout: any;

@Component({
  selector: 'app-water',
  templateUrl: './water.component.html',
  styleUrls: ['./water.component.css']
})
export class WaterComponent implements OnInit {
  mg: allert.Globle;
  waterbowser = statics.ip + 'waterbowser/';
  condition: boolean = false;

  userId;

  types;
  type;
  date;
  adress;
  reason;
  distance;
  time;
  rad;

  userpending_list;

  moreappid;
  moretype;
  moredate;
  moreadress;
  morereason;
  moredistance;
  moretime;

  constructor(private http: HttpClient) {
    this.mg = new allert.Globle();
    const arrr = JSON.parse(sessionStorage.getItem('loged'));
    this.userId = arrr[0].idOnline;
    console.log(this.userId);
    this.gettype();
    this.getuserpending();
  }

  ngOnInit() {
  }

  saveBasic() {
    const pipe = new DatePipe('en-US');
    this.date = pipe.transform(this.date, 'yyyy/MM/dd');
    this.http.post(this.waterbowser + 'savegdetails', { wb_type_id: this.type, wb_date: this.date, wb_location: this.adress, wb_reason: this.reason, wb_distance_with_town: this.distance, wb_time_diuration: this.time,wb_town_or_not:this.rad,cusid:this.userId }).subscribe(res => {
      this.mg.message('success', 'success your request');
      this.type='';
      this.date='';
      this.adress='';
      this.reason='';
      this.distance='';
      this.time='';
      this.rad='';
      console.log(res);
    });

  }

  gettype() {
    this.http.post(this.waterbowser + 'gettype', {}).subscribe(res => {
      console.log(res);
      this.types = res;
    });

  }

  getuserpending(){
    this.http.post(this.waterbowser + 'getuserpending', {cusid:this.userId}).subscribe(res => {
      console.log(res);
      this.userpending_list = res;
    });
  }

  moreby_id(ids){
    this.http.post(this.waterbowser + 'moredetails_by_id', {cusid:this.userId,id:ids}).subscribe(res => {
      this.moreappid=res[0].wb_detail_id;
      this.moretype=res[0].wb_type_name;
      const pipe = new DatePipe('en-US');
      this.moredate=res[0].wb_date;
      this.moredate = pipe.transform(this.moredate, 'yyyy/MM/dd');
      this.moreadress=res[0].wb_location;
      this.morereason=res[0].wb_reason;
      this.moredistance=res[0].wb_distance_with_town;
      this.moretime=res[0].wb_time_diuration;
      this.condition=true;
      console.log(res);
    });
  }

}
