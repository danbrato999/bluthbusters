import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OmdbClientService } from '../omdb-client.service';
import { debounceTime, tap, switchMap, catchError } from 'rxjs/operators';
import { MovieData } from '../models';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-movie-data-autocomplete',
  templateUrl: './movie-data-autocomplete.component.html',
  styleUrls: ['./movie-data-autocomplete.component.sass']
})
export class MovieDataAutocompleteComponent implements OnInit {
  searchForm: FormControl
  foundMovies: Array<MovieData>
  loading: boolean

  @Output() movieSelected = new EventEmitter<MovieData>()
  @Output() reset = new EventEmitter()
  constructor(
    private omdbClient: OmdbClientService
  ) {
    this.loading = false
    this.foundMovies = []
  }

  ngOnInit() {
    this.searchForm = new FormControl('')

    this.searchForm
        .valueChanges
        .pipe(
          debounceTime(500),
          tap(() => {
            this.loading = true
            this.foundMovies = []
          }),
          switchMap(value => this.searchMovie(value))
        ).subscribe(movie => {
          this.loading = false
          if (movie)
            this.foundMovies = [ movie ]
        })
  }

  get searchValue() {
    return this.searchForm.value
  }

  clearForm() {
    this.searchForm.reset()
    this.reset.emit()
  }

  displayMovieInput(movie: MovieData) : string {
    return movie ? movie.title : ''
  }

  selectOption(movie: MovieData) {
    this.movieSelected.emit(movie)
  }

  private searchMovie(value) : Observable<MovieData | null> {
    if (typeof(value) === 'string')
      return this.omdbClient.searchMovieByTitle(value)
          .pipe(
            catchError(() => of(null))
          )

    return of(this.foundMovies[0])
  }
}
