import { Injectable } from '@angular/core';

import { movies, movieLendings } from './movies';

@Injectable({
  providedIn: 'root'
})
export class MovieRentalsService {

  constructor() { }

  getUserHistory(userId: String) {
    return movieLendings
      .filter(lending => userId == lending.userId)
      .map(obj => {
        const jointObj = { ...obj, ...{movie: movies[obj.movieId]} }
        return jointObj
      })
  }
}
