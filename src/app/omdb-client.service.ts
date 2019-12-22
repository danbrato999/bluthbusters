import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';

import { MovieDataSearch, MovieData } from './models';
import { Observable, throwError } from 'rxjs';
import { catchError, flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OmdbClientService {
  private apiUrl: string

  constructor(
    private httpClient: HttpClient,
    private afAuth: AngularFireAuth
  ) {
    this.apiUrl = "http://localhost:9900"
  }

  searchExternalMovieData(search: MovieDataSearch) : Observable<MovieData> {
    return this.afAuth.idToken.pipe(
      flatMap(token =>
        this.httpClient.post<MovieData>(`${this.apiUrl}/external/omdb/search`, search,
          { headers: new HttpHeaders({'Authorization': `Bearer ${token}`}) })
        .pipe(catchError(this.handleNotFound))
      )
    )
  }

  private handleNotFound(error: HttpErrorResponse) {
    var message = ''

    if (error.status === 404)
      message = 'The requested movie was not found in the external database'
    else {
      message = 'Unexpected error in the app. Please try again later'
      if (error.error instanceof ErrorEvent)
        console.error('An error occurred:', error.error.message)
      else
        console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`)
    }

    return throwError(message)
  }
}
