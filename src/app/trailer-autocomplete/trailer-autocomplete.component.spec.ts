import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerAutocompleteComponent } from './trailer-autocomplete.component';

describe('TrailerAutocompleteComponent', () => {
  let component: TrailerAutocompleteComponent;
  let fixture: ComponentFixture<TrailerAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrailerAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailerAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
