import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { WeatherService } from './weather-service.service';

@Injectable({
  providedIn: 'root'
})
export class ResolveService implements Resolve<any> {

  constructor(private ws: WeatherService) { }
  resolve() {
    return this.ws.getWeatherDateByCoords()
  }
}
