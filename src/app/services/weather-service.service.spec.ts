import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather-service.service';

describe('WeatherServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeatherService = TestBed.get(WeatherService);
    expect(service).toBeTruthy();
  });
});
