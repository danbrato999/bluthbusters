import { Component, OnInit, Sanitizer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.sass']
})
export class MovieDetailsComponent implements OnInit {
  movie;
  movieTrailer: SafeResourceUrl;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.movie = this.moviesService.getMovieById(params.get("movieId"))
      this.movieTrailer = this.movie.trailer ? 
          this.sanitizer.bypassSecurityTrustResourceUrl(this.movie.trailer) : ""
    })
  }
}
