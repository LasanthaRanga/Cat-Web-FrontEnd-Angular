import { Component, OnInit } from '@angular/core';
import * as allert from '../../allert';
import { HttpClient } from '@angular/common/http';
import * as statics from '../../global';

@Component({
  selector: 'app-ongully',
  templateUrl: './ongully.component.html',
  styleUrls: ['./ongully.component.css']
})
export class OngullyComponent implements OnInit {
  mg: allert.Globle;
  applicantname;
  mobile;
  nic;
  adress;
  nature;
  distanceintank;
  email;
  distanceintown;
  urlgully = statics.ip + 'gully/';
  userId;
  list;
  naturs;


  lino;
  linature;
  lidate;
  litown;
  liprogress;
  lidistance;


  condition: boolean = false;
  visible: boolean = true;

  constructor(private http: HttpClient) {
    this.mg = new allert.Globle();
    this.getnatures();
    const arrr = JSON.parse(sessionStorage.getItem('loged'));
    this.userId = arrr[0].idOnline;
    this.getpendinglist();
   }

  ngOnInit() {
    
  }

  saveBasic(){
    this.http.post(this.urlgully + 'savegdetails', {mobile:this.mobile,adress:this.adress,nature:this.nature,distanceintown:this.distanceintown,distanceintank:this.distanceintank,email:this.email,g_cus_id:this.userId}).subscribe(res => {
    });
    this.mg.message('success', 'success your request');
    this.applicantname='';
    this.mobile='';
    this.nic='';
    this.adress='';
    this.nature='';
    this.distanceintank='';
    this.distanceintown='';
    this.email='';
    this.getpendinglist();
  }

  getnatures(){
    this.http.post(this.urlgully + 'getnatures', {}).subscribe(res => {
      this.naturs=res;
      console.log(this.naturs);
    });
    
  }

  getpendinglist(){
    this.http.post(this.urlgully + 'getpendinglist', {cusid:this.userId}).subscribe(res => {
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
    this.lidistance=res[0].g_distance;
    this.condition=true;
    });
  }

  trues(){
    this.visible=true;

  }

  falese(){
    this.visible=false;
    this.distanceintown='0'
  }

}


