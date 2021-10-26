"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var User_1 = require("../models/User");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(authenticationService, spinner) {
        this.authenticationService = authenticationService;
        this.spinner = spinner;
        this.erreurSubscription = new rxjs_1.Subscription;
        this.isAuthenticated = false;
        this.loader = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('id_token')) {
            this.isAuthenticated = true;
        }
    };
    LoginComponent.prototype.onSubmit = function (signInForm) {
        var _this = this;
        // console.log(signInForm.value); 
        this.spinner.show();
        var signInUser = new User_1.User(signInForm.value.name, signInForm.value.password);
        this.authenticationService.authenticate(signInUser);
        this.erreurSubscription = this.authenticationService.erroMessageSubject.subscribe(function (error) {
            setTimeout(function () {
                _this.messageErreur = error;
                _this.spinner.hide();
            }, 5000);
        });
        this.authenticationService.emitErrorSubject();
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
