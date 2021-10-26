"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var data_1 = require("./data");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(apiService) {
        this.apiService = apiService;
        this.id = localStorage.getItem('id_token');
        this.view = [1500, 400];
        this.showXAxis = true;
        this.showYAxis = true;
        this.gradient = false;
        this.showLegend = true;
        this.showXAxisLabel = true;
        this.xAxisLabel = 'Mois année';
        this.showYAxisLabel = true;
        this.yAxisLabel = 'Quantité vendus';
        this.colorScheme = {
            domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
        };
        this.resultSubscription = new rxjs_1.Subscription;
        Object.assign(this, { single: data_1.single });
    }
    DashboardComponent.prototype.onSelect = function (event) {
        console.log(event);
    };
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.getDashboardRequest("/stock/dashboard");
        this.resultSubscription = this.apiService.getDashboardSubject.subscribe(function (result) {
            console.log(result);
            _this.result = result;
        });
        this.apiService.emitGetDashboardSubject();
        this.apiService.getRuptureRequest('/stock/list_medicament_rupture');
        this.apiService.getPeromptionRequest('/stock/list_medicament_peromtion');
        this.apiService.getExpirationRequest('/stock/list_medicament_expirer');
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.scss']
        })
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
