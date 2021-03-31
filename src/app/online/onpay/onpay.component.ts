import { Component, OnInit } from '@angular/core';
import * as allert from '../../allert';
import { HttpClient } from '@angular/common/http';
import * as statics from '../../global';
declare let Checkout: any;

@Component({
  selector: 'app-onpay',
  templateUrl: './onpay.component.html',
  styleUrls: ['./onpay.component.css']
})
export class OnpayComponent implements OnInit {

  mg: allert.Globle;
  urlgully = statics.ip + 'gully/';
  userId;
  list;
  ses;
  loading;


  description;
  payment;
  rate;
  total;
  applicatyion_id;
  application_cat;
  app_cat_name;

  cus_name;

  condition: boolean = false;




  constructor(private http: HttpClient) {
    const arrr = JSON.parse(sessionStorage.getItem('loged'));
    this.userId = arrr[0].idOnline;
    console.log(this.userId);
    this.getpending_payment_for_cus();
    //this.getcutdata(this.userId);
  }

  ngOnInit() {
  }

  getpending_payment_for_cus() {
    this.http.post(this.urlgully + 'getpaymentforcus', { cus_id: this.userId }).subscribe(res => {
      console.log(res);
      this.list = res;
    });
  }

  addpay(payid) {
    console.log('pay id   ' + payid);
    this.http.post(this.urlgully + 'getpayment_detail_by_id', { payid: payid, cus_id: this.userId }).subscribe(res => {
      this.description = res[0].description;
      this.payment = res[0].online_pay_amount;
      this.applicatyion_id = res[0].online_pay_application_id;
      this.application_cat= res[0].onlin_pay_app_cat;
      this.app_cat_name=res[0].sh_name;
      this.condition=true;
      this.bankrate();
      console.log(res);
    });
  }

  bankrate() {
    this.http.post(this.urlgully + 'getbankrate', {}).subscribe(res => {
      console.log(res);
      this.rate = res[0].rate;
    });
  }

  // getcutdata(id){
  //   this.http.post(this.urlgully + 'cusdata', {cusid:id}).subscribe(res => {
  //     console.log(res);
  //     this.cus_name=res[0].fullname;
  //   });
  // }

  pay() {

    let totrate = this.payment * this.rate / 100;
    this.total = this.payment + totrate;
    console.log(this.total + '===' + totrate);
    const param = {
      cusid: this.userId,
      appcat: this.application_cat,
      app: this.applicatyion_id,
      amount: this.payment,
      des: '',
      o1: '',
      o2: '',
      fullPay: this.total,
      onValue: totrate,
      catname:this.app_cat_name
    }

    console.log(param);
    this.http.post(this.urlgully + 'pay', param).subscribe(res => {
      console.log(res);

      //
      this.ses = res;

      console.log(this.ses);

      sessionStorage.setItem('boc', JSON.stringify(this.ses));

      console.log(this.ses.o2);

      if (this.ses.o2) {

        Checkout.configure({
          session: {
            id: this.ses.o2.session.id
          },
          interaction: {
            merchant: {
              name:  'Amount',
              address: {
                line1: '-',
                line2: '-'
              }
            }
          }
        });

        Checkout.showLightbox();
        setTimeout(() => {
          this.loading = false;
        }, 4000);

      } else {
        this.loading = false;
        this.mg.message('warning', 'Authantication Fail');
      }

    });
  }
}
