import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalReturnComponent } from './rental-return.component';

describe('RentalReturnComponent', () => {
  let component: RentalReturnComponent;
  let fixture: ComponentFixture<RentalReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
