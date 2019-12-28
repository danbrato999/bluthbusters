import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private rentalService: MovieRentalsService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const movieId = params.get("movieId")
      this.moviesService.getMovieById(movieId)
          .subscribe(response => {
            this.movie = response
          }, error => this.showApiError(error))
      
      this.rentalService.getCurrentRentingDetails(movieId)
          .subscribe(response => {
            if (response.status === 200)
              this.movieRentDetails = { ... response.body }
          }, error => this.showApiError(error))
    })
  }

  getMovieEmbed() {
    return this.movie.trailer ? this.sanitizer.bypassSecurityTrustResourceUrl(this.movie.trailer) : ""
  }

  get canRentMovie() : Boolean {
    return this.movie.inventory.available > 0 
            && !this.movieRentDetails
  }

  openRentMovieForm() {
    const dialogRef = this.dialog.open(RentalFormComponent, {
      data: this.movie.externalData,
      width: '400px'
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.rentalService.rentMovie(this.movie.id, result)
            .subscribe(() => this.router.navigate(['rental-history']), error => this.showApiError(error))
    })
  }

  private showApiError(error: string) {
    this.snackBar.open(error, 'Dismiss', { duration: 5000 })
  }
}
