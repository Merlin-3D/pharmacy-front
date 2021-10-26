import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, Subscription } from 'rxjs';
import { Categorie } from '../models/Categorie';
import { ApiService } from '../service/apiService/api-service.service';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <form (ngSubmit)="onSubmit(signInForm)" #signInForm="ngForm">
    <div class="modal-body">
    
        <div class="modal-body">
            <div class="alert alert-danger" *ngIf="messageErreur">{{ messageErreur.err }}</div>
            <div class="alert alert-success" *ngIf="messageSuccess">{{ messageSuccess.content }}</div>

            <div class="form-group">
                <label for="roundText"></label>
                <input type="text" id="roundText" name="titre" class="form-control round"
                    placeholder="Titre de la catégorie" ngModel>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button"
                class="btn btn-light-secondary"
                data-bs-dismiss="modal">
                <i class="bx bx-x d-block d-sm-none"></i>
                <span class="d-none d-sm-block">Retour</span>
            </button>
          
        </div>

    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Retour</button>
      <button type="submit" class="btn btn-primary ml-1"
               >
                <i class="bx bx-check d-block d-sm-none"></i>
                <span class="d-none d-sm-block">Ajouter</span>
            </button>
    </div>
    </form>
  `
})
export class NgbdModalContentAddCat {
  messageErreur: any
  messageSuccess: any
  successSubscription: Subscription = new Subscription;
    erreurSubscription: Subscription = new Subscription;
  constructor(public activeModal: NgbActiveModal,private apiService: ApiService) {}

  onSubmit(signInForm: NgForm){
  
    this.messageErreur =""
   const categorie = new Categorie(signInForm.value.titre);
   
   this.apiService.postRequestService("/stock/ajouter_categorie",categorie);

   this.successSubscription = this.apiService.successMessageSubject.subscribe(
     (message: any[])=>{
       this.messageSuccess = message
       this.apiService.getRequest("/stock/categorie")
     }, err => {
    }
   )
    this.apiService.emitSuccesSubject()

   this.erreurSubscription = this.apiService.erroMessageSubject.subscribe(
    (error: any[])=>{
      this.messageErreur = error
    }
  ) 
  this.apiService.emitErrorSubject()
 }

}

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Modifier une catégorie!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <form (ngSubmit)="onSubmitEdit(editCatForm)" #editCatForm="ngForm">
    <div class="modal-body">
    <div class="alert alert-success" *ngIf="messageSuccess">{{ messageSuccess.content }}</div>
    <input type="hidden" name="id"  [(ngModel)]="id">

            <div class="form-group">
                <label for="roundText"></label>
                <input type="text" id="roundText" name="titre" class="form-control round"
                    placeholder="Titre de la catégorie"  [(ngModel)]="name">
            </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Fermer</button>
      <button type="submit" class="btn btn-lg btn-info ml-1"
               >
             <span class="d-none d-sm-block text-white">Modifier</span>
            </button>
    </div>
  </form>
  `
})

export class NgbdModalContent {
  @Input() name:any;
  @Input() id:any;

  successSubscription: Subscription = new Subscription;
  messageSuccess: any

  constructor(public activeModal: NgbActiveModal,private apiService: ApiService) {}
  onSubmitEdit(editCatForm: NgForm){

    const categorie = new Categorie(editCatForm.value.titre);
    this.apiService.putRequestService("/stock/modifier_categorie/"+ editCatForm.value.id,categorie);
     this.successSubscription = this.apiService.successMessageSubject.subscribe(
       (message: any[])=>{
         console.log(message)
         this.messageSuccess = message
         this.apiService.getRequest("/stock/categorie")
       }, err => {
        console.log(err)
      }
     )
      this.apiService.emitSuccesSubject()
  }
}

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit,OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  resultSubscription: Subscription = new Subscription;
  successSubscription: Subscription = new Subscription;
  erreurSubscription: Subscription = new Subscription;

  categories: any;
  messageErreur: any
  messageSuccess: any
  

  constructor(private chRef: ChangeDetectorRef,private modalService: NgbModal,private apiService: ApiService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    this.categories = [];
    this.apiService.getRequest("/stock/categorie")
    this.resultSubscription = this.apiService.getResultSubject.subscribe(
      (result: any[])=>{

        this.categories = result

        this.dtTrigger.next();
    
      }
    ) 
    this.apiService.emitGetResultSubject()
    // setTimeout(()=>{this.showContent=true}, 250);
    
  }


  open(id:any, titre:any) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.id =id;
    modalRef.componentInstance.name = titre;
  }
  
  openAdd() {
    const modalRef = this.modalService.open(NgbdModalContentAddCat);
    modalRef.componentInstance.name = 'World';
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


}
