import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, throwError } from 'rxjs';
import { catchError, flatMap } from 'rxjs/operators';
import { PaginatedList, Movie, MovieFormApi, IdObject } from './models';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiUrl: string

  constructor(
    private httpClient: HttpClient,
    private afAuth: AngularFireAuth
  ) {
    this.apiUrl = "http://localhost:9900"
  }

  getAvailableMovies() : Observable<HttpResponse<PaginatedList<Movie>>> {
    return this.afAuth.idToken.pipe(
      flatMap(token =>
        this.httpClient.get<PaginatedList<Movie>>(`${this.apiUrl}/movies`,
          {
            headers: new HttpHeaders({'Authorization': `Bearer ${token}`}),
            observe: 'response'
          }
        )
      )
    )
  }

  getMovieById(id: string) : Observable<HttpResponse<Movie>> {
    return this.afAuth.idToken.pipe(
      flatMap(token =>
        this.httpClient.get<Movie>(`${this.apiUrl}/movies/${id}`,
          {
            headers: new HttpHeaders({'Authorization': `Bearer ${token}`}),
            observe: 'response'
          }
        ).pipe(catchError(this.handleNotFound))
      )
    )
  }

  addMovie(movieForm: MovieFormApi) : Observable<IdObject> {
    return this.afAuth.idToken.pipe(
      flatMap(token =>
        this.httpClient.post<IdObject>(`${this.apiUrl}/movies`, movieForm,
          { headers: new HttpHeaders({'Authorization': `Bearer ${token}`})}
        ).pipe(catchError(this.handleUnexpected))
      )
    )
  }

  updateMovie(id: string, movieForm: MovieFormApi) : Observable<Movie> {
    return this.afAuth.idToken.pipe(
      flatMap(token =>
        this.httpClient.put<Movie>(`${this.apiUrl}/movies/${id}`, movieForm,
          { headers: new HttpHeaders({'Authorization': `Bearer ${token}`})}
        ).pipe(catchError(this.handleNotFound))
      )
    )
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
