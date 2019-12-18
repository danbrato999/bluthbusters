import { Component, OnInit } from '@angular/core';

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
    private rentalService: MovieRentalsService
  ) { }

  ngOnInit() {
    this.rentalService.getUserHistory().subscribe(response => {
      this.rentals = response.body
    })
  }
}
