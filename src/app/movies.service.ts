import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaginatedList, Movie } from './models';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiUrl: string

  constructor(
    private httpClient: HttpClient
  ) {
    this.apiUrl = "http://localhost:9900"
  }

  getAvailableMovies() : Observable<HttpResponse<PaginatedList<Movie>>> {
    return this.httpClient.get<PaginatedList<Movie>>(`${this.apiUrl}/movies`, { observe: 'response' })
  }

  getMovieById(id: string) : Observable<HttpResponse<Movie>> {
    return this.httpClient.get<Movie>(`${this.apiUrl}/movies/${id}`, { observe: 'response' })
                        .pipe(catchError(this.handleNotFound))
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
