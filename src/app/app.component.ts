import { Component } from '@angular/core';
import { BbTranslatorService } from './bb-translator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'bluthbusters';

  constructor(
    bbTranslator: BbTranslatorService
  ) {
    bbTranslator.initTranslator()
  }
}
