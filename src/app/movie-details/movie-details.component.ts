import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { MovieFormComponent } from '../movie-form/movie-form.component';

import { MoviesService } from '../movies.service';
import { MovieRentalsService } from '../movie-rentals.service';
import { Movie, MovieRenting } from '../models';
import { RentalFormComponent } from '../rental-form/rental-form.component';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.sass']
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie
  movieRentDetails: MovieRenting
  error: string

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private rentalService: MovieRentalsService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const movieId = params.get("movieId")
      this.moviesService.getMovieById(movieId)
          .subscribe(response => {
            this.movie = { ... response.body }
          }, error => this.error = error)
      this.rentalService.getCurrentRentingDetails(movieId)
          .subscribe(response => {
            if (response.status === 200)
              this.movieRentDetails = { ... response.body }
          })
    })
  }

  getMovieEmbed() {
    return this.movie.trailer ? this.sanitizer.bypassSecurityTrustResourceUrl(this.movie.trailer) : ""
  }

  canRentMovie() : Boolean {
    return this.movie.inventory.available > 0 
            && !this.movieRentDetails
  }

  openMovieDialog() {
    const dialogRef = this.dialog.open(MovieFormComponent, {
      width: '650px', data: this.movie
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.moviesService.updateMovie(this.movie.id, result).subscribe(response => {
          this.movie = response
        }, error => this.error = error)
    })
  }

  openRentMovieForm() {
    const dialogRef = this.dialog.open(RentalFormComponent, {
      data: this.movie.externalData,
      width: '400px'
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.rentalService.rentMovie(this.movie.id, result)
            .subscribe(() => this.router.navigate(['rental-history']), error => console.log(error))
    })
  }
}
