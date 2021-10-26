import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ApiService } from '../service/apiService/api-service.service';

@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.scss']
})
export class VenteComponent implements OnInit,OnDestroy {
  successSubscription: Subscription = new Subscription;
  constructor(private apiService: ApiService) { }
  vente:any
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this.apiService.getVenteRequest("/stock/listeVente")
    this.successSubscription = this.apiService.getVenteSubject.subscribe(
      (result: any[])=>{
        console.log(result)
        this.vente = result
        this.dtTrigger.next();
      }
    ) 
    this.apiService.emitGetVenteSubject()
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
