import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-rental-return',
  templateUrl: './rental-return.component.html',
  styleUrls: ['./rental-return.component.sass']
})
export class RentalReturnComponent implements OnInit {

  @Output() returnMovie = new EventEmitter<any>()
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  askConfirmation() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px'
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.returnMovie.emit()
    })
  }
}
