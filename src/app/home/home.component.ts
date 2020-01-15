import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  lat:number;
  lon:number;
  weather:any;
  foreCast:any;
  city:string;

  constructor(private weatherService: WeatherService) {
    this.lat=0;
    this.lon=0;
    this.weather={};
    this.foreCast={};
    this.city='';
  }
  
  ngOnInit() {
    this.getLocation();
  }

  getLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition((success) => {
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;

        this.weatherService.getWeatherDateByCoords(this.lat, this.lon).subscribe(data => {
          this.weather = data;
          
          this.city=this.weather.name;
          this.weatherService.getForeCastData(this.weather.name).subscribe(data => {
            this.foreCast = data;
            console.log(this.foreCast);
          })
        })
      })
    }

  }


  


}
