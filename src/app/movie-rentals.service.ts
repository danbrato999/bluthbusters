import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';

import { MovieRenting, DetailedMovieRenting, MovieRentForm } from './models';
import { Observable, throwError, of } from 'rxjs';
import { catchError, flatMap, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieRentalsService {

  @Output() movieReturned: EventEmitter<string> = new EventEmitter()
  constructor(
    private httpClient: HttpClient,
    private afAuth: AngularFireAuth
  ) {}

  getUserHistory() : Observable<HttpResponse<Array<DetailedMovieRenting>>> {
    return this.afAuth.idToken.pipe(
      flatMap(token =>
        this.httpClient.get<Array<DetailedMovieRenting>>('/api/customers/history',
          {
            headers: new HttpHeaders({'Authorization': `Bearer ${token}`}),
            observe: 'response'
          }
        )
      ),
      catchError(this.handleUnexpected)
    )
  }

  getCurrentRentingDetails(movieId: String) : Observable<HttpResponse<MovieRenting>> {
    return this.afAuth.idToken.pipe(
      flatMap(token =>
        this.httpClient.get<MovieRenting>(`/api/movie-rentals/${movieId}/rented`,
          {
            headers: new HttpHeaders({'Authorization': `Bearer ${token}`}),
            observe: 'response'
          }
        )
      ),
      catchError(this.handleUnexpected)
    )
  }

  getPendingMoviesCount() : Observable<number> {
    return this.afAuth.idToken.pipe(
      flatMap(token => this.httpClient.get('/api/customers/rentals/notifications',
          { headers: new HttpHeaders({'Authorization': `Bearer ${token}`, 'X-Host-Timezone': this.timezone}) })
      ),
        map<any, number>( response => response.pending || 0),
        catchError(error => {
          console.error('An error occurred:', error);
          return of(0)
        })
      )
  }

  rentMovie(movieId: string, rentForm: MovieRentForm) : Observable<MovieRenting> {
    const formatedForm = { rentUntil: rentForm.rentUntil.toISOString().slice(0, 10) }

    return this.afAuth.idToken.pipe(
      flatMap(token =>
        this.httpClient.post<MovieRenting>(`/api/movie-rentals/${movieId}`, formatedForm,
          { headers: new HttpHeaders({'Authorization': `Bearer ${token}`, 'X-Host-Timezone': this.timezone}) }
        ).pipe(
          catchError(this.handleRentFailure)
        )
      )
    )
  }

  returnMovie(movieId: string) : Observable<Date> {
    return this.afAuth.idToken.pipe(
      flatMap(token =>
        this.httpClient.delete(`/api/movie-rentals/${movieId}`,
          {
            headers: new HttpHeaders({'Authorization': `Bearer ${token}`, 'X-Host-Timezone': this.timezone}),
            observe: 'response'
          }
        )
      ),
      tap(() => this.movieReturned.emit(movieId)),
      map<any, Date>(() => new Date()),
      catchError(this.handleUnexpected)
    )
  }

  get timezone() : string {
    if (typeof Intl === 'object' && typeof Intl.DateTimeFormat === 'function')
      return Intl.DateTimeFormat().resolvedOptions().timeZone
    return 'UTC'
  }

  private handleUnexpected(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent)
      console.error('An error occurred:', error.error.message);
    else
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);

    return throwError('Unexpected error in the app. Please try again later')
  }

  private handleRentFailure(error: HttpErrorResponse) : Observable<never> {
    if (error.status === 400)
      return throwError("You can't rent this movie. Make sure it has enough copies to rent and you don't have a copy now")
    
    if (error.error instanceof ErrorEvent)
      console.error('An error occurred:', error.error.message);
    else
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);

    return throwError('Unexpected error in the app. Please try again later')
  }
}
