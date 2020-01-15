import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  url = 'https://api.openweathermap.org/data/2.5/weather?';
  urlForeCast = 'https://api.openweathermap.org/data/2.5/forecast';
  apiKey = 'd5d7bf436da022730b27184fb44e9abb'
  constructor(private http: HttpClient) {
  }
  getWeatherDateByCoords(lat, lon) {
    let params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('units', 'metric')
      .set('appid', this.apiKey)
    return this.http.get(this.url, { params });
  }
  getForeCastData(city) {
    let params = new HttpParams()
      .set('q',city)
      .set('units', 'metric')
      .set('appid', this.apiKey)
      return this.http.get(this.urlForeCast,{params});
 }
 getDataByCityName(city){
  let params = new HttpParams()
  .set('q',city)
  .set('units', 'metric')
  .set('appid', this.apiKey)
  return this.http.get(this.url,{params});
 }
}