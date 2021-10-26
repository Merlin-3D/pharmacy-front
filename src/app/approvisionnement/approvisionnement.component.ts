import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Subscription } from 'rxjs';
import { ApiService } from '../service/apiService/api-service.service';

@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Suppression...</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Etes-vous sûr que vous voulez supprimer ?</strong></p>
    <p>
    Toutes les informations associées à cet approvisionnement seront définitivement supprimées.
    <span class="text-danger">Cette opération ne peut pas être annulée.</span>
    </p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Retour</button>
    <button type="button" class="btn btn-danger" (click)="onDelete(id)">Ok</button>
  </div>
  `
})
export class NgbdModalConfirm {
  @Input() id:any;
 
  constructor(public modal: NgbActiveModal,private apiService: ApiService) {}
  resultSubscription: Subscription = new Subscription;
  onDelete(id:any){
    this.apiService.deleteRequesteService("/stock/supprimer_approvisionnement/"+id)
    this.resultSubscription = this.apiService.successMessageSubject.subscribe(
      (result: any[])=>{
     
        this.apiService.getApprovisionnemntRequest("/stock/list_pprovisionner")
        this.modal.close('Ok click')

      }
    ) 
    this.apiService.emitSuccesSubject()
  }
}

@Component({
  selector: 'app-approvisionnement',
  templateUrl: './approvisionnement.component.html',
  styleUrls: ['./approvisionnement.component.scss']
})
export class ApprovisionnementComponent implements OnInit,OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  successSubscription: Subscription = new Subscription;
  constructor(private _modalService: NgbModal,private apiService: ApiService) { }
  approvisionnemnt: any;
  ngOnInit(): void {

    this.apiService.getApprovisionnemntRequest("/stock/list_pprovisionner")
    this.successSubscription = this.apiService.getApprovisionnementSubject.subscribe(
      (result: any[])=>{
        console.log(result)
        this.approvisionnemnt = result
        this.dtTrigger.next();
      }
    ) 
    this.apiService.emitGetApprovisionnementSubject()

  }

  withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
      (click)="modal.close('Ok click')">Ok</button>`;
  open(name: string, id: string) {
   
    const modalRef = this._modalService.open(NgbdModalConfirm);
    modalRef.componentInstance.id = id;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
