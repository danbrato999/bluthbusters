import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDataAutocompleteComponent } from './movie-data-autocomplete.component';

describe('MovieDataAutocompleteComponent', () => {
  let component: MovieDataAutocompleteComponent;
  let fixture: ComponentFixture<MovieDataAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieDataAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDataAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
