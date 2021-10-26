import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subject, Subscription } from 'rxjs';
import { ApiService } from '../service/apiService/api-service.service';

@Component({
  selector: 'app-expiration',
  templateUrl: './expiration.component.html',
  styleUrls: ['./expiration.component.scss']
})
export class ExpirationComponent implements OnInit,OnDestroy  {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  successSubscription: Subscription = new Subscription;
  constructor(private apiService: ApiService) { }
  expiration:any
  date:any
  
  ngOnInit(): void {
    this.date = moment(new Date()).format("DD/MM/YYYY")
    this.apiService.getExpirationRequest("/stock/list_medicament_expirer")
    this.successSubscription = this.apiService.getExpirationSubject.subscribe(
      (result: any[])=>{
        this.expiration = result
        this.dtTrigger.next();
      }
    ) 
    this.apiService.emitGetExpirationSubject()
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
