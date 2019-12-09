import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {MoviesService} from '../movies.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.sass']
})
export class MovieListComponent implements OnInit {

  movies;

  constructor(
    private moviesService: MoviesService
  ) { }

  ngOnInit() {
    this.movies = this.moviesService.getAvailableMovies()
  }
}
