import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, throwError } from 'rxjs';
import { catchError, flatMap } from 'rxjs/operators';
import { PaginatedList, Movie, MovieFormApi, IdObject } from './models';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    private httpClient: HttpClient,
    private afAuth: AngularFireAuth,
    private translateService: TranslateService
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
      catchError(error => this.handleUnexpected(error))
    )
  }

  getMovieById(id: string) : Observable<Movie> {
    return this.afAuth.idToken.pipe(
      flatMap(token =>
        this.httpClient.get<Movie>(`/api/movies/${id}`,
          {
            headers: new HttpHeaders({'Authorization': `Bearer ${token}`})
          }
        ).pipe(catchError(error => this.handleNotFound(error)))
      )
    )
  }

  addMovie(movieForm: MovieFormApi) : Observable<IdObject> {
    return this.afAuth.idToken.pipe(
      flatMap(token =>
        this.httpClient.post<IdObject>('/api/movies', movieForm,
          { headers: new HttpHeaders({'Authorization': `Bearer ${token}`})}
        ).pipe(catchError(error => this.handleUnexpected(error)))
      )
    )
  }

  updateMovie(id: string, movieForm: MovieFormApi) : Observable<Movie> {
    return this.afAuth.idToken.pipe(
      flatMap(token =>
        this.httpClient.put<Movie>(`/api/movies/${id}`, movieForm,
          { headers: new HttpHeaders({'Authorization': `Bearer ${token}`})}
        ).pipe(catchError(error => this.handleNotFound(error)))
      )
    )
  }

  private handleNotFound(error: HttpErrorResponse) {
    if (error.status === 404)
      return this.translateService.get('errors.movie_not_found').pipe(
        flatMap(message => throwError(message))
      )
    
    if (error.error instanceof ErrorEvent)
      console.error('An error occurred:', error.error.message)
    else
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`)

    return this.translateService.get('errors.unexpected_error').pipe(
      flatMap(message => throwError(message))
    )
  }

  private handleUnexpected(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent)
      console.error('An error occurred:', error.error.message)
    else
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`)

    return this.translateService.get('errors.unexpected_error').pipe(
      flatMap(message => throwError(message))
    )
  }
}
