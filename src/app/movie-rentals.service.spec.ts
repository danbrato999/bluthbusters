import { TestBed } from '@angular/core/testing';

import { MovieRentalsService } from './movie-rentals.service';

describe('MovieRentalsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovieRentalsService = TestBed.get(MovieRentalsService);
    expect(service).toBeTruthy();
  });
});
