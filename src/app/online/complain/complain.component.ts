import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as statics from '../../global';
import * as allert from '../../allert';

@Component({
  selector: 'app-complain',
  templateUrl: './complain.component.html',
  styleUrls: ['./complain.component.css']
})
export class ComplainComponent implements OnInit {

  complains = statics.ip + 'complains/';
  cusname;
  mobno;
  compla;
  onuser;

  com_list;

  mg: allert.Globle;

  constructor(private http: HttpClient, ) {
    this.mg = new allert.Globle();
  }

  ngOnInit() {

    this.onuser = JSON.parse(sessionStorage.getItem('loged'));

    console.log(this.onuser);
    console.log(this.onuser[0]);
    console.log(this.onuser[0].nic);
    console.log(this.onuser[0].idOnline);

    this.getpendinglist();


  }

  savecomplain() {

    // if(this.roadname || this.postnum || this.descri ||){

    // }else{
    //   this.mg.message('warning', 'Fill Empty Fields');
    // }

    //this.http.post(this.complains + 'savecomplain', {online_complain_name:this.cusname,online_complain_tell_no:this.mobno,online_complains:this.compla}).subscribe(res => {
    this.http.post(this.complains + 'savecomplain', { online_complains: this.compla, online_cus_id: this.onuser[0].idOnline }).subscribe(res => {
      this.mg.message('success', 'Complain saved');
      console.log('----------');
      this.cusname = '';
      this.mobno = '';
      this.compla = '';
      this.getpendinglist();
    });

  }


  getpendinglist() {
    this.http.post(this.complains + 'complain_by_user', { cus_id: this.onuser[0].idOnline }).subscribe(res => {
      this.com_list = res;
      console.log(this.com_list);
    });
  }


}
