import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as statics from '../global';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-la-complain',
  templateUrl: './la-complain.component.html',
  styleUrls: ['./la-complain.component.css']
})
export class LaComplainComponent implements OnInit {

  displayedColumns: string[] = ['online_complain_id', 'fullname', 'mobile', 'online_complains', 'online_complain_date', 'statuss'];
  dataSource = <any>[];
  urlVehicle = statics.ip + 'complains/';

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private http: HttpClient, private router: Router) {
    console.log('========================');
   
   }

  ngOnInit() {
    this.loadAllcomplain();
  }

  loadAllcomplain() {
    this.http.post<any>(this.urlVehicle + 'allcomplain', {}).subscribe(res => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // applayFilter(text) {
  //   this.dataSource.filter = text.trim().toLocaleLowerCase();
  // }

}
