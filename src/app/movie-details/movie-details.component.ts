import { Component, OnInit, Sanitizer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { MoviesService } from '../movies.service';
import { MovieRentalsService } from '../movie-rentals.service';
import { Movie, MovieRenting, MovieRentForm } from '../models';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.sass']
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie
  movieTrailer: SafeResourceUrl
  movieRentDetails: MovieRenting
  error: string

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private rentalService: MovieRentalsService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const movieId = params.get("movieId")
      this.moviesService.getMovieById(movieId)
          .subscribe(response => {
            this.movie = { ... response.body }
            this.movieTrailer = this.movie.trailer ? this.sanitizer.bypassSecurityTrustResourceUrl(this.movie.trailer) : ""
          }, error => this.error = error)
      this.rentalService.getCurrentRentingDetails(movieId)
          .subscribe(response => {
            if (response.status === 200)
              this.movieRentDetails = { ... response.body }
          })
    })
  }

  canRentMovie() : Boolean {
    return this.movie.inventory.available > 0 
            && !this.movieRentDetails
  }

  rentMovie(rentForm: MovieRentForm) {
    this.rentalService.rentMovie(this.movie.id, rentForm)
            .subscribe(response => {
              this.movieRentDetails = response
            }, error => console.log(error))
  }
}
