import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';

import { MovieData } from './models';
import { Observable, throwError, of } from 'rxjs';
import { catchError, flatMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class OmdbClientService {

  constructor(
    private httpClient: HttpClient,
    private afAuth: AngularFireAuth,
    private translateService: TranslateService
  ) {}

  searchMovieByTitle(title: string) : Observable<MovieData> {
    if (title === null || title === '')
      return of(null)

    const body = { type: 'byName', value: title }
    return this.afAuth.idToken.pipe(
      flatMap(token =>
        this.httpClient.post<MovieData>('/api/external/omdb/search', body,
          { headers: new HttpHeaders({'Authorization': `Bearer ${token}`}) })
        .pipe(catchError(error => this.handleNotFound(error)))
      )
    )
  }

  private handleNotFound(error: HttpErrorResponse) {
    if (error.status === 404)
      return this.translateService.get('errors.external_movie_not_found').pipe(
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
}
