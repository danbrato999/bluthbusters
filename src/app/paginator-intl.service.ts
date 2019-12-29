import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class PaginatorIntlService extends MatPaginatorIntl {
  itemsPerPageLabel = 'Items per page'
  nextPageLabel     = 'Next page'
  previousPageLabel = 'Previous page'
  
  constructor(
    private translateService: TranslateService
  ) { 
    super()
    this.translateService.onLangChange.subscribe(() => {
      this.translateLabels();
    });

    this.translateLabels();
  }

  translateLabels() {
    this.translateService.get(['movie_list.items_per_page', 'movie_list.next_page', 'movie_list.previous_page'])
      .subscribe(translation => {
        this.itemsPerPageLabel = translation['movie_list.items_per_page']
        this.nextPageLabel = translation['movie_list.next_page']
        this.previousPageLabel = translation['movie_list.previous_page']
      })
  }
}
