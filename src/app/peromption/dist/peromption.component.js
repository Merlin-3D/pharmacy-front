"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PeromptionComponent = void 0;
var core_1 = require("@angular/core");
var moment = require("moment");
var rxjs_1 = require("rxjs");
var PeromptionComponent = /** @class */ (function () {
    function PeromptionComponent(apiService) {
        this.apiService = apiService;
        this.dtOptions = {};
        this.dtTrigger = new rxjs_1.Subject();
        this.successSubscription = new rxjs_1.Subscription;
    }
    PeromptionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.date = moment(new Date()).format("DD/MM/YYYY");
        this.apiService.getPeromptionRequest("/stock/list_medicament_peromtion");
        this.successSubscription = this.apiService.getPeromptionSubject.subscribe(function (result) {
            _this.peromption = result;
            _this.dtTrigger.next();
        });
        this.apiService.emitGetPeromptionSubject();
    };
    PeromptionComponent.prototype.ngOnDestroy = function () {
        this.dtTrigger.unsubscribe();
    };
    PeromptionComponent = __decorate([
        core_1.Component({
            selector: 'app-peromption',
            templateUrl: './peromption.component.html',
            styleUrls: ['./peromption.component.scss']
        })
    ], PeromptionComponent);
    return PeromptionComponent;
}());
exports.PeromptionComponent = PeromptionComponent;
