import { Component } from '@angular/core';
import { StorageService } from './auth/services/storage/storage.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  isUserLoggedIn:boolean = StorageService.isUserLoggedIn();
  isAdminLoggedIn:boolean = StorageService.isAdminLoggedIn();

  constructor(private router:Router){}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.checkLoginStatus();
      }
    });
  }

  checkLoginStatus() {
    this.isUserLoggedIn = StorageService.isUserLoggedIn();
    this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
    if (!this.isUserLoggedIn && !this.isAdminLoggedIn) {
      this.router.navigateByUrl('/login');
    }
  }

  logout(){
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }
}
