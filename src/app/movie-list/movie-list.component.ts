import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MovieFormComponent } from '../movie-form/movie-form.component';

import { MoviesService } from '../movies.service';
import { Movie } from '../models';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.sass']
})
export class MovieListComponent implements OnInit {
  private movieCount : number
  private movies: Array<Movie>

  constructor(
    private moviesService: MoviesService,
    private dialog: MatDialog,
    private router: Router
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

  openForm() {
    const dialogRef = this.dialog.open(MovieFormComponent, {
      width: '650px'
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.moviesService.addMovie(result).subscribe(newId => {
          this.router.navigate(['movies', newId.id])
        }, error => console.error(error))
      }
    })
  }
}
