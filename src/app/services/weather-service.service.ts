import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  details: any;
  currentWeather = {
    name: '',
    icon: 'wait',
    temp: '',
    description: ''
  }
  foreCastArray = [];
  yourArea:boolean=true;

  constructor(private http: HttpClient) {
  }

  getWeatherDateByCoords(name: string, lat: number, lon: number) {
    return this.http.get(`${environment.url}${name}?lat=${lat}&lon=${lon}&appid=${environment.apiKey}&units=metric&cnt=50`)
  }

  getDataByCityName(name: string, city: string) {
    return this.http.get(`${environment.url}${name}?q=${city}&appid=${environment.apiKey}&units=metric&cnt=50`);
  }
  getDetails(): Observable<any[]> {
    return of(this.details);
  }

  setDetails(details: any) {
    this.details = details;
  }
  getCurrentWeather(): Observable<any> {
    return of(this.currentWeather);
  }
  setCurrentWeather(currentWeather) {
    this.currentWeather = currentWeather;
  }
  getForeCastArray(): Observable<any> {
    return of(this.foreCastArray);
  }
  setForeCastArray(foreCastArray) {
    this.foreCastArray = foreCastArray;
  }

}