"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApiService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var environment_1 = require("src/environments/environment");
var ApiService = /** @class */ (function () {
    function ApiService(httpClient) {
        this.httpClient = httpClient;
        this.erroMessageSubject = new rxjs_1.Subject();
        this.successMessageSubject = new rxjs_1.Subject();
        this.getResultSubject = new rxjs_1.Subject();
        this.getMedicamentSubject = new rxjs_1.Subject();
        this.getApprovisionnementSubject = new rxjs_1.Subject();
        this.getVenteSubject = new rxjs_1.Subject();
        this.getRuptureSubject = new rxjs_1.Subject();
        this.getPeromptionSubject = new rxjs_1.Subject();
        this.getExpirationSubject = new rxjs_1.Subject();
        this.getOneApprovMedicSubject = new rxjs_1.Subject();
        this.getOneMedocSubject = new rxjs_1.Subject();
        this.getOneEntreSubject = new rxjs_1.Subject();
        this.getDashboardSubject = new rxjs_1.Subject();
        this.getCaisseSubject = new rxjs_1.Subject();
    }
    ApiService.prototype.emitErrorSubject = function () {
        this.erroMessageSubject.next(this.erreur);
    };
    ApiService.prototype.emitSuccesSubject = function () {
        this.successMessageSubject.next(this.success);
    };
    ApiService.prototype.emitGetResultSubject = function () {
        this.getResultSubject.next(this.result);
    };
    ApiService.prototype.emitGetMedicamentSubject = function () {
        this.getMedicamentSubject.next(this.medicament);
    };
    ApiService.prototype.emitGetApprovisionnementSubject = function () {
        this.getApprovisionnementSubject.next(this.approvisionnement);
    };
    ApiService.prototype.emitGetVenteSubject = function () {
        this.getVenteSubject.next(this.vente);
    };
    ApiService.prototype.emitGetRuptureSubject = function () {
        this.getRuptureSubject.next(this.rupture);
    };
    ApiService.prototype.emitGetPeromptionSubject = function () {
        this.getPeromptionSubject.next(this.peromption);
    };
    ApiService.prototype.emitGetExpirationSubject = function () {
        this.getExpirationSubject.next(this.expiration);
    };
    ApiService.prototype.emitGetOneApprovSubject = function () {
        this.getOneApprovMedicSubject.next(this.oneAppriv);
    };
    ApiService.prototype.emitGetOneMedocSubject = function () {
        this.getOneMedocSubject.next(this.oneMedoc);
    };
    ApiService.prototype.emitGetEntrerSubject = function () {
        this.getOneEntreSubject.next(this.entrer);
    };
    ApiService.prototype.emitGetDashboardSubject = function () {
        this.getDashboardSubject.next(this.dasboard);
    };
    ApiService.prototype.emitGetCaisseSubject = function () {
        this.getCaisseSubject.next(this.caisse);
    };
    ApiService.prototype.postRequestService = function (url, body) {
        var _this = this;
        this.httpClient.post(environment_1.environment.apiURL + url, body)
            .subscribe(function (res) {
            _this.success = res;
            _this.emitSuccesSubject();
        }, function (err) {
            _this.erreur = err.error;
            _this.emitErrorSubject();
        });
    };
    ApiService.prototype.putRequestService = function (url, body) {
        var _this = this;
        this.httpClient.put(environment_1.environment.apiURL + url, body)
            .subscribe(function (res) {
            _this.success = res;
            _this.emitSuccesSubject();
        }, function (err) {
            _this.erreur = err.error;
            _this.emitErrorSubject();
        });
    };
    ApiService.prototype.deleteRequesteService = function (url) {
        var _this = this;
        this.httpClient["delete"](environment_1.environment.apiURL + url)
            .subscribe(function (res) {
            _this.success = res;
            _this.emitSuccesSubject();
        }, function (err) {
            _this.erreur = err.error;
            _this.emitErrorSubject();
        });
    };
    ApiService.prototype.getRequest = function (url) {
        var _this = this;
        this.httpClient.get(environment_1.environment.apiURL + url)
            .subscribe(function (res) {
            _this.result = res;
            _this.emitGetResultSubject();
        }, function (err) {
            _this.erreur = err.error;
            console.log(err);
            _this.emitErrorSubject();
        });
    };
    ApiService.prototype.getMedicamentRequest = function (url) {
        var _this = this;
        this.httpClient.get(environment_1.environment.apiURL + url)
            .subscribe(function (res) {
            _this.medicament = res;
            _this.emitGetMedicamentSubject();
        }, function (err) {
            _this.erreur = err.error;
            console.log(err);
            _this.emitErrorSubject();
        });
    };
    ApiService.prototype.getApprovisionnemntRequest = function (url) {
        var _this = this;
        this.httpClient.get(environment_1.environment.apiURL + url)
            .subscribe(function (res) {
            _this.approvisionnement = res;
            _this.emitGetApprovisionnementSubject();
        }, function (err) {
            _this.erreur = err.error;
            _this.emitErrorSubject();
        });
    };
    ApiService.prototype.getVenteRequest = function (url) {
        var _this = this;
        this.httpClient.get(environment_1.environment.apiURL + url)
            .subscribe(function (res) {
            _this.vente = res;
            _this.emitGetVenteSubject();
        }, function (err) {
            _this.erreur = err.error;
            _this.emitErrorSubject();
        });
    };
    ApiService.prototype.getRuptureRequest = function (url) {
        var _this = this;
        this.httpClient.get(environment_1.environment.apiURL + url)
            .subscribe(function (res) {
            _this.rupture = res;
            _this.count_rup = _this.rupture.count;
            _this.emitGetRuptureSubject();
        }, function (err) {
            _this.erreur = err.error;
            _this.emitErrorSubject();
        });
    };
    ApiService.prototype.getPeromptionRequest = function (url) {
        var _this = this;
        this.httpClient.get(environment_1.environment.apiURL + url)
            .subscribe(function (res) {
            _this.peromption = res;
            _this.count_peromp = _this.peromption.count;
            _this.emitGetPeromptionSubject();
        }, function (err) {
            _this.erreur = err.error;
            _this.emitErrorSubject();
        });
    };
    ApiService.prototype.getExpirationRequest = function (url) {
        var _this = this;
        this.httpClient.get(environment_1.environment.apiURL + url)
            .subscribe(function (res) {
            _this.expiration = res;
            _this.count_exp = _this.expiration.count;
            _this.emitGetExpirationSubject();
        }, function (err) {
            _this.erreur = err.error;
            _this.emitErrorSubject();
        });
    };
    ApiService.prototype.getOneMedicamentRequest = function (url) {
        var _this = this;
        this.httpClient.get(environment_1.environment.apiURL + url)
            .subscribe(function (res) {
            _this.oneMedoc = res;
            _this.emitGetOneMedocSubject();
        }, function (err) {
            _this.erreur = err.error;
            _this.emitErrorSubject();
        });
    };
    ApiService.prototype.getOneApprovRequest = function (url) {
        var _this = this;
        this.httpClient.get(environment_1.environment.apiURL + url)
            .subscribe(function (res) {
            _this.oneAppriv = res;
            _this.emitGetOneApprovSubject();
        }, function (err) {
            _this.erreur = err.error;
            _this.emitErrorSubject();
        });
    };
    ApiService.prototype.getEntrerRequest = function (url) {
        var _this = this;
        this.httpClient.get(environment_1.environment.apiURL + url)
            .subscribe(function (res) {
            _this.entrer = res;
            _this.emitGetEntrerSubject();
        }, function (err) {
            _this.erreur = err.error;
            _this.emitErrorSubject();
        });
    };
    ApiService.prototype.getDashboardRequest = function (url) {
        var _this = this;
        this.httpClient.get(environment_1.environment.apiURL + url)
            .subscribe(function (res) {
            _this.dasboard = res;
            _this.emitGetDashboardSubject();
        }, function (err) {
            _this.erreur = err.error;
            _this.emitErrorSubject();
        });
    };
    ApiService.prototype.getCaisseRequest = function (url) {
        var _this = this;
        this.httpClient.get(environment_1.environment.apiURL + url)
            .subscribe(function (res) {
            _this.caisse = res;
            _this.emitGetCaisseSubject();
        }, function (err) {
            _this.erreur = err.error;
            _this.emitErrorSubject();
        });
    };
    ApiService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ApiService);
    return ApiService;
}());
exports.ApiService = ApiService;
