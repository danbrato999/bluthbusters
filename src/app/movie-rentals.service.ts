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
        const { externalData } = movies[obj.movieId]
        const jointObj = { ...obj, ...{movie: { title: externalData.title } } }
        return jointObj
      }).sort((a, b) => b.borrowedAt.getTime() - a.borrowedAt.getTime())
  }

  getCurrentRentingDetails(movieId: String, userId: String) {
    return movieLendings
      .find(lending => lending.movieId == movieId && lending.userId == userId
        && !lending.returnedAt)
  }
}
