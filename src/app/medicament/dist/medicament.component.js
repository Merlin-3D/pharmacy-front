"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MedicamentComponent = exports.NgbdModalContentMedicament = exports.NgbdModalConfirm = exports.NgbdModalContentEditMedicament = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var Medicament_1 = require("../models/Medicament");
var NgbdModalContentEditMedicament = /** @class */ (function () {
    function NgbdModalContentEditMedicament(activeModal, apiService) {
        this.activeModal = activeModal;
        this.apiService = apiService;
        this.successSubscription = new rxjs_1.Subscription;
        this.erreurSubscription = new rxjs_1.Subscription;
    }
    NgbdModalContentEditMedicament.prototype.onEditSubmit = function (editMedocForm) {
        var _this = this;
        this.messageSuccess = "";
        this.messageErreur = "";
        var medicament = {
            libelle: editMedocForm.value.libelle,
            p_achat_unit: editMedocForm.value.p_achat_unit,
            p_unit: editMedocForm.value.p_unit,
            categorie: editMedocForm.value.categorie ? editMedocForm.value.categorie : this.id_categorie
        };
        this.apiService.putRequestService("/stock/modifier_medicament/" + editMedocForm.value.id, medicament);
        this.successSubscription = this.apiService.successMessageSubject.subscribe(function (message) {
            _this.messageSuccess = message;
            _this.messageErreur = "";
            _this.apiService.getMedicamentRequest("/stock/medicament");
        }, function (err) {
            console.log(err);
        });
        this.apiService.emitSuccesSubject();
        this.erreurSubscription = this.apiService.erroMessageSubject.subscribe(function (error) {
            _this.messageErreur = error;
            _this.messageSuccess = "";
            console.log(error);
        });
        this.apiService.emitErrorSubject();
    };
    __decorate([
        core_1.Input()
    ], NgbdModalContentEditMedicament.prototype, "id_medoc");
    __decorate([
        core_1.Input()
    ], NgbdModalContentEditMedicament.prototype, "categories");
    __decorate([
        core_1.Input()
    ], NgbdModalContentEditMedicament.prototype, "libelle");
    __decorate([
        core_1.Input()
    ], NgbdModalContentEditMedicament.prototype, "p_achat_unit");
    __decorate([
        core_1.Input()
    ], NgbdModalContentEditMedicament.prototype, "p_unit");
    __decorate([
        core_1.Input()
    ], NgbdModalContentEditMedicament.prototype, "val_categorie");
    __decorate([
        core_1.Input()
    ], NgbdModalContentEditMedicament.prototype, "id_categorie");
    NgbdModalContentEditMedicament = __decorate([
        core_1.Component({
            selector: 'ngbd-modal-content',
            template: "\n    <div class=\"modal-header bg-primary\">\n      <h4 class=\"modal-title text-white\">Modifier un m\u00E9dicament!</h4>\n      <button type=\"button\" class=\"btn btn-secondary\" aria-label=\"Close\" (click)=\"activeModal.dismiss('Cross click')\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <form (ngSubmit)=\"onEditSubmit(editMedocForm)\" #editMedocForm=\"ngForm\">\n\n    <div class=\"modal-body\">\n        <div class=\"modal-body\">\n            <div class=\"alert alert-danger\" *ngIf=\"messageErreur\">{{ messageErreur.err }}</div>\n            <div class=\"alert alert-success\" *ngIf=\"messageSuccess\">{{ messageSuccess.content }}</div>\n\n            <div class=\"form-group\">\n            <input type=\"hidden\" id=\"roundText\" name=\"id\" class=\"form-control round\" [(ngModel)]=\"id_medoc\">\n                <input type=\"text\" id=\"roundText\" name=\"libelle\" class=\"form-control round\"\n                    placeholder=\"Titre du m\u00E9dicament\" [(ngModel)]=\"libelle\">\n            </div>\n            <div class=\"form-group mt-4\">\n                <input type=\"number\" id=\"roundText\" name=\"p_unit\" class=\"form-control round\"\n                    placeholder=\"Prix unitaire\" [(ngModel)]=\"p_unit\">\n            </div>\n            <div class=\"form-group  mt-4\">\n                <input type=\"number\" id=\"roundText\" name=\"p_achat_unit\" class=\"form-control round\"\n                    placeholder=\"Prix d'achat unitaire\" [(ngModel)]=\"p_achat_unit\">\n            </div>\n            <div class=\"form-group  mt-4\">\n              <div class=\"form-group\">\n                <label for=\"\">\n              {{ val_categorie }}\n\n                </label>\n              </div>\n            <div class=\"input-group mb-3\">\n            <label for=\"roundText\">\n            </label>\n                <select  class=\"form-select\" name=\"categorie\" id=\"inputGroupSelect01\" ngModel>\n                    <option selected>Choisir...</option>\n                    <option  *ngFor=\"let data of categories.content\"  [value]=\"data._id\">{{ data.titre }}</option>\n                </select>\n                <label class=\"input-group-text\"\n                    for=\"inputGroupSelect01\">Cat\u00E9gories</label>\n            </div>\n            </div>\n\n        </div>\n    \n    </div>\n    <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"activeModal.close('Close click')\">Fermer</button>\n      <button type=\"submit\" class=\"btn btn-info ml-1\"\n               >\n                <i class=\"bx bx-check d-block d-sm-none\"></i>\n                <span class=\"d-none d-sm-block text-white\">Modifier</span>\n            </button>\n    </div>\n    </form>\n\n  "
        })
    ], NgbdModalContentEditMedicament);
    return NgbdModalContentEditMedicament;
}());
exports.NgbdModalContentEditMedicament = NgbdModalContentEditMedicament;
var NgbdModalConfirm = /** @class */ (function () {
    function NgbdModalConfirm(modal, apiService) {
        this.modal = modal;
        this.apiService = apiService;
        this.resultSubscription = new rxjs_1.Subscription;
    }
    NgbdModalConfirm.prototype.onDelete = function (id) {
        var _this = this;
        this.apiService.deleteRequesteService("/stock/supprimer_medicament/" + id);
        this.resultSubscription = this.apiService.successMessageSubject.subscribe(function (result) {
            _this.apiService.getMedicamentRequest("/stock/medicament");
            _this.modal.close('Ok click');
        });
        this.apiService.emitSuccesSubject();
    };
    __decorate([
        core_1.Input()
    ], NgbdModalConfirm.prototype, "id");
    __decorate([
        core_1.Input()
    ], NgbdModalConfirm.prototype, "name");
    NgbdModalConfirm = __decorate([
        core_1.Component({
            selector: 'ngbd-modal-confirm',
            template: "\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title\" id=\"modal-title\">Suppression...</h4>\n    <button type=\"button\" class=\"btn btn-secondary\" aria-describedby=\"modal-title\" (click)=\"modal.dismiss('Cross click')\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div class=\"modal-body\">\n    <p><strong>Etes-vous s\u00FBr que vous voulez supprimer le m\u00E9dicament <strong class=\"text-primary\">{{ name }}</strong>  ?</strong></p>\n    <p>\n    Toutes les informations associ\u00E9es \u00E0 cet approvisionnement seront d\u00E9finitivement supprim\u00E9es.\n    <span class=\"text-danger\">Cette op\u00E9ration ne peut pas \u00EAtre annul\u00E9e.</span>\n    </p>\n  </div>\n  <div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-outline-secondary\" (click)=\"modal.dismiss('cancel click')\">Retour</button>\n    <button type=\"button\" class=\"btn btn-danger\" (click)=\"onDelete(id)\">Ok</button>\n  </div>\n  "
        })
    ], NgbdModalConfirm);
    return NgbdModalConfirm;
}());
exports.NgbdModalConfirm = NgbdModalConfirm;
var NgbdModalContentMedicament = /** @class */ (function () {
    function NgbdModalContentMedicament(activeModal, apiService) {
        this.activeModal = activeModal;
        this.apiService = apiService;
        this.successSubscription = new rxjs_1.Subscription;
        this.erreurSubscription = new rxjs_1.Subscription;
    }
    NgbdModalContentMedicament.prototype.onSubmit = function (newMedocForm) {
        var _this = this;
        var medicament = new Medicament_1.Medicament(newMedocForm.value.libelle, newMedocForm.value.p_achat_unit, 0, newMedocForm.value.p_unit, 0, newMedocForm.value.categorie);
        this.apiService.postRequestService("/stock/ajouter_medicament", medicament);
        this.successSubscription = this.apiService.successMessageSubject.subscribe(function (message) {
            _this.messageSuccess = message;
            _this.apiService.getMedicamentRequest("/stock/medicament");
        }, function (err) {
            console.log(err);
        });
        this.apiService.emitSuccesSubject();
        this.erreurSubscription = this.apiService.erroMessageSubject.subscribe(function (error) {
            _this.messageErreur = error;
            console.log(error);
        });
        this.apiService.emitErrorSubject();
    };
    __decorate([
        core_1.Input()
    ], NgbdModalContentMedicament.prototype, "categories");
    NgbdModalContentMedicament = __decorate([
        core_1.Component({
            selector: 'ngbd-modal-content',
            template: "\n    <div class=\"modal-header bg-primary\">\n      <h4 class=\"modal-title text-white\">Ajouter un m\u00E9dicament!</h4>\n      <button type=\"button\" class=\"btn btn-secondary\" aria-label=\"Close\" (click)=\"activeModal.dismiss('Cross click')\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <form (ngSubmit)=\"onSubmit(newMedocForm)\" #newMedocForm=\"ngForm\">\n\n    <div class=\"modal-body\">\n        <div class=\"modal-body\">\n            <div class=\"alert alert-danger\" *ngIf=\"messageErreur\">{{ messageErreur.err }}</div>\n            <div class=\"alert alert-success\" *ngIf=\"messageSuccess\">{{ messageSuccess.content }}</div>\n\n            <div class=\"form-group\">\n                <input type=\"text\" id=\"roundText\" name=\"libelle\" class=\"form-control round\"\n                    placeholder=\"Titre du m\u00E9dicament\" ngModel>\n            </div>\n            <div class=\"form-group mt-4\">\n                <input type=\"number\" id=\"roundText\" name=\"p_unit\" class=\"form-control round\"\n                    placeholder=\"Prix unitaire\" ngModel>\n            </div>\n            <div class=\"form-group mt-4\">\n                <input type=\"number\" id=\"roundText\" name=\"p_achat_unit\" class=\"form-control round\"\n                    placeholder=\"Prix d'achat unitaire\" ngModel>\n            </div>\n            <div class=\"form-group mt-4\">\n            <div class=\"input-group mb-3\">\n            <label for=\"roundText\"></label>\n            <select class=\"form-select\" name=\"categorie\" id=\"inputGroupSelect01\" ngModel>\n                <option selected>Choisir...</option>\n                <option  *ngFor=\"let data of categories.content\"  [value]=\"data._id\">{{ data.titre }}</option>\n            </select>\n            <label class=\"input-group-text\"\n                for=\"inputGroupSelect01\">Cat\u00E9gories</label>\n        </div>\n            </div>\n\n        </div>\n    \n    </div>\n    <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"activeModal.close('Close click')\">Fermer</button>\n      <button type=\"submit\" class=\"btn btn-primary ml-1\"\n               >\n                <i class=\"bx bx-check d-block d-sm-none\"></i>\n                <span class=\"d-none d-sm-block\">Ajouter</span>\n            </button>\n    </div>\n    </form>\n\n  "
        })
    ], NgbdModalContentMedicament);
    return NgbdModalContentMedicament;
}());
exports.NgbdModalContentMedicament = NgbdModalContentMedicament;
var MedicamentComponent = /** @class */ (function () {
    function MedicamentComponent(modalService, apiService) {
        this.modalService = modalService;
        this.apiService = apiService;
        this.dtOptions = {};
        this.dtTrigger = new rxjs_1.Subject();
        this.resultSubscription = new rxjs_1.Subscription;
        this.resultMedicamentSubscription = new rxjs_1.Subscription;
    }
    MedicamentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.getMedicamentRequest("/stock/medicament");
        this.resultMedicamentSubscription = this.apiService.getMedicamentSubject.subscribe(function (result) {
            _this.medicaments = result;
        });
        this.apiService.emitGetMedicamentSubject();
        this.apiService.getRequest("/stock/categorie");
        this.resultSubscription = this.apiService.getResultSubject.subscribe(function (result) {
            console.log(result);
            _this.categories = result;
            _this.dtTrigger.next();
        });
        this.apiService.emitGetResultSubject();
    };
    MedicamentComponent.prototype.open = function () {
        var modalRef = this.modalService.open(NgbdModalContentMedicament);
        modalRef.componentInstance.categories = this.categories;
    };
    MedicamentComponent.prototype.ngOnDestroy = function () {
        this.dtTrigger.unsubscribe();
    };
    MedicamentComponent.prototype["delete"] = function (name, id) {
        var modalRef = this.modalService.open(NgbdModalConfirm);
        modalRef.componentInstance.id = id;
        modalRef.componentInstance.name = name;
    };
    MedicamentComponent.prototype.modifier = function (data) {
        var modalRef = this.modalService.open(NgbdModalContentEditMedicament);
        modalRef.componentInstance.categories = this.categories;
        modalRef.componentInstance.libelle = data.libelle;
        modalRef.componentInstance.p_achat_unit = data.p_achat_unit;
        modalRef.componentInstance.p_unit = data.p_unit;
        modalRef.componentInstance.val_categorie = data.categorie.titre;
        modalRef.componentInstance.id_medoc = data._id;
        modalRef.componentInstance.id_categorie = data.categorie;
    };
    MedicamentComponent = __decorate([
        core_1.Component({
            selector: 'app-medicament',
            templateUrl: './medicament.component.html',
            styleUrls: ['./medicament.component.scss']
        })
    ], MedicamentComponent);
    return MedicamentComponent;
}());
exports.MedicamentComponent = MedicamentComponent;
