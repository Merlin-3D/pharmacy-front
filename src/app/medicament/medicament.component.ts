import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Subscription } from 'rxjs';
import { Medicament } from '../models/Medicament';
import { ApiService } from '../service/apiService/api-service.service';


@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header bg-primary">
      <h4 class="modal-title text-white">Modifier un médicament!</h4>
      <button type="button" class="btn btn-secondary" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <form (ngSubmit)="onEditSubmit(editMedocForm)" #editMedocForm="ngForm">

    <div class="modal-body">
        <div class="modal-body">
            <div class="alert alert-danger" *ngIf="messageErreur">{{ messageErreur.err }}</div>
            <div class="alert alert-success" *ngIf="messageSuccess">{{ messageSuccess.content }}</div>

            <div class="form-group">
            <input type="hidden" id="roundText" name="id" class="form-control round" [(ngModel)]="id_medoc">
                <input type="text" id="roundText" name="libelle" class="form-control round"
                    placeholder="Titre du médicament" [(ngModel)]="libelle">
            </div>
            <div class="form-group mt-4">
                <input type="number" id="roundText" name="p_unit" class="form-control round"
                    placeholder="Prix unitaire" [(ngModel)]="p_unit">
            </div>
            <div class="form-group  mt-4">
                <input type="number" id="roundText" name="p_achat_unit" class="form-control round"
                    placeholder="Prix d'achat unitaire" [(ngModel)]="p_achat_unit">
            </div>
            <div class="form-group  mt-4">
              <div class="form-group">
                <label for="">
              {{ val_categorie }}

                </label>
              </div>
            <div class="input-group mb-3">
            <label for="roundText">
            </label>
                <select  class="form-select" name="categorie" id="inputGroupSelect01" ngModel>
                    <option selected>Choisir...</option>
                    <option  *ngFor="let data of categories.content"  [value]="data._id">{{ data.titre }}</option>
                </select>
                <label class="input-group-text"
                    for="inputGroupSelect01">Catégories</label>
            </div>
            </div>

        </div>
    
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Fermer</button>
      <button type="submit" class="btn btn-info ml-1"
               >
                <i class="bx bx-check d-block d-sm-none"></i>
                <span class="d-none d-sm-block text-white">Modifier</span>
            </button>
    </div>
    </form>

  `
})
export class NgbdModalContentEditMedicament {
  successSubscription: Subscription = new Subscription;
  erreurSubscription: Subscription = new Subscription;
  messageSuccess: any
  messageErreur: any
  @Input() id_medoc: any;
  @Input() categories: any;
  @Input() libelle: any;
  @Input() p_achat_unit: any;
  @Input() p_unit: any;
  @Input() val_categorie: any;
  @Input() id_categorie: any;

  constructor(public activeModal: NgbActiveModal, private apiService: ApiService) { }

  onEditSubmit(editMedocForm: NgForm) {
    this.messageSuccess = ""
    this.messageErreur = ""
    const medicament = {
      libelle: editMedocForm.value.libelle,
      p_achat_unit: editMedocForm.value.p_achat_unit,
      p_unit: editMedocForm.value.p_unit,
      categorie: editMedocForm.value.categorie ? editMedocForm.value.categorie : this.id_categorie
    };
    this.apiService.putRequestService("/stock/modifier_medicament/" + editMedocForm.value.id, medicament);
    this.successSubscription = this.apiService.successMessageSubject.subscribe(
      (message: any[]) => {
        this.messageSuccess = message
        this.messageErreur = ""
        this.apiService.getMedicamentRequest("/stock/medicament")
      }, err => {
        console.log(err)
      }
    )
    this.apiService.emitSuccesSubject()

    this.erreurSubscription = this.apiService.erroMessageSubject.subscribe(
      (error: any[]) => {
        this.messageErreur = error
        this.messageSuccess = ""
        console.log(error)
      }
    )
    this.apiService.emitErrorSubject()
  }
}

@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Suppression...</h4>
    <button type="button" class="btn btn-secondary" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Etes-vous sûr que vous voulez supprimer le médicament <strong class="text-primary">{{ name }}</strong>  ?</strong></p>
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
  @Input() id: any;
  @Input() name: any;

  constructor(public modal: NgbActiveModal, private apiService: ApiService) { }
  resultSubscription: Subscription = new Subscription;
  onDelete(id: any) {
    this.apiService.deleteRequesteService("/stock/supprimer_medicament/" + id)
    this.resultSubscription = this.apiService.successMessageSubject.subscribe(
      (result: any[]) => {

        this.apiService.getMedicamentRequest("/stock/medicament")
        this.modal.close('Ok click')

      }
    )
    this.apiService.emitSuccesSubject()
  }
}

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header bg-primary">
      <h4 class="modal-title text-white">Ajouter un médicament!</h4>
      <button type="button" class="btn btn-secondary" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <form (ngSubmit)="onSubmit(newMedocForm)" #newMedocForm="ngForm">

    <div class="modal-body">
        <div class="modal-body">
            <div class="alert alert-danger" *ngIf="messageErreur">{{ messageErreur.err }}</div>
            <div class="alert alert-success" *ngIf="messageSuccess">{{ messageSuccess.content }}</div>

            <div class="form-group">
                <input type="text" id="roundText" name="libelle" class="form-control round"
                    placeholder="Titre du médicament" ngModel>
            </div>
            <div class="form-group mt-4">
                <input type="number" id="roundText" name="p_unit" class="form-control round"
                    placeholder="Prix unitaire" ngModel>
            </div>
            <div class="form-group mt-4">
                <input type="number" id="roundText" name="p_achat_unit" class="form-control round"
                    placeholder="Prix d'achat unitaire" ngModel>
            </div>
            <div class="form-group mt-4">
            <div class="input-group mb-3">
            <label for="roundText"></label>
            <select class="form-select" name="categorie" id="inputGroupSelect01" ngModel>
                <option selected>Choisir...</option>
                <option  *ngFor="let data of categories.content"  [value]="data._id">{{ data.titre }}</option>
            </select>
            <label class="input-group-text"
                for="inputGroupSelect01">Catégories</label>
        </div>
            </div>

        </div>
    
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Fermer</button>
      <button type="submit" class="btn btn-primary ml-1"
               >
                <i class="bx bx-check d-block d-sm-none"></i>
                <span class="d-none d-sm-block">Ajouter</span>
            </button>
    </div>
    </form>

  `
})
export class NgbdModalContentMedicament {
  successSubscription: Subscription = new Subscription;
  erreurSubscription: Subscription = new Subscription;
  messageSuccess: any
  messageErreur: any
  @Input() categories: any;

