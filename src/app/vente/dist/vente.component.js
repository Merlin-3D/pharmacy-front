"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VenteComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var VenteComponent = /** @class */ (function () {
    function VenteComponent(apiService) {
        this.apiService = apiService;
        this.successSubscription = new rxjs_1.Subscription;
        this.dtOptions = {};
        this.dtTrigger = new rxjs_1.Subject();
    }
    VenteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.getVenteRequest("/stock/listeVente");
        this.successSubscription = this.apiService.getVenteSubject.subscribe(function (result) {
            console.log(result);
            _this.vente = result;
            _this.dtTrigger.next();
        });
        this.apiService.emitGetVenteSubject();
    };
    VenteComponent.prototype.ngOnDestroy = function () {
        this.dtTrigger.unsubscribe();
    };
    VenteComponent = __decorate([
        core_1.Component({
            selector: 'app-vente',
            templateUrl: './vente.component.html',
            styleUrls: ['./vente.component.scss']
        })
    ], VenteComponent);
    return VenteComponent;
}());
exports.VenteComponent = VenteComponent;
