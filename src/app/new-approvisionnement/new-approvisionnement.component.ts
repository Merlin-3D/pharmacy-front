import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Approv } from '../models/Approv';
import { ApiService } from '../service/apiService/api-service.service';


@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Nouvelle Entrer!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <form (ngSubmit)="onSubmitEntrer(entrerCatForm)" #entrerCatForm="ngForm">
    <div class="modal-body">
    <div class="alert alert-success" *ngIf="messageSuccess">{{ messageSuccess.content }}</div>

            <div class="form-group">
                <label for="roundText"></label>
                <input type="hidden" id="roundText" name="id_app" class="form-control round"
                    placeholder="Titre de la catégorie" [(ngModel)]="id" >
                <input type="number" id="roundText" name="qte_entrer" class="form-control round"
                    placeholder="Quantité a entrer" ngModel>
            </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Fermer</button>
      <button type="submit" class="btn btn-lg btn-success ml-1"
               >
             <span class="d-none d-sm-block text-white">Entrer</span>
            </button>
    </div>
  </form>
  `
})

export class NgbdModalEntrerContent {
  @Input() id:any;
  @Input() id_medoc:any;

  successSubscription: Subscription = new Subscription;
  messageSuccess: any

  constructor(public activeModal: NgbActiveModal,private apiService: ApiService) {}
  onSubmitEntrer(entrerCatForm: NgForm){

    const body ={
      id_app:entrerCatForm.value.id_app,
      qte_entrer:entrerCatForm.value.qte_entrer,
    }
    console.log(body)
    this.apiService.postRequestService("/stock/nouvelleEntree", body);

    this.successSubscription = this.apiService.successMessageSubject.subscribe(
      (message: any[]) => {
        this.messageSuccess = message
        this.apiService.getOneMedicamentRequest("/stock/medicament/" + this.id_medoc)
        this.apiService.getOneApprovRequest("/stock/one_edicament_approvisionner/" + this.id_medoc)
        this.apiService.getEntrerRequest("/stock/listeEntrer/" + entrerCatForm.value.id_app)
      }, err => {
      }
    )
    this.apiService.emitSuccesSubject()
  }
}

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Nouvelle vente!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <form (ngSubmit)="onSubmitVente(venteCatForm)" #venteCatForm="ngForm">
    <div class="modal-body">
    <div class="alert alert-success" *ngIf="messageSuccess">{{ messageSuccess.content }}</div>
    <input type="hidden" name="id"  [(ngModel)]="id">

            <div class="form-group">
                <label for="roundText"></label>
                <input type="hidden" id="roundText" name="id_app" class="form-control round"
                    placeholder="Titre de la catégorie" [(ngModel)]="id" >
                <input type="number" id="roundText" name="qte_vente" class="form-control round"
                    placeholder="Quantité a vendre" ngModel>
            </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Fermer</button>
      <button type="submit" class="btn btn-lg btn-danger ml-1"
               >
             <span class="d-none d-sm-block text-white">Vendre</span>
            </button>
    </div>
  </form>
  `
})

export class NgbdModalVenteContent {
  @Input() id:any;
  @Input() id_medoc:any;

  successSubscription: Subscription = new Subscription;
  messageSuccess: any

  constructor(public activeModal: NgbActiveModal,private apiService: ApiService) {}
  onSubmitVente(venteCatForm: NgForm){

    const body ={
      id_app:venteCatForm.value.id_app,
      qte_vente:venteCatForm.value.qte_vente,
    }
    this.apiService.postRequestService("/stock/nouvelleVente", body);

    this.successSubscription = this.apiService.successMessageSubject.subscribe(
      (message: any[]) => {
        this.messageSuccess = message
        this.apiService.getOneMedicamentRequest("/stock/medicament/" + this.id_medoc)
        this.apiService.getOneApprovRequest("/stock/one_edicament_approvisionner/" + this.id_medoc)
      }, err => {
      }
    )
    this.apiService.emitSuccesSubject()
  }
}

@Component({
  selector: 'app-new-approvisionnement',
  templateUrl: './new-approvisionnement.component.html',
  styleUrls: ['./new-approvisionnement.component.scss']
})
export class NewApprovisionnementComponent implements OnInit {

  onApprovSubscription: Subscription = new Subscription;
  onMedocSubscription: Subscription = new Subscription;
  entrerSubscription: Subscription = new Subscription;
  successSubscription: Subscription = new Subscription;
  erreurSubscription: Subscription = new Subscription;

  messageErreur: any
  messageSuccess: any
  oneApprov: any
  listEntrer: any
  id_medoc: string = ""
  libelle: any
  qte: any
  p_unit: any
  p_ach_uni: any
  new: boolean = false
  user: any

