import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {MoviesService} from '../movies.service';
import { PaginatedList, Movie } from '../models';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.sass']
})
export class MovieListComponent implements OnInit {
  private movieCount : number
  private movies: Array<Movie>

  constructor(
    private moviesService: MoviesService
  ) {
    this.movieCount = 0
    this.movies = []
  }

  ngOnInit() {
    this.moviesService.getAvailableMovies()
        .subscribe(response => {
          const { totalCount, data }  = { ... response.body }
          this.movieCount = totalCount
          this.movies = data
        })
  }
}
