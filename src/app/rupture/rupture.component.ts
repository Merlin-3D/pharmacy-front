import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ApiService } from '../service/apiService/api-service.service';

@Component({
  selector: 'app-rupture',
  templateUrl: './rupture.component.html',
  styleUrls: ['./rupture.component.scss']
})
export class RuptureComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  successSubscription: Subscription = new Subscription;
  constructor(private apiService: ApiService) { }
  rupture:any
 
  ngOnInit(): void {
    this.apiService.getRuptureRequest("/stock/list_medicament_rupture")
    this.successSubscription = this.apiService.getRuptureSubject.subscribe(
      (result: any[])=>{
        this.rupture = result
        this.dtTrigger.next();
      }
    ) 
    this.apiService.emitGetRuptureSubject()
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
