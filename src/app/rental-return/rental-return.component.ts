import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MovieRenting } from '../models';

@Component({
  selector: 'app-rental-return',
  templateUrl: './rental-return.component.html',
  styleUrls: ['./rental-return.component.sass']
})
export class RentalReturnComponent implements OnInit {

  @Output() returnMovie = new EventEmitter<any>()
  @Input() details: MovieRenting
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

  get buttonColor() : string {
    const currentDate = new Date()
    const rentUntilDate = new Date(this.details.rentUntil)

    return rentUntilDate < currentDate ? 'warn' : 'accent'
  }
}
