"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var home_component_1 = require("./home/home.component");
var login_component_1 = require("./login/login.component");
var auth_guard_1 = require("./guards/auth.guard");
var caisse_component_1 = require("./caisse/caisse.component");
var expiration_component_1 = require("./expiration/expiration.component");
var peromption_component_1 = require("./peromption/peromption.component");
var rupture_component_1 = require("./rupture/rupture.component");
var vente_component_1 = require("./vente/vente.component");
var categorie_component_1 = require("./categorie/categorie.component");
var medicament_component_1 = require("./medicament/medicament.component");
var approvisionnement_component_1 = require("./approvisionnement/approvisionnement.component");
var new_approvisionnement_component_1 = require("./new-approvisionnement/new-approvisionnement.component");
var error_page_component_1 = require("./error-page/error-page.component");
var routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'home', component: home_component_1.HomeComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'caisse', component: caisse_component_1.CaisseComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'expiration', component: expiration_component_1.ExpirationComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'peromption', component: peromption_component_1.PeromptionComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'rupture', component: rupture_component_1.RuptureComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'vente', component: vente_component_1.VenteComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'categorie', component: categorie_component_1.CategorieComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'medicament', component: medicament_component_1.MedicamentComponent },
    { path: 'approvisionnement', component: approvisionnement_component_1.ApprovisionnementComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'new_approvisionnement/:id', component: new_approvisionnement_component_1.NewApprovisionnementComponent, canActivate: [auth_guard_1.AuthGuard] },
    {
        path: '**',
        pathMatch: 'full',
        component: error_page_component_1.ErrorPageComponent, canActivate: [auth_guard_1.AuthGuard]
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
