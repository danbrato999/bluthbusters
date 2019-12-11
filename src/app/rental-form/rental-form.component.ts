import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-rental-form',
  templateUrl: './rental-form.component.html',
  styleUrls: ['./rental-form.component.sass']
})
export class RentalFormComponent implements OnInit {
  rentForm;
  minAllowedDate: Date;
  maxAllowedDate: Date;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.minAllowedDate = new Date()
    this.maxAllowedDate = new Date(
      this.minAllowedDate.getFullYear(),
      this.minAllowedDate.getMonth(),
      this.minAllowedDate.getDate() + 20
    )
    this.rentForm = this.formBuilder.group({
      "borrowedAt": ''
    })
  }

  onSubmit(data) {
    console.log("Form submitted -> ", data)
  }
}
