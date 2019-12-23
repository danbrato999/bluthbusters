import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieRentForm, MovieData } from '../models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-rental-form',
  templateUrl: './rental-form.component.html',
  styleUrls: ['./rental-form.component.sass']
})
export class RentalFormComponent implements OnInit {
  rentForm: FormGroup
  minAllowedDate: Date
  maxAllowedDate: Date
  rentUntil: Date

  @Output() onRent = new EventEmitter<MovieRentForm>()
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: MovieData,
    private dialogRef: MatDialogRef<RentalFormComponent>
  ) { }

  ngOnInit() {
    const now = new Date().getTime()
    const dayMillis = 24 * 3600 * 1000
    this.minAllowedDate = new Date(now + dayMillis)
    this.maxAllowedDate = new Date(now + (dayMillis * 20))
    this.rentForm = new FormGroup({
      rentUntil: new FormControl(this.rentUntil, Validators.required)
    })
  }

  closeDialog() {
    this.dialogRef.close()
  }
}
