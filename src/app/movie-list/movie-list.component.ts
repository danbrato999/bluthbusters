import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent, MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { MovieFormComponent } from '../movie-form/movie-form.component';

import { MoviesService } from '../movies.service';
import { Movie } from '../models';
import { debounceTime, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.sass']
})
export class MovieListComponent implements OnInit {
  movieSearchForm: FormControl
  movieCount : number
  page: number
  limit: number
  limitOptions: Array<number>
  movies: Array<Movie>
  loading: boolean

  constructor(
    private moviesService: MoviesService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.movieSearchForm = new FormControl()
    this.movieCount = 0
    this.limitOptions = [5, 10, 20]
    this.page = 0
    this.limit = 10
    this.movies = []
    this.loading = false
  }

  ngOnInit() {
    this.fetchMovies()
    this.movieSearchForm.valueChanges
          .pipe(
            debounceTime(500),
            tap(() => {
              this.loading = true
              this.movies = []
              this.movieCount = 0
            }),
            switchMap(movieName => this.moviesService.getAvailableMovies(1, 10, movieName))
          ).subscribe(result => {
            this.loading = false
            const { totalCount, data }  = { ... result.body }
            this.movieCount = totalCount
            this.movies = data
          }, error => this.showApiError(error))
  }

  openForm() {
    const dialogRef = this.dialog.open(MovieFormComponent, {
      width: '650px'
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.moviesService.addMovie(result).subscribe(newId => {
          this.router.navigate(['movies', newId.id])
        }, error => this.showApiError(error))
      }
    })
  }

  changePage(event: PageEvent) {
    this.limit = event.pageSize
    this.page = event.pageIndex
    this.fetchMovies()
  }

  private fetchMovies() {
    this.loading = true
    this.moviesService.getAvailableMovies(this.page + 1, this.limit)
        .subscribe(result => {
          this.loading = false
          const { totalCount, data }  = { ... result.body }
          this.movieCount = totalCount
          this.movies = data
        }, error => this.showApiError(error))
  }

  private showApiError(error: string) {
    this.snackBar.open(error, 'Dismiss', { duration: 5000 })
  }
}
