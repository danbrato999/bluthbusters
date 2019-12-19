import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { MovieDataSearch, MovieData } from './models';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OmdbClientService {
  private apiUrl: string

  constructor(
    private httpClient: HttpClient
  ) {
    this.apiUrl = "http://localhost:9900"
  }

  searchExternalMovieData(search: MovieDataSearch) : Observable<MovieData> {
    return this.httpClient.post<MovieData>(`${this.apiUrl}/external/omdb/search`, search)
                          .pipe( catchError(this.handleNotFound) )
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
