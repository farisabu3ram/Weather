import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  lat;
  lon;
  weather;
  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.getLocation();
  }
  getLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition((success) => {
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude

        this.weatherService.getWeatherDateByCoords(this.lat, this.lon).subscribe(data => {
          this.weather = data;
        })
      })
    }

  }

}
