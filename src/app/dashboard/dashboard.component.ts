import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../service/apiService/api-service.service';
import { single } from './data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  single: any;
  multi: any;
  result:any
  id = localStorage.getItem('id_token');

  view: any = [1500, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Mois année';
  showYAxisLabel = true;
  yAxisLabel = 'Quantité vendus';

  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  resultSubscription: Subscription = new Subscription;

  constructor(public apiService: ApiService) {

    Object.assign(this, { single })

  }

  onSelect(event:any) {
    console.log(event);
  }

  ngOnInit(): void {
    this.apiService.getDashboardRequest("/stock/dashboard")
    this.resultSubscription = this.apiService.getDashboardSubject.subscribe(
      (result: any)=>{
        console.log(result)
        this.result = result
      }
    ) 
    this.apiService.emitGetDashboardSubject()
    this.apiService.getRuptureRequest('/stock/list_medicament_rupture')
    this.apiService.getPeromptionRequest('/stock/list_medicament_peromtion')
    this.apiService.getExpirationRequest('/stock/list_medicament_expirer')

  }

}
