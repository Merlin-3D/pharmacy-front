"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthenticationService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var environment_prod_1 = require("../../../environments/environment.prod");
var jwt_decode_1 = require("jwt-decode");
var moment = require("moment");
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(router, httpClient) {
        this.router = router;
        this.httpClient = httpClient;
        this.erroMessageSubject = new rxjs_1.Subject();
        this.successMessageSubject = new rxjs_1.Subject();
        this.isAuthenticated = false;
    }
    AuthenticationService.prototype.emitErrorSubject = function () {
        this.erroMessageSubject.next(this.erreur);
    };
    AuthenticationService.prototype.emitSuccesSubject = function () {
        this.successMessageSubject.next(this.success);
    };
    AuthenticationService.prototype.authenticate = function (signInUser) {
        var _this = this;
        var data = {
            "nom": signInUser.getName(),
            "password": signInUser.getPassword()
        };
        this.httpClient.post(environment_prod_1.environment.apiURL + 'user/login', data)
            .subscribe(function (res) {
            _this.setSession(res);
            _this.success = localStorage.getItem('id_token');
            _this.isAuthenticated = true;
            _this.router.navigate(['/dashboard']);
            // window.location.reload();
        }, function (err) {
            _this.erreur = err.error.message;
            _this.emitErrorSubject();
        });
    };
    AuthenticationService.prototype.setSession = function (authResult) {
        var expiresAt = moment().add(authResult.expiresIn, 'second');
        // this.getTokenExpirationDate(authResult.token);
        localStorage.setItem('id_token', authResult.token);
        localStorage.setItem('user_id', authResult.user._id);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
        localStorage.setItem('user', authResult.user.nom);
        this.user = authResult.user.nom;
    };
    AuthenticationService.prototype.logout = function () {
        this.isAuthenticated = false;
        localStorage.removeItem("id_token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("expires_at");
        this.router.navigate(['']);
    };
    /** CHECK VERIFY TOKEN */
    AuthenticationService.prototype.getToken = function () {
        return localStorage.getItem('id_token');
    };
    AuthenticationService.prototype.getTokenExpirationDate = function (token) {
        this.date_exp = jwt_decode_1["default"](token);
        if (this.date_exp.exp === undefined)
            return null;
        var date = new Date(0);
        date.setUTCSeconds(this.date_exp.exp);
        return date;
    };
    AuthenticationService.prototype.isTokenExpired = function (token) {
        if (!token)
            token = this.getToken();
        if (!token)
            return true;
        var date = this.getTokenExpirationDate(token);
        if (date === undefined)
            return false;
        return !(date.valueOf() > new Date().valueOf());
    };
    AuthenticationService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
