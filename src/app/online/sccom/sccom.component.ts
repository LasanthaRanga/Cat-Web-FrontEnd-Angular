import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as statics from '../../global';
import * as allert from '../../allert';

@Component({
  selector: 'app-sccom',
  templateUrl: './sccom.component.html',
  styleUrls: ['./sccom.component.css']
})
export class SccomComponent implements OnInit {

  slcom = statics.ip + 'slcom/';
  roadname;
  postnum;
  descri;
  tellno;
  onuser;

  sl_com_list;

  mg: allert.Globle;

  constructor(private http: HttpClient,) {
    this.mg = new allert.Globle();
   }

  ngOnInit() {

    this.onuser = JSON.parse(sessionStorage.getItem('loged'));

    console.log(this.onuser);
    console.log(this.onuser[0]);
    console.log(this.onuser[0].nic);
    console.log(this.onuser[0].idOnline);
    this.getcomlist();

  }

  save_sl_com(){

    // if(this.roadname || this.postnum || this.descri ||){

    // }else{
    //   this.mg.message('warning', 'Fill Empty Fields');
    // }

    this.http.post(this.slcom + 'saveslcom', {slight_complain_road:this.roadname,slight_complain_post_no:this.postnum,slight_complain_desc:this.descri,slight_complain_tell_no:this.tellno,slight_complain_on_cus_id:this.onuser[0].idOnline}).subscribe(res => {
      this.mg.message('success', 'Complain saved');
      console.log('----------');
      this.roadname='';
      this.descri='';
      this.postnum='';
      this.roadname='';
      this.tellno='';
      this.getcomlist();
    });
    
  }

  getcomlist() {
    this.http.post(this.slcom + 'getslcom', { cus_id: this.onuser[0].idOnline }).subscribe(res => {
      this.sl_com_list = res;
      console.log(this.sl_com_list);
    });
  }


}
