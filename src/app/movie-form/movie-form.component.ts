import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MovieFormApi, Movie, MovieData, TrailerData } from '../models';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.sass']
})
export class MovieFormComponent implements OnInit {
  // Form data
  posterForm: FormGroup
  trailerForm: FormGroup
  externalDataForm: FormGroup

  // Component visual data
  searchTypes: Array<Object>
  trailerUrl: SafeResourceUrl

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Movie,
    private dialogRef: MatDialogRef<MovieFormComponent>,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initForms()

    if (this.data) {
      this.externalDataForm.patchValue(this.data.externalData)
      this.externalDataForm.patchValue({copies: this.data.inventory.copies})
      this.posterForm.patchValue(this.data.externalData)
      this.trailerForm.patchValue({ youtubeLink: this.data.trailer })
    }
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

  isUpdate() : boolean {
    return Boolean(this.data)
  }

  closeDialog() {
    this.dialogRef.close()
  }

  isDataMissingError(control: string) : boolean {
    return this.externalDataForm.get(control).hasError('required')
  }

  resetForms() {
    this.trailerForm.reset()
    this.posterForm.reset()
    this.externalDataForm.reset()
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
