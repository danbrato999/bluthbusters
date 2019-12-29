import { TestBed } from '@angular/core/testing';

import { BbTranslatorService } from './bb-translator.service';

describe('BbTranslatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BbTranslatorService = TestBed.get(BbTranslatorService);
    expect(service).toBeTruthy();
  });
});
