import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { User } from '../models/User';
import { AuthenticationService } from '../service/authentication/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 
  constructor(private authenticationService: AuthenticationService, private spinner: NgxSpinnerService) { 
    
  }
 erreurSubscription: Subscription = new Subscription;


  messageErreur: any
  isAuthenticated = false;
  loader:boolean = false;

  ngOnInit(): void {

    if(localStorage.getItem('id_token')){
      this.isAuthenticated=true
    }
  }
  onSubmit(signInForm: NgForm){
    // console.log(signInForm.value); 
    this.spinner.show();
 
     const signInUser = new User(signInForm.value.name, signInForm.value.password);
     this.authenticationService.authenticate(signInUser);
 
     this.erreurSubscription = this.authenticationService.erroMessageSubject.subscribe(
       (error: any[])=>{
         setTimeout(() => {
          this.messageErreur = error;
          this.spinner.hide();
        }, 5000);
       }
       
     ) 

     this.authenticationService.emitErrorSubject()

   }


}
