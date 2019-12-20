import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MovieDataSearch, MovieFormApi, Movie } from '../models';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { OmdbClientService } from '../omdb-client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.sass']
})
export class MovieFormComponent implements OnInit {
  // Form data
  searchForm: FormGroup
  posterForm: FormGroup
  trailerForm: FormGroup
  externalDataForm: FormGroup

  // Component visual data
  searchTypes: Array<Object>
  linkRegex: RegExp
  loading: boolean
  errorMessage: string

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Movie,
    private dialogRef: MatDialogRef<MovieFormComponent>,
    private sanitizer: DomSanitizer,
    private omdbClient: OmdbClientService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.linkRegex = /watch\?v=(.*)$/
    this.searchTypes = [{type: "byName", text: "Title"}, {type: "byImdbId", text: "IMDb id"}]
    this.loading = false

    this.searchForm = this.formBuilder.group({
      type: ['byName', Validators.required],
      value: ['', Validators.required]
    })

    this.posterForm = this.formBuilder.group({
      poster: ['', Validators.required]
    })

    this.trailerForm = this.formBuilder.group({
      youtubeLink: ['', [Validators.required, Validators.pattern(this.linkRegex)]]
    })

    this.externalDataForm = this.formBuilder.group({
      imdbId: ['', Validators.required],
      title: ['', Validators.required],
      genre: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1888), Validators.max(2019)]],
      director: ['', Validators.required],
      runtime: ['', Validators.required],
      poster: ['', Validators.required],
      description: ['', Validators.required],
      copies: ['', [Validators.required, Validators.min(1)]]
    })

    if (this.data) {
      this.externalDataForm.patchValue(this.data.externalData)
      this.externalDataForm.patchValue({copies: this.data.inventory.copies})
      this.posterForm.patchValue(this.data.externalData)
      const youtubeLink = 'https://www.youtube.com/watch?v=' + this.data.trailer.slice(this.data.trailer.lastIndexOf('/') + 1)
      this.trailerForm.patchValue({youtubeLink: youtubeLink})
    }
  }

  searchMovieFromExternalSource(search: MovieDataSearch) {
    this.loading = true
    this.resetForms()
    this.omdbClient.searchExternalMovieData(search)
        .subscribe(response => {
          const externalData = { ... response }
          this.posterForm.patchValue(externalData)
          this.externalDataForm.patchValue(externalData)
          this.loading = false
        }, error => {
          this.errorMessage = error
          this.loading = false
        })
  }

  escapedTrailer() : SafeResourceUrl {
    if (this.getEmbedVideo())
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.getEmbedVideo())
    
    return undefined
  }

  joinedMovieData() : MovieFormApi {
    const externalData = this.externalDataForm.value
    const poster = this.posterForm.value.poster
    const copies = +externalData.copies
    const { imdbId, title, genre, year, director, runtime, description } = externalData

    return { externalData: { imdbId: imdbId, title: title, genre: genre, year: +year, poster: poster, director: director,
              runtime: runtime, description: description}, trailer: this.getEmbedVideo(), copies: copies }
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

  private getEmbedVideo() : string {
    const youtubeLink = this.trailerForm.value.youtubeLink
    const matched = youtubeLink.match(this.linkRegex)
    return matched ? `https://www.youtube.com/embed/${matched[1]}` : ''
  }

  private resetForms() {
    this.errorMessage = ''

    if (this.trailerForm.touched)
      this.trailerForm.reset()

    if (this.posterForm.touched)
    this.posterForm.reset()

    if (this.externalDataForm.touched)
      this.externalDataForm.reset()
  }
}
