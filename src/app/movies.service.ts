import { Injectable } from '@angular/core';

import { movies } from './movies';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor() { }

  getAvailableMovies() {
    const list = Object.keys(movies)
      .map( (key) => { 
        const keyObj = { "id": key }
        return {...keyObj, ...movies[key]}
      });

    console.log(list)

    return list
  }

  getMovieById(id: string) {
    return movies[id]
  }
}
