"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CaisseComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var CaisseComponent = /** @class */ (function () {
    function CaisseComponent(apiService) {
        this.apiService = apiService;
        this.caisseSubscription = new rxjs_1.Subscription;
        this.caisse = null;
        this.dtOptions = {};
        this.dtTrigger = new rxjs_1.Subject();
    }
    CaisseComponent.prototype.ngOnInit = function () {
    };
    CaisseComponent.prototype.findSubmit = function (findInForm) {
        var _this = this;
        var date1 = findInForm.value.startDate;
        var date2 = findInForm.value.endDate;
        this.apiService.getCaisseRequest("/stock/caisseVente/" + date1 + "/" + date2);
        this.caisseSubscription = this.apiService.getCaisseSubject.subscribe(function (result) {
            _this.caisse = result;
            _this.dtTrigger.next();
        }, function (err) {
        });
        this.apiService.emitGetCaisseSubject();
    };
    CaisseComponent.prototype.ngOnDestroy = function () {
        this.dtTrigger.unsubscribe();
    };
    CaisseComponent = __decorate([
        core_1.Component({
            selector: 'app-caisse',
            templateUrl: './caisse.component.html',
            styleUrls: ['./caisse.component.scss']
        })
    ], CaisseComponent);
    return CaisseComponent;
}());
exports.CaisseComponent = CaisseComponent;
