import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { RentalHistoryComponent } from './rental-history/rental-history.component';

const routes: Routes = [
    { path: '', component: MovieListComponent },
    { path: 'movies/:movieId', component: MovieDetailsComponent },
    { path: 'rental-history', component: RentalHistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
