import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { ApiService } from '../service/apiService/api-service.service';

@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
  styleUrls: ['./caisse.component.scss']
})
export class CaisseComponent implements OnInit,OnDestroy {

  caisseSubscription: Subscription = new Subscription;

  caisse: any = null;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  findSubmit(findInForm:NgForm){
    const date1 = findInForm.value.startDate
    const date2 = findInForm.value.endDate

    this.apiService.getCaisseRequest("/stock/caisseVente/"+date1+"/"+date2);
 
    this.caisseSubscription = this.apiService.getCaisseSubject.subscribe(
      (result: any[])=>{
        this.caisse = result
        this.dtTrigger.next();
      }, err => {
     }
    )
     this.apiService.emitGetCaisseSubject()
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
