import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private snackBar: MatSnackBar,
    private translateService: TranslateService
  ) { }

  showApiError(error: string) {
    this.translateService.get('dismiss')
      .subscribe(translation => this.snackBar.open(error, translation, { duration: 5000 }))
  }
}
