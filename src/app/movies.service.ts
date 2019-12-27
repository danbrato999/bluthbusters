import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, throwError } from 'rxjs';
import { catchError, flatMap } from 'rxjs/operators';
import { PaginatedList, Movie, MovieFormApi, IdObject } from './models';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    private httpClient: HttpClient,
    private afAuth: AngularFireAuth
  ) {}

  getAvailableMovies(page: number, limit: number, name?:string) : Observable<HttpResponse<PaginatedList<Movie>>> {
    const paginationParams = new HttpParams()
            .set("page", page.toString())
            .set("limit", limit.toString())

    return this.afAuth.idToken.pipe(
      flatMap(token =>
        this.httpClient.get<PaginatedList<Movie>>('/api/movies',
          {
            params: name ? paginationParams.set("name", name) : paginationParams,
            headers: new HttpHeaders({'Authorization': `Bearer ${token}`}),
            observe: 'response'
          }
        )
      ),
      catchError(this.handleUnexpected)
    )
  }

  getMovieById(id: string) : Observable<HttpResponse<Movie>> {
    return this.afAuth.idToken.pipe(
      flatMap(token =>
        this.httpClient.get<Movie>(`/api/movies/${id}`,
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
        this.httpClient.post<IdObject>('/api/movies', movieForm,
          { headers: new HttpHeaders({'Authorization': `Bearer ${token}`})}
        ).pipe(catchError(this.handleUnexpected))
      )
    )
  }

  updateMovie(id: string, movieForm: MovieFormApi) : Observable<Movie> {
    return this.afAuth.idToken.pipe(
      flatMap(token =>
        this.httpClient.put<Movie>(`/api/movies/${id}`, movieForm,
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
