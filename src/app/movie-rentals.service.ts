import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { MovieRenting, DetailedMovieRenting } from './models';
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

  private handleNotFound(error: HttpErrorResponse) { 
    var message = "Unexpected error in the app. Please try again later"
    if (error.error instanceof ErrorEvent)
      console.error('An error occurred:', error.error.message);
    else if (error.status == 404)
        message = "Requested movie not found"
    else
        console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    
    return throwError(message)
  }
}
