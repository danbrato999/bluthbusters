import { TestBed } from '@angular/core/testing';

import { OmdbClientService } from './omdb-client.service';

describe('OmdbClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OmdbClientService = TestBed.get(OmdbClientService);
    expect(service).toBeTruthy();
  });
});
