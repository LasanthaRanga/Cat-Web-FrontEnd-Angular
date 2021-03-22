import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare let Checkout: any;


@Component({
  selector: 'app-paynow',
  templateUrl: './paynow.component.html',
  styleUrls: ['./paynow.component.css']
})
export class PaynowComponent implements OnInit {


  sessionVersion;
  resultIndicator;

  ses;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.resultIndicator = params['resultIndicator'];
      this.sessionVersion = params['sessionVersion'];
      console.log('----------------- params');
      console.log(params);
      console.log('----------------- params');

      console.log('----------------- sesStor');

      this.ses = sessionStorage.getItem('boc');

      console.log(this.ses);
      console.log(JSON.stringify(this.ses));


      console.log('----------------- sesStor');


    });
  }


  ngOnInit() {



  }



}
