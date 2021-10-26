"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var header_component_1 = require("./header/header.component");
var home_component_1 = require("./home/home.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var animations_1 = require("@angular/platform-browser/animations");
var sidenav_component_1 = require("./sidenav/sidenav.component");
var sidenav_1 = require("@angular/material/sidenav");
var toolbar_1 = require("@angular/material/toolbar");
var menu_1 = require("@angular/material/menu");
var icon_1 = require("@angular/material/icon");
var divider_1 = require("@angular/material/divider");
var list_1 = require("@angular/material/list");
var login_component_1 = require("./login/login.component");
var http_1 = require("@angular/common/http");
var AuthInterceptorService_1 = require("./AuthInterceptorService");
var forms_1 = require("@angular/forms");
var caisse_component_1 = require("./caisse/caisse.component");
var expiration_component_1 = require("./expiration/expiration.component");
var peromption_component_1 = require("./peromption/peromption.component");
var rupture_component_1 = require("./rupture/rupture.component");
var vente_component_1 = require("./vente/vente.component");
var categorie_component_1 = require("./categorie/categorie.component");
var medicament_component_1 = require("./medicament/medicament.component");
var approvisionnement_component_1 = require("./approvisionnement/approvisionnement.component");
var new_approvisionnement_component_1 = require("./new-approvisionnement/new-approvisionnement.component");
var angular_datatables_1 = require("angular-datatables");
var error_page_component_1 = require("./error-page/error-page.component");
var ngx_spinner_1 = require("ngx-spinner");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                header_component_1.HeaderComponent,
                home_component_1.HomeComponent,
                dashboard_component_1.DashboardComponent,
                sidenav_component_1.SidenavComponent,
                login_component_1.LoginComponent,
                caisse_component_1.CaisseComponent,
                expiration_component_1.ExpirationComponent,
                peromption_component_1.PeromptionComponent,
                rupture_component_1.RuptureComponent,
                vente_component_1.VenteComponent,
                categorie_component_1.CategorieComponent,
                categorie_component_1.NgbdModalContent,
                medicament_component_1.MedicamentComponent,
                medicament_component_1.NgbdModalContentEditMedicament,
                medicament_component_1.NgbdModalConfirm,
                medicament_component_1.NgbdModalContentMedicament,
                approvisionnement_component_1.ApprovisionnementComponent,
                new_approvisionnement_component_1.NewApprovisionnementComponent,
                new_approvisionnement_component_1.NgbdModalEntrerContent,
                new_approvisionnement_component_1.NgbdModalVenteContent,
                error_page_component_1.ErrorPageComponent,
                categorie_component_1.NgbdModalContentAddCat
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                animations_1.BrowserAnimationsModule,
                // * MATERIAL IMPORTS
                sidenav_1.MatSidenavModule,
                toolbar_1.MatToolbarModule,
                menu_1.MatMenuModule,
                icon_1.MatIconModule,
                divider_1.MatDividerModule,
                list_1.MatListModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                angular_datatables_1.DataTablesModule,
                ngx_spinner_1.NgxSpinnerModule
            ],
            providers: [
                { provide: http_1.HTTP_INTERCEPTORS, useClass: AuthInterceptorService_1.AuthInterceptorService, multi: true },
            ],
            bootstrap: [app_component_1.AppComponent],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
