import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../../models/User';
import { environment } from '../../../environments/environment.prod';
import jwt_decode from "jwt-decode";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  erroMessageSubject = new Subject<any[]>();
  successMessageSubject = new Subject<any[]>();

  isAuthenticated = false;
  user: any;
  
  private erreur: any;
  private success: any;
  date_exp:any

  emitErrorSubject() {
    this.erroMessageSubject.next(this.erreur);
  }

  emitSuccesSubject() {
    this.successMessageSubject.next(this.success);
  }

  constructor(private router: Router, private httpClient: HttpClient) { }

  authenticate(signInUser: User) {
    const data = {
      "nom": signInUser.getName(),
      "password": signInUser.getPassword()
    }
    this.httpClient.post(environment.apiURL + 'user/login', data)
      .subscribe(
        (res) => {
          this.setSession(res)
          this.success = localStorage.getItem('id_token')
          this.isAuthenticated = true;
          this.router.navigate(['/dashboard']);
          window.location.reload();
        }, err => {
          this.erreur = err.error.message
          this.emitErrorSubject()
        }
      )

  }

  private setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');
    // this.getTokenExpirationDate(authResult.token);
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem('user_id', authResult.user._id);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('user', authResult.user.nom);
    this.user =authResult.user.nom
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem("id_token")
    localStorage.removeItem("user_id")
    localStorage.removeItem("expires_at")
    this.router.navigate([''])
  }

  /** CHECK VERIFY TOKEN */
  getToken(): string {
    return localStorage.getItem('id_token')as any;
  }
  getTokenExpirationDate(token: string): Date {
    this.date_exp = jwt_decode(token);

    if (this.date_exp.exp === undefined) return null  as any;

    const date = new Date(0); 
    date.setUTCSeconds(this.date_exp.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if(!token) token = this.getToken();
    if(!token) return true;

    const date = this.getTokenExpirationDate(token);
    
    if(date === undefined) return false;

    return !(date.valueOf() > new Date().valueOf());
  }
}
