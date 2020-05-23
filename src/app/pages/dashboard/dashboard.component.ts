import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/home/api.service';
import Chart from 'chart.js';
import { Dashboard } from '../../../models/dashboard';


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{
  dashboardDatos = new Dashboard(null);
  constructor(private _dashboardservice: ApiService) { }
  ngOnInit(){
     
    this.getDataDashboard();

  }

  public getDataDashboard() {
    this._dashboardservice.consultarDashboard().then(
      response => {
        this.dashboardDatos = response;
      });
  
  }

}
