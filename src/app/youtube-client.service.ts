import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { catchError, flatMap } from 'rxjs/operators'
import { TrailerData } from './models';

@Injectable({
  providedIn: 'root'
})
export class YoutubeClientService {

  constructor(
    private httpClient: HttpClient,
    private afAuth: AngularFireAuth
  ) { }

  searchTrailerByTitle(title: string) : Observable<Array<TrailerData>> {
    if (title === null || title === '')
      return of([])

    const params = new HttpParams()
          .set("title", title)

    return this.afAuth.idToken.pipe(
      flatMap(token =>
        this.httpClient.get<Array<TrailerData>>('/api/external/youtube/search',
          {
            params: params,
            headers: new HttpHeaders({'Authorization': `Bearer ${token}`}) 
          }
        ).pipe(catchError(this.handleError))
      )
    )
  }

  private handleError(error: HttpErrorResponse) : Observable<Array<TrailerData>> {
    if (error.error instanceof ErrorEvent)
      console.error('An error occurred:', error.error.message)
    else
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`)

    return of([])
  }
}
