import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as statics from '../../global';
import * as allert from '../../allert';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-street',
  templateUrl: './street.component.html',
  styleUrls: ['./street.component.css']
})
export class StreetComponent implements OnInit {

  displayedColumns: string[] = ['slDate', 'cus_name_sinhala', 'sl_reference_no', 'cus_mobile', 'idStreetLine'];
  dataSource = <any>[];

  //url = statics.ip;
  sline = statics.ip + 'street/';

  // @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: false }) sort: MatSort;


  applicantName = "";
  appAddress = "";
  plandate = "";
  planno = "";
  deedno = "";
  surveyname = "";
  landsize = "";
  lotno = "";
  purpose = "";
  mg;
  onuser;
  refcode;
  refid;
  osl_id;
  maxslid;
  fullrefcode;

  ward_id;
  gn_id;
  land_name;
  nat_officer;
  nat_date;
  applicat_name;
  bank_plce;
  place_address;
  loan_amnt;
  land_size_acr;
  land_size_rds;
  land_size_pch;
  village_name;
  tax_type;
  cus_id;
  ass_id;

  xx = false;

  //orCus;

  constructor(private http: HttpClient, private router: Router) {
    this.mg = new allert.Globle();
  }

  ngOnInit() {
    // this.applicantName = "Naveen";
    // this.appAddress = "Kurunegala";
    // this.planno = "9876";
    // this.plandate = "2020-09-12";
    // this.deedno = "1234";
    // this.surveyname = "Sanjeewa";
    // this.landsize = "ACR:0 | RD:0 | PER:10.00 ";

    this.onuser = JSON.parse(sessionStorage.getItem('loged'));

    console.log(this.onuser);
    console.log(this.onuser[0]);
    console.log(this.onuser[0].nic);
    this.serchcustable();
    this.getcergrid();
  }

  serchcustable() {
    this.http.post(this.sline + 'ss', { nic: this.onuser[0].nic }).subscribe(
      res => {
        console.log('-------------------------------------------------------');
        console.log(res);
        console.log('-------------------------------------------------------');

        if (res[0]) //if a is negative,undefined,null,empty value then...
        {
          this.cus_id = res[0].idCustomer;
          this.getstreetlinetable(res[0].idCustomer);
        }
        else {
          this.mg.message('warning', 'Empty Data Please Contact Chilaw Urban Council');

        }

        //this.getstreetlinetable(res[0].idCustomer);

      },
      err => {
        console.log(err);
        console.log('000000');
        this.mg.message('warning', 'Empty Data Please Contact Chilaw Urban Council');
      }
    );

  };

  getstreetlinetable(id) {
    this.http.post(this.sline + 'getSt', { cusid: id }).subscribe(
      res => {
        console.log(res);
        this.applicantName = res[0].cus_name_sinhala;
        this.appAddress = res[0].address;
        this.planno = res[0].slPlanNo;
        this.plandate = res[0].slServayDate;
        this.deedno = res[0].slDeedNo;
        this.surveyname = res[0].slServayOfficer;
        this.landsize = res[0].LandSize;
        this.osl_id = res[0].idStreetLine;
        this.getstreetlineolddetails();
        this.xx = true;
      },
      err => {
        console.log(err);
        this.xx = false;
        console.log('1');
        this.mg.message('warning', 'Empty Data Please Contact Chilaw Urban Council');
        console.log('2');
      }

    );

  };

  getstreetlineolddetails() {
    this.http.post(this.sline + 'getoldsl', { slid: this.osl_id }).subscribe(
      res => {
        console.log(res);
        this.ward_id = res[0].ward_id;
        this.gn_id = res[0].slGnId;
        this.land_name = res[0].slLandName;
        this.nat_officer = res[0].slNotatyOfficer;
        this.nat_date = res[0].slNotaryDate;
        this.applicat_name = res[0].slApplicantName;
        this.bank_plce = res[0].slBnkorPlce;
        this.place_address = res[0].slPlceAddress;
        this.loan_amnt = res[0].slloanAmnt;
        this.land_size_acr = res[0].slLandSizeAcr;
        this.land_size_rds = res[0].slLandSizeRds;
        this.land_size_pch = res[0].slLandSize;
        this.village_name = res[0].slvillageName;
        this.tax_type = res[0].slTaxtype;
        this.cus_id = res[0].customer_idCustomer;
        this.ass_id = res[0].ass_id;

      },
      err => { console.log(err); }
    );

  };

