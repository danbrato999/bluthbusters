import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-bb-topbar',
  templateUrl: './bb-topbar.component.html',
  styleUrls: ['./bb-topbar.component.sass']
})
export class BbTopbarComponent implements OnInit {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logoutUser() {
    this.afAuth.auth.signOut().then(() => this.router.navigate(['/login']))
  }
}
