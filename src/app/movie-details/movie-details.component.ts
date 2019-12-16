import { Component, OnInit, Sanitizer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { MoviesService } from '../movies.service';
import { MovieRentalsService } from '../movie-rentals.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.sass']
})
export class MovieDetailsComponent implements OnInit {
  movie
  movieTrailer: SafeResourceUrl
  movieRentDetails: Object

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private rentalService: MovieRentalsService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const movieId = params.get("movieId")
      this.movie = this.moviesService.getMovieById(movieId)
      this.movieTrailer = this.movie.trailer ? 
          this.sanitizer.bypassSecurityTrustResourceUrl(this.movie.trailer) : ""
      this.movieRentDetails = this.rentalService.getCurrentRentingDetails(movieId, "user0001")
    })
  }

  canRentMovie() : Boolean {
    return this.movie.inventory.available > 0 
            && !this.movieRentDetails
  }
}
