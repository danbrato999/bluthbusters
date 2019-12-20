import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { MovieRenting, DetailedMovieRenting, MovieRentForm } from './models';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieRentalsService {
  private apiUrl: string

  constructor(
    private httpClient: HttpClient
  ) {
    this.apiUrl = "http://localhost:9900"
  }

  getUserHistory() : Observable<HttpResponse<Array<DetailedMovieRenting>>> {
    return this.httpClient.get<Array<DetailedMovieRenting>>(`${this.apiUrl}/customers/history`, { observe: 'response' })
  }

  getCurrentRentingDetails(movieId: String) : Observable<HttpResponse<MovieRenting>> {
    return this.httpClient.get<MovieRenting>(`${this.apiUrl}/movie-rentals/${movieId}/rented`,
          { observe: 'response'} )
  }

  rentMovie(movieId: string, rentForm: MovieRentForm) : Observable<MovieRenting> {
    const formatedForm = { rentUntil: rentForm.rentUntil.toISOString().slice(0, 10) }
    return this.httpClient.post<MovieRenting>(`${this.apiUrl}/movie-rentals/${movieId}`, formatedForm)
                            .pipe(catchError(this.handleRentFailure))

  }

  returnMovie(movieId: string) : Observable<HttpResponse<any>> {
    return this.httpClient.delete(`${this.apiUrl}/movie-rentals/${movieId}`, { observe: 'response' })
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
