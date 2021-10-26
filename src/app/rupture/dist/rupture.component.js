"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RuptureComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var RuptureComponent = /** @class */ (function () {
    function RuptureComponent(apiService) {
        this.apiService = apiService;
        this.dtOptions = {};
        this.dtTrigger = new rxjs_1.Subject();
        this.successSubscription = new rxjs_1.Subscription;
    }
    RuptureComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.getRuptureRequest("/stock/list_medicament_rupture");
        this.successSubscription = this.apiService.getRuptureSubject.subscribe(function (result) {
            _this.rupture = result;
            _this.dtTrigger.next();
        });
        this.apiService.emitGetRuptureSubject();
    };
    RuptureComponent.prototype.ngOnDestroy = function () {
        this.dtTrigger.unsubscribe();
    };
    RuptureComponent = __decorate([
        core_1.Component({
            selector: 'app-rupture',
            templateUrl: './rupture.component.html',
            styleUrls: ['./rupture.component.scss']
        })
    ], RuptureComponent);
    return RuptureComponent;
}());
exports.RuptureComponent = RuptureComponent;
