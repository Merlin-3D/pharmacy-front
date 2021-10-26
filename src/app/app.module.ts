import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './AuthInterceptorService';
import { FormsModule } from '@angular/forms';
import { CaisseComponent } from './caisse/caisse.component';
import { ExpirationComponent } from './expiration/expiration.component';
import { PeromptionComponent } from './peromption/peromption.component';
import { RuptureComponent } from './rupture/rupture.component';
import { VenteComponent } from './vente/vente.component';
import { CategorieComponent, NgbdModalContent, NgbdModalContentAddCat } from './categorie/categorie.component';
import { MedicamentComponent, NgbdModalConfirm, NgbdModalContentEditMedicament, NgbdModalContentMedicament } from './medicament/medicament.component';
import { ApprovisionnementComponent } from './approvisionnement/approvisionnement.component';
import { NewApprovisionnementComponent, NgbdModalEntrerContent, NgbdModalVenteContent } from './new-approvisionnement/new-approvisionnement.component';
import { DataTablesModule } from 'angular-datatables';
import { ErrorPageComponent } from './error-page/error-page.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DashboardComponent,
    SidenavComponent,
    LoginComponent,
    CaisseComponent,
    ExpirationComponent,
    PeromptionComponent,
    RuptureComponent,
    VenteComponent,
    CategorieComponent,
    NgbdModalContent,
    MedicamentComponent,
    NgbdModalContentEditMedicament,
    NgbdModalConfirm,
    NgbdModalContentMedicament,
    ApprovisionnementComponent,
    NewApprovisionnementComponent,
    NgbdModalEntrerContent,
    NgbdModalVenteContent,
    ErrorPageComponent,
    NgbdModalContentAddCat

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // * MATERIAL IMPORTS
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
    NgxSpinnerModule

  ],
  providers: [
     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule {}
