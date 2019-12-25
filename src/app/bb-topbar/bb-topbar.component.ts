import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MovieRentalsService } from '../movie-rentals.service';

@Component({
  selector: 'app-bb-topbar',
  templateUrl: './bb-topbar.component.html',
  styleUrls: ['./bb-topbar.component.sass']
})
export class BbTopbarComponent implements OnInit {
  private pendingRentalsCount: number | null

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private rentalsService: MovieRentalsService
  ) { 
    this.pendingRentalsCount = null
  }

  ngOnInit() {
    this.fetchPendingMoviesCount()
    this.rentalsService.movieReturned.subscribe(() => this.fetchPendingMoviesCount())
  }

  logoutUser() {
    this.afAuth.auth.signOut().then(() => this.router.navigate(['/login']))
  }

  private fetchPendingMoviesCount() {
    this.rentalsService.getPendingMoviesCount()
        .subscribe(response => {
          if (response > 0) 
            this.pendingRentalsCount = response
          else
            this.pendingRentalsCount = null
        })
  }
}
