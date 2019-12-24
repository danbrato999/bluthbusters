import { Component, OnInit } from '@angular/core';
import { AuthProvider, Theme } from 'ngx-auth-firebaseui';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  private providersEnabled: Array<AuthProvider> = [AuthProvider.Google]
  private providersTheme: Theme = Theme.MINI_FAB

  constructor(
    private router: Router
  ) { 
    this.providersEnabled = [AuthProvider.Google]
    this.providersTheme = Theme.MINI_FAB
  }

  ngOnInit() {
  }

  redirect() {
    this.router.navigate(['/'])
  }
}
