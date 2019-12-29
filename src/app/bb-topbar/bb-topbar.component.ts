import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MovieRentalsService } from '../movie-rentals.service';
import { BbTranslatorService } from '../bb-translator.service';

@Component({
  selector: 'app-bb-topbar',
  templateUrl: './bb-topbar.component.html',
  styleUrls: ['./bb-topbar.component.sass']
})
export class BbTopbarComponent implements OnInit {
  pendingRentalsCount: number | null
  private languageConf: Object

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private rentalsService: MovieRentalsService,
    private bbTranslator: BbTranslatorService
  ) { 
    this.pendingRentalsCount = null
    this.languageConf = { 'English': 'en',  'Español': 'es' }
  }

  ngOnInit() {
    this.fetchPendingMoviesCount()
    this.rentalsService.movieReturned.subscribe(() => this.fetchPendingMoviesCount())
  }

  logoutUser() {
    this.afAuth.auth.signOut().then(() => this.router.navigate(['/login']))
  }

  selectLanguage(lang: string) {
    this.bbTranslator.selectLanguage(this.languageConf[lang])
  }

  isSelected(lang: string) {
    return this.languageConf[lang] === this.bbTranslator.currentLanguage
  }

  get languages() : Array<string> {
    return Object.keys(this.languageConf)
  }

  private fetchPendingMoviesCount() {
    this.rentalsService.getPendingMoviesCount()
        .subscribe(response => {
          if (response > 0) 
            this.pendingRentalsCount = response
          else
            this.pendingRentalsCount = null
        })
  }
}
