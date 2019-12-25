import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { MovieRentalsService } from '../movie-rentals.service';
import { DetailedMovieRenting } from '../models';

@Component({
  selector: 'app-rental-history',
  templateUrl: './rental-history.component.html',
  styleUrls: ['./rental-history.component.sass']
})
export class RentalHistoryComponent implements OnInit {
  rentals: Array<DetailedMovieRenting>

  constructor(
    private rentalService: MovieRentalsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.rentalService.getUserHistory().subscribe(response => {
      this.rentals = response.body
    })
  }

  returnMovie(renting: DetailedMovieRenting) {
    this.rentalService.returnMovie(renting.movieId).subscribe(response => {
      const rentingIndex = this.rentals.findIndex( r => r.id == renting.id)
      this.rentals[rentingIndex].returnedAt = response
    }, error => this.snackBar.open(error, 'Dismiss', { duration: 3000 }))
  }
}
