import { Component, OnInit } from '@angular/core';

import { MovieRentalsService } from '../movie-rentals.service';

@Component({
  selector: 'app-rental-history',
  templateUrl: './rental-history.component.html',
  styleUrls: ['./rental-history.component.sass']
})
export class RentalHistoryComponent implements OnInit {

  rentals: Array<Object>

  constructor(
    private rentalService: MovieRentalsService
  ) { }

  ngOnInit() {
    this.rentals = this.rentalService.getUserHistory("user0001")
    console.log(this.rentals)
  }
}
