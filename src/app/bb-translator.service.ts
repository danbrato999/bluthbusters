import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class BbTranslatorService {

  constructor(
    private cookieService: CookieService,
    private translate: TranslateService
  ) { }

  initTranslator() {
    this.translate.setDefaultLang('en')
    this.translate.use(this.currentLanguage)
  }

  selectLanguage(lang: string) {
    this.cookieService.set(LANG_COOKIE, lang)
    this.translate.use(lang)
  }

  get currentLanguage() : string {
    return this.cookieService.get(LANG_COOKIE) || 'en'
  }
}

const LANG_COOKIE = 'bb-language'