  constructor(public activeModal: NgbActiveModal, private apiService: ApiService) { }

  onSubmit(newMedocForm: NgForm) {
    const medicament = new Medicament(newMedocForm.value.libelle, newMedocForm.value.p_achat_unit, 0, newMedocForm.value.p_unit, 0, newMedocForm.value.categorie);
    this.apiService.postRequestService("/stock/ajouter_medicament", medicament);
    this.successSubscription = this.apiService.successMessageSubject.subscribe(
      (message: any[]) => {
        this.messageSuccess = message
        this.apiService.getMedicamentRequest("/stock/medicament")
      }, err => {
        console.log(err)
      }
    )
    this.apiService.emitSuccesSubject()

    this.erreurSubscription = this.apiService.erroMessageSubject.subscribe(
      (error: any[]) => {
        this.messageErreur = error
        console.log(error)
      }
    )
    this.apiService.emitErrorSubject()
  }
}

@Component({
  selector: 'app-medicament',
  templateUrl: './medicament.component.html',
  styleUrls: ['./medicament.component.scss']
})
export class MedicamentComponent implements OnInit,OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor( private modalService: NgbModal, private apiService: ApiService) { }
  resultSubscription: Subscription = new Subscription;
  resultMedicamentSubscription: Subscription = new Subscription;
  categories: any;
  medicaments: any;

  ngOnInit(): void {
    this.apiService.getMedicamentRequest("/stock/medicament")
    this.resultMedicamentSubscription = this.apiService.getMedicamentSubject.subscribe(
      (result: any[]) => {
        this.medicaments = result
      }
    )
    this.apiService.emitGetMedicamentSubject()
    this.apiService.getRequest("/stock/categorie")
    this.resultSubscription = this.apiService.getResultSubject.subscribe(
      (result: any[]) => {
        console.log(result)
        this.categories = result
        this.dtTrigger.next();
      }
    )
    this.apiService.emitGetResultSubject()
  }

  open() {
    const modalRef = this.modalService.open(NgbdModalContentMedicament);
    modalRef.componentInstance.categories = this.categories;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  delete(name: string, id: string) {
    const modalRef = this.modalService.open(NgbdModalConfirm);
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.name = name;
  }

  modifier(data: any) {
    const modalRef = this.modalService.open(NgbdModalContentEditMedicament);
    modalRef.componentInstance.categories = this.categories;
    modalRef.componentInstance.libelle = data.libelle;
    modalRef.componentInstance.p_achat_unit = data.p_achat_unit;
    modalRef.componentInstance.p_unit = data.p_unit;
    modalRef.componentInstance.val_categorie = data.categorie.titre;
    modalRef.componentInstance.id_medoc = data._id;
    modalRef.componentInstance.id_categorie = data.categorie
  }
}
