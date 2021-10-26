import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from './guards/auth.guard';
import { CaisseComponent } from './caisse/caisse.component';
import { ExpirationComponent } from './expiration/expiration.component';
import { PeromptionComponent } from './peromption/peromption.component';
import { RuptureComponent } from './rupture/rupture.component';
import { VenteComponent } from './vente/vente.component';
import { CategorieComponent } from './categorie/categorie.component';
import { MedicamentComponent } from './medicament/medicament.component';
import { ApprovisionnementComponent } from './approvisionnement/approvisionnement.component';
import { NewApprovisionnementComponent } from './new-approvisionnement/new-approvisionnement.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent , canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'caisse', component: CaisseComponent, canActivate: [AuthGuard] },
  { path: 'expiration', component: ExpirationComponent, canActivate: [AuthGuard] },
  { path: 'peromption', component: PeromptionComponent , canActivate: [AuthGuard]},
  { path: 'rupture', component: RuptureComponent, canActivate: [AuthGuard] },
  { path: 'vente', component: VenteComponent , canActivate: [AuthGuard]},
  { path: 'categorie', component: CategorieComponent , canActivate: [AuthGuard]},
  { path: 'medicament', component: MedicamentComponent },
  { path: 'approvisionnement', component: ApprovisionnementComponent , canActivate: [AuthGuard]},
  { path: 'new_approvisionnement/:id', component:NewApprovisionnementComponent, canActivate: [AuthGuard]},
  {
    path: '**',
    pathMatch: 'full',
    component:ErrorPageComponent, canActivate: [AuthGuard]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
