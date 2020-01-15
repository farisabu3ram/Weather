import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { WeatherService } from './weather-service.service';

@Injectable({
  providedIn: 'root'
})
export class ResolveForeCastService implements Resolve<any> {

  constructor(private ws: WeatherService) {}
  resolve(){
    return this.ws.getForeCastData();
  }
}