  getslrefno() {
    this.http.post(this.sline + 'getref', {}).subscribe(
      res => {
        console.log(res);
        this.refcode = res[0].refno;
        this.getslrefnoid();

      },
      err => { console.log(err); }
      //this.mg.message('success', 'Complain saved');
    );

  };

  getslrefnoid() {
    console.log('2');
    this.http.post(this.sline + 'getrefid', {}).subscribe(
      res => {
        console.log(res);
        let ref_id = res[0].ref_oder;
        this.refid = ref_id + 1;
        this.fullrefcode = this.refcode + this.refid + '/' + 'ONLINE';
        console.log(this.fullrefcode);
        this.getmaxslid();



      },
      err => { console.log(err); }
    );

  };

  getmaxslid() {
    console.log('3');
    this.http.post(this.sline + 'getslid', {}).subscribe(
      res => {
        console.log(res);
        let max_sl_id = res[0].max_sl;
        this.maxslid = max_sl_id + 1;


        //this.save();
        this.dhasave();

      },
      err => { console.log(err); }
    );
  };

  save() {
    console.log('saved');
    //  this.getslrefno();
    //  this.getslrefnoid();

    let desc_23 = "Required lot no - " + this.lotno;
    let obb = {
      idStreetLine: this.maxslid,
      ass_id: this.ass_id,
      slPlanNo: this.planno,
      //slDescription: this.lotno,
      slDescription: desc_23,
      slServayOfficer: this.surveyname,
      slServayDate: this.plandate,
      customer_idCustomer: this.cus_id,
      ward_id: this.ward_id,
      sl_reference_no: this.fullrefcode,
      slLandName: this.land_name,
      slNotatyOfficer: this.nat_officer,
      slNotaryDate: this.nat_date,
      slDeedNo: this.deedno,
      slApplicantName: this.applicat_name,
      slGnId: this.gn_id, slPurpose: this.purpose,
      slBnkorPlce: this.bank_plce,
      slPlceAddress: this.place_address,
      slloanAmnt: this.loan_amnt,
      slLandSize: this.land_size_pch,
      slLandSizeAcr: this.land_size_acr,
      slLandSizeRds: this.land_size_rds,
      slTaxtype: this.tax_type,
      slvillageName: this.village_name,
      online_cus_id: this.onuser[0].idOnline,
      pre_sl_id: this.osl_id
    };
    console.log(obb);
    this.http.post(this.sline + 'saveStreet', obb).subscribe(res => {
      this.mg.message('success', 'Application Saved');
      console.log('elaaa');
      this.lotno = '';
      this.purpose = '';
    });

  }

  dhasave() {
    console.log('saved');

    let obb1 = {
      doc_hand_subject_id: this.maxslid
    };
    console.log(obb1);
    this.http.post(this.sline + 'savedha', obb1).subscribe(res => {
      this.save();

    });

  }

  getcergrid() {
    this.http.post<any>(this.sline + 'getcer', { oncusid: this.onuser[0].idOnline }).subscribe(res => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
      //this.dataSource.paginator = this.paginator;
      //this.dataSource.sort = this.sort;
    });
  }

  getcertificate() {

    // let obj = {
    //   cus_name: "res[0].name",
    //   add: "chilaw"
    // }
    // console.log('view');

    
    //Response.redirect('http://localhost/certificate/');
    //this.doc.location.href('http://localhost/certificate/');
    //window.location.href = "http://localhost/certificate/";
    //window.location.href = "http://124.43.8.250:3032/sl_images/invoice/index.html";
    window.location.href = "https://chilawuc.cat2020.org/result/certificate/";
    //window.location.href = "https://chilawuc.cat2020.org/result/certificate/?" + obj;
  }

}
