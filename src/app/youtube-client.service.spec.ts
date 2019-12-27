import { TestBed } from '@angular/core/testing';

import { YoutubeClientService } from './youtube-client.service';

describe('YoutubeClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YoutubeClientService = TestBed.get(YoutubeClientService);
    expect(service).toBeTruthy();
  });
});
