import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subject, Subscription } from 'rxjs';
import { ApiService } from '../service/apiService/api-service.service';

@Component({
  selector: 'app-peromption',
  templateUrl: './peromption.component.html',
  styleUrls: ['./peromption.component.scss']
})
export class PeromptionComponent implements OnInit,OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  successSubscription: Subscription = new Subscription;
  constructor(private apiService: ApiService) { }
  peromption:any
  date:any

  ngOnInit(): void {
    this.date = moment(new Date()).format("DD/MM/YYYY")
    this.apiService.getPeromptionRequest("/stock/list_medicament_peromtion")
    this.successSubscription = this.apiService.getPeromptionSubject.subscribe(
      (result: any[])=>{
        this.peromption = result
        this.dtTrigger.next();
      }
    ) 
    this.apiService.emitGetPeromptionSubject()
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
