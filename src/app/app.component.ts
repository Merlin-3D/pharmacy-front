import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './service/apiService/api-service.service';
import { AuthenticationService } from './service/authentication/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'admin-panel-layout';
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  isAuthenticated = false;
  user:any
  isShown:boolean = false;
  
  constructor(private router: Router,public authenticationService: AuthenticationService,
    public apiService: ApiService){

  }
  ngOnInit(): void {
    if(localStorage.getItem('id_token')){
      this.authenticationService.isAuthenticated=true
      this.router.navigate(['/dashboard']);
      this.user = localStorage.getItem('user')
    }
    
  }

  logout(){
    this.authenticationService.logout();
  }
}
