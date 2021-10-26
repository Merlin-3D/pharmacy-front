import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  erroMessageSubject = new Subject<any[]>();
  successMessageSubject = new Subject<any[]>();
  getResultSubject = new Subject<any[]>()
  getMedicamentSubject = new Subject<any[]>();
  getApprovisionnementSubject = new Subject<any[]>();
  getVenteSubject = new Subject<any[]>();
  getRuptureSubject = new Subject<any[]>();
  getPeromptionSubject = new Subject<any[]>();
  getExpirationSubject = new Subject<any[]>();
  getOneApprovMedicSubject = new Subject<any[]>();
  getOneMedocSubject = new Subject<any[]>();
  getOneEntreSubject = new Subject<any[]>();
  getDashboardSubject = new Subject<any[]>();
  getCaisseSubject = new Subject<any[]>();

  private dasboard: any;
  private erreur: any;
  private success: any;
  private result: any;
  private medicament: any;
  private approvisionnement: any;
  private vente: any;
  private rupture: any;
  private peromption: any;
  private expiration: any;
  private oneAppriv: any;
  private oneMedoc:any;
  private entrer: any;
  private caisse: any;

  count_rup:any
  count_peromp: any
  count_exp:any

  emitErrorSubject() {
    this.erroMessageSubject.next(this.erreur);
  }
  emitSuccesSubject() {
    this.successMessageSubject.next(this.success);
  }
  emitGetResultSubject() {
    this.getResultSubject.next(this.result);
  }
  emitGetMedicamentSubject() {
    this.getMedicamentSubject.next(this.medicament);
  }
  emitGetApprovisionnementSubject() {
    this.getApprovisionnementSubject.next(this.approvisionnement);
  }
  emitGetVenteSubject() {
    this.getVenteSubject.next(this.vente);
  }
  emitGetRuptureSubject() {
    this.getRuptureSubject.next(this.rupture);
  } 
  emitGetPeromptionSubject() {
    this.getPeromptionSubject.next(this.peromption);
  } 
  emitGetExpirationSubject() {
    this.getExpirationSubject.next(this.expiration);
  }
  emitGetOneApprovSubject() {
    this.getOneApprovMedicSubject.next(this.oneAppriv);
  }
  emitGetOneMedocSubject() {
    this.getOneMedocSubject.next(this.oneMedoc);
  }
  emitGetEntrerSubject() {
    this.getOneEntreSubject.next(this.entrer);
  }
  emitGetDashboardSubject() {
    this.getDashboardSubject.next(this.dasboard);
  }
  emitGetCaisseSubject() {
    this.getCaisseSubject.next(this.caisse);
  }

  constructor(private httpClient: HttpClient) { }


  postRequestService(url: string, body: object){
    this.httpClient.post(environment.apiURL + url, body)
    .subscribe(
      (res) => {
        this.success = res
        this.emitSuccesSubject()
      }, err => {
        this.erreur = err.error
        this.emitErrorSubject()
      }
    )
  }

  putRequestService(url:string, body:object){
    this.httpClient.put(environment.apiURL + url, body) 
    .subscribe(
      (res) => {
        this.success = res
        this.emitSuccesSubject()
      }, err => {
        this.erreur = err.error
        this.emitErrorSubject()
      }
    )
  }

  deleteRequesteService(url:string){
    this.httpClient.delete(environment.apiURL + url) 
    .subscribe(
      (res) => {
        this.success = res
        this.emitSuccesSubject()
      }, err => {
        this.erreur = err.error
        this.emitErrorSubject()
      }
    )
  }

  getRequest(url: string) {
    this.httpClient.get(environment.apiURL + url)
      .subscribe(
        (res) => {
          this.result = res
          this.emitGetResultSubject()
        }, err => {
          this.erreur = err.error
          console.log(err)
          this.emitErrorSubject()
        }
      )
  }

  getMedicamentRequest(url: string) {
    this.httpClient.get(environment.apiURL + url)
      .subscribe(
        (res) => {
          this.medicament = res
          this.emitGetMedicamentSubject()
        }, err => {
          this.erreur = err.error
          console.log(err)
          this.emitErrorSubject()
        }
      )
  }
  getApprovisionnemntRequest(url: string) {
    this.httpClient.get(environment.apiURL + url)
      .subscribe(
        (res) => {
          this.approvisionnement = res
          this.emitGetApprovisionnementSubject()
        }, err => {
          this.erreur = err.error
          this.emitErrorSubject()
        }
      )
  }
  getVenteRequest(url: string) {
    this.httpClient.get(environment.apiURL + url)
      .subscribe(
        (res) => {
          this.vente = res
          this.emitGetVenteSubject()
        }, err => {
          this.erreur = err.error
          this.emitErrorSubject()
        }
      )
  }
  getRuptureRequest(url: string) {
    this.httpClient.get(environment.apiURL + url)
      .subscribe(
        (res) => {
          this.rupture = res
          this.count_rup = this.rupture.count
          this.emitGetRuptureSubject()
        }, err => {
          this.erreur = err.error
          this.emitErrorSubject()
        }
      )
  }
  getPeromptionRequest(url: string) {
    this.httpClient.get(environment.apiURL + url)
      .subscribe(
        (res) => {
          this.peromption = res
          this.count_peromp = this.peromption.count
          
          this.emitGetPeromptionSubject()
        }, err => {
          this.erreur = err.error
          this.emitErrorSubject()
        }
      )
  }
  getExpirationRequest(url: string) {
    this.httpClient.get(environment.apiURL + url)
      .subscribe(
        (res) => {
          this.expiration = res
          this.count_exp = this.expiration.count

          this.emitGetExpirationSubject()
        }, err => {
          this.erreur = err.error
          this.emitErrorSubject()
        }
      )
  }

  getOneMedicamentRequest(url: string) {
    this.httpClient.get(environment.apiURL + url)
      .subscribe(
        (res) => {
          this.oneMedoc = res
          this.emitGetOneMedocSubject()
        }, err => {
          this.erreur = err.error
          this.emitErrorSubject()
        }
      )
  }
  getOneApprovRequest(url: string) {
    this.httpClient.get(environment.apiURL + url)
      .subscribe(
        (res) => {
          this.oneAppriv = res
          this.emitGetOneApprovSubject()
        }, err => {
          this.erreur = err.error
          this.emitErrorSubject()
        }
      )
  }

  getEntrerRequest(url: string) {
    this.httpClient.get(environment.apiURL + url)
      .subscribe(
        (res) => {
          this.entrer = res
          this.emitGetEntrerSubject()
        }, err => {
          this.erreur = err.error
          this.emitErrorSubject()
        }
      )
  }


  getDashboardRequest(url: string) {
    this.httpClient.get(environment.apiURL + url)
      .subscribe(
        (res) => {
          this.dasboard = res
          this.emitGetDashboardSubject()
        }, err => {
          this.erreur = err.error
          this.emitErrorSubject()
        }
      )
  }

  getCaisseRequest(url: string) {
    this.httpClient.get(environment.apiURL + url)
      .subscribe(
        (res) => {
          this.caisse = res
          this.emitGetCaisseSubject()
        }, err => {
          this.erreur = err.error
          this.emitErrorSubject()
        }
      )
  }
}
