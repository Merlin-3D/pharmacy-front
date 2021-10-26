"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CategorieComponent = exports.NgbdModalContent = exports.NgbdModalContentAddCat = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var Categorie_1 = require("../models/Categorie");
var NgbdModalContentAddCat = /** @class */ (function () {
    function NgbdModalContentAddCat(activeModal, apiService) {
        this.activeModal = activeModal;
        this.apiService = apiService;
        this.successSubscription = new rxjs_1.Subscription;
        this.erreurSubscription = new rxjs_1.Subscription;
    }
    NgbdModalContentAddCat.prototype.onSubmit = function (signInForm) {
        var _this = this;
        this.messageErreur = "";
        var categorie = new Categorie_1.Categorie(signInForm.value.titre);
        this.apiService.postRequestService("/stock/ajouter_categorie", categorie);
        this.successSubscription = this.apiService.successMessageSubject.subscribe(function (message) {
            _this.messageSuccess = message;
            _this.apiService.getRequest("/stock/categorie");
        }, function (err) {
        });
        this.apiService.emitSuccesSubject();
        this.erreurSubscription = this.apiService.erroMessageSubject.subscribe(function (error) {
            _this.messageErreur = error;
        });
        this.apiService.emitErrorSubject();
    };
    NgbdModalContentAddCat = __decorate([
        core_1.Component({
            selector: 'ngbd-modal-content',
            template: "\n    <div class=\"modal-header\">\n      <h4 class=\"modal-title\">Hi there!</h4>\n      <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"activeModal.dismiss('Cross click')\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <form (ngSubmit)=\"onSubmit(signInForm)\" #signInForm=\"ngForm\">\n    <div class=\"modal-body\">\n    \n        <div class=\"modal-body\">\n            <div class=\"alert alert-danger\" *ngIf=\"messageErreur\">{{ messageErreur.err }}</div>\n            <div class=\"alert alert-success\" *ngIf=\"messageSuccess\">{{ messageSuccess.content }}</div>\n\n            <div class=\"form-group\">\n                <label for=\"roundText\"></label>\n                <input type=\"text\" id=\"roundText\" name=\"titre\" class=\"form-control round\"\n                    placeholder=\"Titre de la cat\u00E9gorie\" ngModel>\n            </div>\n        </div>\n        <div class=\"modal-footer\">\n            <button type=\"button\"\n                class=\"btn btn-light-secondary\"\n                data-bs-dismiss=\"modal\">\n                <i class=\"bx bx-x d-block d-sm-none\"></i>\n                <span class=\"d-none d-sm-block\">Retour</span>\n            </button>\n          \n        </div>\n\n    </div>\n    <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"activeModal.close('Close click')\">Retour</button>\n      <button type=\"submit\" class=\"btn btn-primary ml-1\"\n               >\n                <i class=\"bx bx-check d-block d-sm-none\"></i>\n                <span class=\"d-none d-sm-block\">Ajouter</span>\n            </button>\n    </div>\n    </form>\n  "
        })
    ], NgbdModalContentAddCat);
    return NgbdModalContentAddCat;
}());
exports.NgbdModalContentAddCat = NgbdModalContentAddCat;
var NgbdModalContent = /** @class */ (function () {
    function NgbdModalContent(activeModal, apiService) {
        this.activeModal = activeModal;
        this.apiService = apiService;
        this.successSubscription = new rxjs_1.Subscription;
    }
    NgbdModalContent.prototype.onSubmitEdit = function (editCatForm) {
        var _this = this;
        var categorie = new Categorie_1.Categorie(editCatForm.value.titre);
        this.apiService.putRequestService("/stock/modifier_categorie/" + editCatForm.value.id, categorie);
        this.successSubscription = this.apiService.successMessageSubject.subscribe(function (message) {
            console.log(message);
            _this.messageSuccess = message;
            _this.apiService.getRequest("/stock/categorie");
        }, function (err) {
            console.log(err);
        });
        this.apiService.emitSuccesSubject();
    };
    __decorate([
        core_1.Input()
    ], NgbdModalContent.prototype, "name");
    __decorate([
        core_1.Input()
    ], NgbdModalContent.prototype, "id");
    NgbdModalContent = __decorate([
        core_1.Component({
            selector: 'ngbd-modal-content',
            template: "\n    <div class=\"modal-header\">\n      <h4 class=\"modal-title\">Modifier une cat\u00E9gorie!</h4>\n      <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"activeModal.dismiss('Cross click')\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <form (ngSubmit)=\"onSubmitEdit(editCatForm)\" #editCatForm=\"ngForm\">\n    <div class=\"modal-body\">\n    <div class=\"alert alert-success\" *ngIf=\"messageSuccess\">{{ messageSuccess.content }}</div>\n    <input type=\"hidden\" name=\"id\"  [(ngModel)]=\"id\">\n\n            <div class=\"form-group\">\n                <label for=\"roundText\"></label>\n                <input type=\"text\" id=\"roundText\" name=\"titre\" class=\"form-control round\"\n                    placeholder=\"Titre de la cat\u00E9gorie\"  [(ngModel)]=\"name\">\n            </div>\n    </div>\n    <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"activeModal.close('Close click')\">Fermer</button>\n      <button type=\"submit\" class=\"btn btn-lg btn-info ml-1\"\n               >\n             <span class=\"d-none d-sm-block text-white\">Modifier</span>\n            </button>\n    </div>\n  </form>\n  "
        })
    ], NgbdModalContent);
    return NgbdModalContent;
}());
exports.NgbdModalContent = NgbdModalContent;
var CategorieComponent = /** @class */ (function () {
    function CategorieComponent(chRef, modalService, apiService, spinner) {
        this.chRef = chRef;
        this.modalService = modalService;
        this.apiService = apiService;
        this.spinner = spinner;
        this.dtOptions = {};
        this.dtTrigger = new rxjs_1.Subject();
        this.resultSubscription = new rxjs_1.Subscription;
        this.successSubscription = new rxjs_1.Subscription;
        this.erreurSubscription = new rxjs_1.Subscription;
    }
    CategorieComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.categories = [];
        this.apiService.getRequest("/stock/categorie");
        this.resultSubscription = this.apiService.getResultSubject.subscribe(function (result) {
            _this.categories = result;
            _this.dtTrigger.next();
        });
        this.apiService.emitGetResultSubject();
        // setTimeout(()=>{this.showContent=true}, 250);
    };
    CategorieComponent.prototype.open = function (id, titre) {
        var modalRef = this.modalService.open(NgbdModalContent);
        modalRef.componentInstance.id = id;
        modalRef.componentInstance.name = titre;
    };
    CategorieComponent.prototype.openAdd = function () {
        var modalRef = this.modalService.open(NgbdModalContentAddCat);
        modalRef.componentInstance.name = 'World';
    };
    CategorieComponent.prototype.ngOnDestroy = function () {
        this.dtTrigger.unsubscribe();
    };
    CategorieComponent = __decorate([
        core_1.Component({
            selector: 'app-categorie',
            templateUrl: './categorie.component.html',
            styleUrls: ['./categorie.component.scss']
        })
    ], CategorieComponent);
    return CategorieComponent;
}());
exports.CategorieComponent = CategorieComponent;
