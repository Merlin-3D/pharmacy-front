import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, public authenticationService: AuthenticationService) {}
  user:any
  ngOnInit(): void {
    this.user = localStorage.getItem('user')
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  logout(){
    this.authenticationService.logout();
  }
}
