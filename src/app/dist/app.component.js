"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var AppComponent = /** @class */ (function () {
    function AppComponent(router, authenticationService, apiService) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.apiService = apiService;
        this.title = 'admin-panel-layout';
        this.sideBarOpen = true;
        this.isAuthenticated = false;
        this.isShown = false;
    }
    AppComponent.prototype.sideBarToggler = function () {
        this.sideBarOpen = !this.sideBarOpen;
    };
    AppComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('id_token')) {
            this.authenticationService.isAuthenticated = true;
            this.router.navigate(['/dashboard']);
            this.user = localStorage.getItem('user');
        }
    };
    AppComponent.prototype.logout = function () {
        this.authenticationService.logout();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
