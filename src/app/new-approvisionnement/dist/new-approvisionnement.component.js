"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NewApprovisionnementComponent = exports.NgbdModalVenteContent = exports.NgbdModalEntrerContent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var Approv_1 = require("../models/Approv");
var NgbdModalEntrerContent = /** @class */ (function () {
    function NgbdModalEntrerContent(activeModal, apiService) {
        this.activeModal = activeModal;
        this.apiService = apiService;
        this.successSubscription = new rxjs_1.Subscription;
    }
    NgbdModalEntrerContent.prototype.onSubmitEntrer = function (entrerCatForm) {
        var _this = this;
        var body = {
            id_app: entrerCatForm.value.id_app,
            qte_entrer: entrerCatForm.value.qte_entrer
        };
        console.log(body);
        this.apiService.postRequestService("/stock/nouvelleEntree", body);
        this.successSubscription = this.apiService.successMessageSubject.subscribe(function (message) {
            _this.messageSuccess = message;
            _this.apiService.getOneMedicamentRequest("/stock/medicament/" + _this.id_medoc);
            _this.apiService.getOneApprovRequest("/stock/one_edicament_approvisionner/" + _this.id_medoc);
            _this.apiService.getEntrerRequest("/stock/listeEntrer/" + entrerCatForm.value.id_app);
        }, function (err) {
        });
        this.apiService.emitSuccesSubject();
    };
    __decorate([
        core_1.Input()
    ], NgbdModalEntrerContent.prototype, "id");
    __decorate([
        core_1.Input()
    ], NgbdModalEntrerContent.prototype, "id_medoc");
    NgbdModalEntrerContent = __decorate([
        core_1.Component({
            selector: 'ngbd-modal-content',
            template: "\n    <div class=\"modal-header\">\n      <h4 class=\"modal-title\">Nouvelle Entrer!</h4>\n      <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"activeModal.dismiss('Cross click')\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <form (ngSubmit)=\"onSubmitEntrer(entrerCatForm)\" #entrerCatForm=\"ngForm\">\n    <div class=\"modal-body\">\n    <div class=\"alert alert-success\" *ngIf=\"messageSuccess\">{{ messageSuccess.content }}</div>\n\n            <div class=\"form-group\">\n                <label for=\"roundText\"></label>\n                <input type=\"hidden\" id=\"roundText\" name=\"id_app\" class=\"form-control round\"\n                    placeholder=\"Titre de la cat\u00E9gorie\" [(ngModel)]=\"id\" >\n                <input type=\"number\" id=\"roundText\" name=\"qte_entrer\" class=\"form-control round\"\n                    placeholder=\"Quantit\u00E9 a entrer\" ngModel>\n            </div>\n    </div>\n    <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"activeModal.close('Close click')\">Fermer</button>\n      <button type=\"submit\" class=\"btn btn-lg btn-success ml-1\"\n               >\n             <span class=\"d-none d-sm-block text-white\">Entrer</span>\n            </button>\n    </div>\n  </form>\n  "
        })
    ], NgbdModalEntrerContent);
    return NgbdModalEntrerContent;
}());
exports.NgbdModalEntrerContent = NgbdModalEntrerContent;
var NgbdModalVenteContent = /** @class */ (function () {
    function NgbdModalVenteContent(activeModal, apiService) {
        this.activeModal = activeModal;
        this.apiService = apiService;
        this.successSubscription = new rxjs_1.Subscription;
    }
    NgbdModalVenteContent.prototype.onSubmitVente = function (venteCatForm) {
        var _this = this;
        var body = {
            id_app: venteCatForm.value.id_app,
            qte_vente: venteCatForm.value.qte_vente
        };
        this.apiService.postRequestService("/stock/nouvelleVente", body);
        this.successSubscription = this.apiService.successMessageSubject.subscribe(function (message) {
            _this.messageSuccess = message;
            _this.apiService.getOneMedicamentRequest("/stock/medicament/" + _this.id_medoc);
            _this.apiService.getOneApprovRequest("/stock/one_edicament_approvisionner/" + _this.id_medoc);
        }, function (err) {
        });
        this.apiService.emitSuccesSubject();
    };
    __decorate([
        core_1.Input()
    ], NgbdModalVenteContent.prototype, "id");
    __decorate([
        core_1.Input()
    ], NgbdModalVenteContent.prototype, "id_medoc");
    NgbdModalVenteContent = __decorate([
        core_1.Component({
            selector: 'ngbd-modal-content',
            template: "\n    <div class=\"modal-header\">\n      <h4 class=\"modal-title\">Nouvelle vente!</h4>\n      <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"activeModal.dismiss('Cross click')\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <form (ngSubmit)=\"onSubmitVente(venteCatForm)\" #venteCatForm=\"ngForm\">\n    <div class=\"modal-body\">\n    <div class=\"alert alert-success\" *ngIf=\"messageSuccess\">{{ messageSuccess.content }}</div>\n    <input type=\"hidden\" name=\"id\"  [(ngModel)]=\"id\">\n\n            <div class=\"form-group\">\n                <label for=\"roundText\"></label>\n                <input type=\"hidden\" id=\"roundText\" name=\"id_app\" class=\"form-control round\"\n                    placeholder=\"Titre de la cat\u00E9gorie\" [(ngModel)]=\"id\" >\n                <input type=\"number\" id=\"roundText\" name=\"qte_vente\" class=\"form-control round\"\n                    placeholder=\"Quantit\u00E9 a vendre\" ngModel>\n            </div>\n    </div>\n    <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"activeModal.close('Close click')\">Fermer</button>\n      <button type=\"submit\" class=\"btn btn-lg btn-danger ml-1\"\n               >\n             <span class=\"d-none d-sm-block text-white\">Vendre</span>\n            </button>\n    </div>\n  </form>\n  "
        })
    ], NgbdModalVenteContent);
    return NgbdModalVenteContent;
}());
exports.NgbdModalVenteContent = NgbdModalVenteContent;
var NewApprovisionnementComponent = /** @class */ (function () {
    function NewApprovisionnementComponent(modalService, route, apiService) {
        this.modalService = modalService;
        this.route = route;
        this.apiService = apiService;
        this.onApprovSubscription = new rxjs_1.Subscription;
        this.onMedocSubscription = new rxjs_1.Subscription;
        this.entrerSubscription = new rxjs_1.Subscription;
        this.successSubscription = new rxjs_1.Subscription;
        this.erreurSubscription = new rxjs_1.Subscription;
        this.id_medoc = "";
        this["new"] = false;
        this.id = "";
        this.code = "";
        this.date_approv = "";
        this.date_exp = "";
    }
    NewApprovisionnementComponent.prototype.ngOnInit = function () {
        var _this = this;
        this["new"] = true;
        this.id_medoc = this.route.snapshot.params['id'];
        this.user = localStorage.getItem('user_id');
        this.apiService.getOneMedicamentRequest("/stock/medicament/" + this.id_medoc);
        this.onMedocSubscription = this.apiService.getOneMedocSubject.subscribe(function (result) {
            _this.libelle = result;
            _this.qte = result;
            _this.p_unit = result;
            _this.p_ach_uni = result;
        });
        this.apiService.emitGetOneMedocSubject();
        this.apiService.getOneApprovRequest("/stock/one_edicament_approvisionner/" + this.id_medoc);
        this.onApprovSubscription = this.apiService.getOneApprovMedicSubject.subscribe(function (result) {
            _this.oneApprov = result;
        });
        this.apiService.emitGetOneApprovSubject();
    };
    NewApprovisionnementComponent.prototype.editer = function (data) {
        var _this = this;
        this["new"] = false;
        this.id = data._id;
        this.code = data.code;
        this.qte_comd = data.qte_comd;
        this.qte_stock = data.qte_stock;
        this.date_approv = data.date_approv;
        this.date_exp = data.date_exp;
        this.p_achat_unit = data.p_achat_unit;
        this.p_total_achat = data.p_total_achat;
        this.stock_securite = data.stock_securite;
        this.apiService.getEntrerRequest("/stock/listeEntrer/" + data._id);
        this.onApprovSubscription = this.apiService.getOneEntreSubject.subscribe(function (result) {
            console.log(result);
            _this.listEntrer = result;
        });
        this.apiService.emitGetEntrerSubject();
    };
    NewApprovisionnementComponent.prototype.nouv = function () {
        this["new"] = true;
        this.code = "";
        this.qte_comd = "";
        this.date_approv = "";
        this.date_exp = "";
        this.p_achat_unit = "";
        this.p_total_achat = "";
        this.stock_securite = "";
        this.messageSuccess = null;
        this.messageErreur = null;
        this.erreur = null;
    };
    NewApprovisionnementComponent.prototype.onSubmitApprov = function (approvForm) {
        var _this = this;
        this.messageErreur = "";
        this.messageSuccess = "";
        this.erreur = null;
        if (approvForm.value.code != "" ||
            approvForm.value.qte_comd != "" ||
            approvForm.value.date_approv != "" ||
            approvForm.value.date_exp != "" ||
            approvForm.value.p_achat_unit != "" ||
            approvForm.value.p_total_achat != "" ||
            approvForm.value.stock_securite != "") {
            var approvisionnement = new Approv_1.Approv(approvForm.value.code, approvForm.value.qte_comd, approvForm.value.qte_comd, approvForm.value.date_approv, approvForm.value.date_exp, approvForm.value.p_achat_unit, approvForm.value.p_total_achat, approvForm.value.stock_securite, approvForm.value.medicament, approvForm.value.user);
            this.apiService.postRequestService("/stock/approvisionner_medicament", approvisionnement);
            this.successSubscription = this.apiService.successMessageSubject.subscribe(function (message) {
                _this.messageSuccess = message;
                _this.apiService.getOneMedicamentRequest("/stock/medicament/" + _this.id_medoc);
                _this.apiService.getOneApprovRequest("/stock/one_edicament_approvisionner/" + _this.id_medoc);
                _this.code = "";
                _this.qte_comd = "";
                _this.date_approv = "";
                _this.date_exp = "";
                _this.p_achat_unit = "";
                _this.p_total_achat = "";
                _this.stock_securite = "";
                _this.erreur = null;
            }, function (err) {
            });
            this.apiService.emitSuccesSubject();
            this.erreurSubscription = this.apiService.erroMessageSubject.subscribe(function (error) {
                _this.messageErreur = error;
                _this.erreur = null;
            });
            this.apiService.emitErrorSubject();
        }
        else {
            this.erreur = "Tout les champs sont obligatoires";
        }
    };
    NewApprovisionnementComponent.prototype.vente = function () {
        var modalRef = this.modalService.open(NgbdModalVenteContent);
        modalRef.componentInstance.id = this.id;
        modalRef.componentInstance.id_medoc = this.id_medoc;
    };
    NewApprovisionnementComponent.prototype.entrer = function () {
        var modalRef = this.modalService.open(NgbdModalEntrerContent);
        modalRef.componentInstance.id = this.id;
        modalRef.componentInstance.id_medoc = this.id_medoc;
    };
    NewApprovisionnementComponent.prototype.saverange = function (newValue) {
        this.p_total_achat = this.qte_comd * newValue;
    };
    NewApprovisionnementComponent = __decorate([
        core_1.Component({
            selector: 'app-new-approvisionnement',
            templateUrl: './new-approvisionnement.component.html',
            styleUrls: ['./new-approvisionnement.component.scss']
        })
    ], NewApprovisionnementComponent);
    return NewApprovisionnementComponent;
}());
exports.NewApprovisionnementComponent = NewApprovisionnementComponent;
