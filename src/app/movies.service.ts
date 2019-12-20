import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaginatedList, Movie, MovieFormApi, IdObject } from './models';

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

  addMovie(movieForm: MovieFormApi) : Observable<IdObject> {
    return this.httpClient.post<IdObject>(`${this.apiUrl}/movies`, movieForm)
                        .pipe(catchError(this.handleUnexpected))
  }

  private handleNotFound(error: HttpErrorResponse) {
    if (error.status === 404)
      return throwError('Requested movie not found')
    
    if (error.error instanceof ErrorEvent)
      console.error('An error occurred:', error.error.message);
    else
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);

    return throwError('Unexpected error in the app. Please try again later')
  }

  private handleUnexpected(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent)
      console.error('An error occurred:', error.error.message);
    else
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);

    return throwError('Unexpected error in the app. Please try again later')
  }
}
