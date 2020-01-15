import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  url = 'https://api.openweathermap.org/data/2.5/weather?';
  urlForeCast = 'https://api.openweathermap.org/data/2.5/forecast?';
  urlNear = 'https://api.openweathermap.org/data/2.5/find?';
  apiKey = 'd5d7bf436da022730b27184fb44e9abb'
  constructor(private http: HttpClient) {
  }
  lat;
  lon;
  weather;
  forecast;

  getWeatherDateByCoords() {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition((success) => {
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;
        let params = new HttpParams()
          .set('lat', this.lat)
          .set('lon', this.lon)
          .set('units', 'metric')
          .set('appid', this.apiKey)
        this.http.get(this.url, { params }).subscribe(
          (data) => {
            this.weather = data;
            res(this.weather);
          }
        )
      })
    })

  }

  getForeCastData() {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition((success) => {
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;
        let params = new HttpParams()
          .set('lat', this.lat)
          .set('lon', this.lon)
          .set('units', 'metric')
          .set('appid', this.apiKey)
        this.http.get(this.urlForeCast, { params }).subscribe(
          (data) => {
            this.forecast = data;
            res(this.forecast)
          })
      })
    })
  }
  getDataByCityName(city) {
    let params = new HttpParams()
      .set('q', city)
      .set('units', 'metric')
      .set('appid', this.apiKey)
    return this.http.get(this.url, { params });
  }
  getNearCities(lat, lon,cont) {
    let params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('cnt',cont)
      .set('appid', this.apiKey)
    return this.http.get(this.urlNear, { params });


  }
}