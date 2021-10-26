"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApprovisionnementComponent = exports.NgbdModalConfirm = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var NgbdModalConfirm = /** @class */ (function () {
    function NgbdModalConfirm(modal, apiService) {
        this.modal = modal;
        this.apiService = apiService;
        this.resultSubscription = new rxjs_1.Subscription;
    }
    NgbdModalConfirm.prototype.onDelete = function (id) {
        var _this = this;
        this.apiService.deleteRequesteService("/stock/supprimer_approvisionnement/" + id);
        this.resultSubscription = this.apiService.successMessageSubject.subscribe(function (result) {
            _this.apiService.getApprovisionnemntRequest("/stock/list_pprovisionner");
            _this.modal.close('Ok click');
        });
        this.apiService.emitSuccesSubject();
    };
    __decorate([
        core_1.Input()
    ], NgbdModalConfirm.prototype, "id");
    NgbdModalConfirm = __decorate([
        core_1.Component({
            selector: 'ngbd-modal-confirm',
            template: "\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title\" id=\"modal-title\">Suppression...</h4>\n    <button type=\"button\" class=\"close\" aria-describedby=\"modal-title\" (click)=\"modal.dismiss('Cross click')\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div class=\"modal-body\">\n    <p><strong>Etes-vous s\u00FBr que vous voulez supprimer ?</strong></p>\n    <p>\n    Toutes les informations associ\u00E9es \u00E0 cet approvisionnement seront d\u00E9finitivement supprim\u00E9es.\n    <span class=\"text-danger\">Cette op\u00E9ration ne peut pas \u00EAtre annul\u00E9e.</span>\n    </p>\n  </div>\n  <div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-outline-secondary\" (click)=\"modal.dismiss('cancel click')\">Retour</button>\n    <button type=\"button\" class=\"btn btn-danger\" (click)=\"onDelete(id)\">Ok</button>\n  </div>\n  "
        })
    ], NgbdModalConfirm);
    return NgbdModalConfirm;
}());
exports.NgbdModalConfirm = NgbdModalConfirm;
var ApprovisionnementComponent = /** @class */ (function () {
    function ApprovisionnementComponent(_modalService, apiService) {
        this._modalService = _modalService;
        this.apiService = apiService;
        this.dtOptions = {};
        this.dtTrigger = new rxjs_1.Subject();
        this.successSubscription = new rxjs_1.Subscription;
        this.withAutofocus = "<button type=\"button\" ngbAutofocus class=\"btn btn-danger\"\n      (click)=\"modal.close('Ok click')\">Ok</button>";
    }
    ApprovisionnementComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.getApprovisionnemntRequest("/stock/list_pprovisionner");
        this.successSubscription = this.apiService.getApprovisionnementSubject.subscribe(function (result) {
            console.log(result);
            _this.approvisionnemnt = result;
            _this.dtTrigger.next();
        });
        this.apiService.emitGetApprovisionnementSubject();
    };
    ApprovisionnementComponent.prototype.open = function (name, id) {
        var modalRef = this._modalService.open(NgbdModalConfirm);
        modalRef.componentInstance.id = id;
    };
    ApprovisionnementComponent.prototype.ngOnDestroy = function () {
        this.dtTrigger.unsubscribe();
    };
    ApprovisionnementComponent = __decorate([
        core_1.Component({
            selector: 'app-approvisionnement',
            templateUrl: './approvisionnement.component.html',
            styleUrls: ['./approvisionnement.component.scss']
        })
    ], ApprovisionnementComponent);
    return ApprovisionnementComponent;
}());
exports.ApprovisionnementComponent = ApprovisionnementComponent;
