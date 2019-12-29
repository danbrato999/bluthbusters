import { Component, OnInit } from '@angular/core';
import { MovieFormApi, MovieData, TrailerData } from '../models';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../movies.service';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.sass']
})
export class MovieFormComponent implements OnInit {
  //Movie data
  movieId: string | null

  // Form data
  posterForm: FormGroup
  trailerForm: FormGroup
  externalDataForm: FormGroup

  // Component visual data
  loading: boolean
  searchTypes: Array<Object>
  trailerUrl: SafeResourceUrl

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private moviesService: MoviesService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {
    this.initForms()
    this.route.paramMap.subscribe(params => {
      if (params.get("movieId")) {
        this.movieId = params.get("movieId")
        this.moviesService.getMovieById(this.movieId)
          .subscribe(response => {
            this.externalDataForm.patchValue(response.externalData)
            this.externalDataForm.patchValue({copies: response.inventory.copies})
            this.posterForm.patchValue(response.externalData)
            this.trailerForm.patchValue({ youtubeLink: response.trailer })
          }, error => this.notificationsService.showApiError(error))
      }
    })
  }

  selectMovie(movie: MovieData) {
    this.resetForms()
    this.posterForm.patchValue(movie)
    this.externalDataForm.patchValue(movie)
  }

  selectTrailer(trailerData: TrailerData) {
    const url = 'https://www.youtube.com/embed/' + trailerData.id
    this.trailerForm.patchValue({ youtubeLink: url })
  }

  joinedMovieData() : MovieFormApi {
    const externalData = this.externalDataForm.value
    const poster = this.posterForm.value.poster
    const copies = +externalData.copies
    const { imdbId, title, genre, year, director, runtime, description } = externalData

    return { externalData: { imdbId: imdbId, title: title, genre: genre, year: +year, poster: poster, director: director,
              runtime: runtime, description: description}, trailer: this.youtubeLinkControl.value, copies: copies }
  }

  isMovieValid() : boolean {
    return this.posterForm.valid && this.trailerForm.valid && this.externalDataForm.valid
  }

  isDataMissingError(control: string) : boolean {
    return this.externalDataForm.get(control).hasError('required')
  }

  resetForms() {
    this.trailerForm.reset()
    this.posterForm.reset()
    this.externalDataForm.reset()
  }

  submitForms() {
    const externalData = this.externalDataForm.value
    const poster = this.posterForm.value.poster
    const copies = +externalData.copies
    const { imdbId, title, genre, year, director, runtime, description } = externalData

    const movieForm: MovieFormApi = { externalData: { imdbId: imdbId, title: title, genre: genre, year: +year, poster: poster, director: director,
      runtime: runtime, description: description}, trailer: this.youtubeLinkControl.value, copies: copies }

    const action = this.isUpdate ? this.moviesService.updateMovie(this.movieId, movieForm) : 
                    this.moviesService.addMovie(movieForm)
    
    action.subscribe(result => this.router.navigate(['/movies', result.id]),
      error => this.notificationsService.showApiError(error))
  }

  get isUpdate() : boolean {
    return Boolean(this.movieId)
  }

  get posterControl() : AbstractControl {
    return this.posterForm.get('poster')
  }

  get youtubeLinkControl() : AbstractControl {
    return this.trailerForm.get('youtubeLink')
  }

  get yearControl() : AbstractControl {
    return this.externalDataForm.get('year')
  }

  get copiesControl() : AbstractControl {
    return this.externalDataForm.get('copies')
  }

  get title() : string {
    return this.externalDataForm.get('title').value
  }

  get escapedTrailer() : SafeResourceUrl | null {
    if (this.youtubeLinkControl.value)
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.youtubeLinkControl.value)

    return null
  }

  private initForms() {
    this.posterForm = this.formBuilder.group({
      poster: ['', Validators.required]
    })

    const trailerRegex = /^https:\/\/www\.youtube\.com\/embed\/.*$/
    this.trailerForm = this.formBuilder.group({
      youtubeLink: ['', [Validators.required, Validators.pattern(trailerRegex)]]
    })

    const currentYear = new Date().getFullYear()
    this.externalDataForm = this.formBuilder.group({
      imdbId: ['', Validators.required],
      title: ['', Validators.required],
      genre: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1888), Validators.max(currentYear)]],
      director: ['', Validators.required],
      runtime: ['', Validators.required],
      poster: ['', Validators.required],
      description: ['', Validators.required],
      copies: ['', [Validators.required, Validators.min(1)]]
    })
  }
}
