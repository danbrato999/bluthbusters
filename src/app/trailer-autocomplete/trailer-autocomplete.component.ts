import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TrailerData } from '../models';
import { FormControl } from '@angular/forms';
import { YoutubeClientService } from '../youtube-client.service';
import { debounceTime, tap, switchMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-trailer-autocomplete',
  templateUrl: './trailer-autocomplete.component.html',
  styleUrls: ['./trailer-autocomplete.component.sass']
})
export class TrailerAutocompleteComponent implements OnInit {
  searchForm: FormControl
  foundTrailers: Array<TrailerData>
  loading: boolean

  @Output() trailerSelected = new EventEmitter<TrailerData>()
  @Output() reset = new EventEmitter()
  constructor(
    private youtubeClient: YoutubeClientService
  ) {
    this.loading = false
    this.foundTrailers = []
  }

  ngOnInit() {
    this.searchForm = new FormControl('')

    this.searchForm
        .valueChanges
        .pipe(
          debounceTime(500),
          tap(() => {
            this.loading = true
            this.foundTrailers = []
          }),
          switchMap(value => this.searchTrailer(value))
        ).subscribe(trailers => {
          this.loading = false
          if (trailers)
            this.foundTrailers = trailers
        })
  }

  get searchValue() {
    return this.searchForm.value
  }

  clearForm() {
    this.searchForm.reset()
    this.reset.emit()
  }

  displayTrailerInput(trailer: TrailerData) : string {
    return trailer ? trailer.title : ''
  }

  selectOption(trailer: TrailerData) {
    this.trailerSelected.emit(trailer)
  }

  private searchTrailer(value) : Observable<Array<TrailerData> | null> {
    if (typeof(value) === 'string')
      return this.youtubeClient.searchTrailerByTitle(value)
          .pipe(
            catchError(() => of([]))
          )

    return of(this.foundTrailers)
  }
}
