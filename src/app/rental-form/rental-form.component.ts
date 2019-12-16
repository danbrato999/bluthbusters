import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor() { }

  ngOnInit() {
    const now = new Date().getTime()
    const dayMillis = 24 * 3600 * 1000
    this.minAllowedDate = new Date(now + dayMillis)
    this.maxAllowedDate = new Date(now + (dayMillis * 20))
    this.rentForm = new FormGroup({
      rentUntil: new FormControl(this.rentUntil, Validators.required)
    })
  }

  onSubmit(data) {
    console.log("Form submitted -> ", data)
  }
}
