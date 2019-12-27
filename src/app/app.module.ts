import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { RentalFormComponent } from './rental-form/rental-form.component';
import { RentalHistoryComponent } from './rental-history/rental-history.component';
import { MovieFormComponent } from './movie-form/movie-form.component';
import { LoginComponent } from './login/login.component';
import { BbTopbarComponent } from './bb-topbar/bb-topbar.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { RentalReturnComponent } from './rental-return/rental-return.component';
import { MovieDataAutocompleteComponent } from './movie-data-autocomplete/movie-data-autocomplete.component';
import { TrailerAutocompleteComponent } from './trailer-autocomplete/trailer-autocomplete.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    MovieDetailsComponent,
    RentalFormComponent,
    RentalHistoryComponent,
    MovieFormComponent,
    LoginComponent,
    BbTopbarComponent,
    ConfirmationDialogComponent,
    RentalReturnComponent,
    MovieDataAutocompleteComponent,
    TrailerAutocompleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatGridListModule,
    MatDialogModule,
    MatRadioModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatAutocompleteModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxAuthFirebaseUIModule.forRoot(environment.firebase),
    AngularFireAuthModule,
    FlexLayoutModule,
  ],
  providers: [AngularFireAuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [MovieFormComponent, RentalFormComponent, ConfirmationDialogComponent]
})
export class AppModule { }