  id: string = ""
  code: string = ""
  qte_comd: any
  qte_stock: any
  date_approv: string = ""
  date_exp: string = ""
  p_achat_unit: any
  p_total_achat: any
  stock_securite: any
  erreur:any

  constructor(private modalService: NgbModal,private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.new = true
    this.id_medoc = this.route.snapshot.params['id']
    this.user = localStorage.getItem('user_id')
    this.apiService.getOneMedicamentRequest("/stock/medicament/" + this.id_medoc)
    this.onMedocSubscription = this.apiService.getOneMedocSubject.subscribe(
      (result: any[]) => {
        this.libelle = result
        this.qte = result
        this.p_unit = result
        this.p_ach_uni = result
      }
    )
    this.apiService.emitGetOneMedocSubject()

    this.apiService.getOneApprovRequest("/stock/one_edicament_approvisionner/" + this.id_medoc)
    this.onApprovSubscription = this.apiService.getOneApprovMedicSubject.subscribe(
      (result: any[]) => {
        this.oneApprov = result
      }
    )
    this.apiService.emitGetOneApprovSubject()

  }
  

  editer(data:any) {
    this.new = false
    this.id = data._id
    this.code = data.code
    this.qte_comd = data.qte_comd
    this.qte_stock = data.qte_stock
    this.date_approv = data.date_approv
    this.date_exp = data.date_exp
    this.p_achat_unit = data.p_achat_unit
    this.p_total_achat = data.p_total_achat
    this.stock_securite = data.stock_securite

    this.apiService.getEntrerRequest("/stock/listeEntrer/" + data._id)
    this.onApprovSubscription = this.apiService.getOneEntreSubject.subscribe(
      (result: any[]) => {
        console.log(result);
        this.listEntrer = result
      }
    )
    this.apiService.emitGetEntrerSubject()
  }
  nouv() {
    this.new = true
    this.code = ""
    this.qte_comd = ""
    this.date_approv = ""
    this.date_exp = ""
    this.p_achat_unit = ""
    this.p_total_achat = ""
    this.stock_securite = ""
    this.messageSuccess = null
    this.messageErreur = null
    this.erreur = null
  }

  onSubmitApprov(approvForm: NgForm) {

    this.messageErreur = ""
    this.messageSuccess = ""
    this.erreur = null
    if (approvForm.value.code != "" ||
      approvForm.value.qte_comd != "" ||
      approvForm.value.date_approv != "" ||
      approvForm.value.date_exp != "" ||
      approvForm.value.p_achat_unit != "" ||
      approvForm.value.p_total_achat != "" ||
      approvForm.value.stock_securite != "") {
      const approvisionnement = new Approv(
        approvForm.value.code,
        approvForm.value.qte_comd,
        approvForm.value.qte_comd,
        approvForm.value.date_approv,
        approvForm.value.date_exp,
        approvForm.value.p_achat_unit,
        approvForm.value.p_total_achat,
        approvForm.value.stock_securite,
        approvForm.value.medicament,
        approvForm.value.user
      )
      this.apiService.postRequestService("/stock/approvisionner_medicament", approvisionnement);

      this.successSubscription = this.apiService.successMessageSubject.subscribe(
        (message: any[]) => {
          this.messageSuccess = message
          this.apiService.getOneMedicamentRequest("/stock/medicament/" + this.id_medoc)
          this.apiService.getOneApprovRequest("/stock/one_edicament_approvisionner/" + this.id_medoc)

          this.code = ""
          this.qte_comd = ""
          this.date_approv = ""
          this.date_exp = ""
          this.p_achat_unit = ""
          this.p_total_achat = ""
          this.stock_securite = ""
          this.erreur = null
        }, err => {
        }
      )
      this.apiService.emitSuccesSubject()

      this.erreurSubscription = this.apiService.erroMessageSubject.subscribe(
        (error: any[]) => {
          this.messageErreur = error
          this.erreur = null
        }
      )
      this.apiService.emitErrorSubject()
    }else{
      this.erreur = "Tout les champs sont obligatoires"
    }

  }

  vente() {
    const modalRef = this.modalService.open(NgbdModalVenteContent);
    modalRef.componentInstance.id =this.id;
    modalRef.componentInstance.id_medoc =this.id_medoc;
  }

  entrer() {
    const modalRef = this.modalService.open(NgbdModalEntrerContent);
    modalRef.componentInstance.id =this.id;
    modalRef.componentInstance.id_medoc =this.id_medoc;
  }

  saverange(newValue:any) {
    this.p_total_achat = this.qte_comd * newValue
  } 
}
