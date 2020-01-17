import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  detail: any;
  details = {
    name: '',
    country: '',
    temp: '',
    speed: '',
    feels_like: '',
    temp_max: '',
    temp_min: '',
    pressure: '',
    humidity: '',
    description: '',
    timezone: '',
    base: '',
    visibility: ''
  }
  constructor(private weatherService: WeatherService, private routeParmCtrl: ActivatedRoute) {
    let city = routeParmCtrl.snapshot.paramMap.get('city');
    this.weatherService.getDataByCityName('weather', city).subscribe(data => {
      this.detail = data;
      this.setData(this.detail);
    })

  }
  setData(data) {
    this.details.name = data.name;
    this.details.country = data.sys.country;
    this.details.temp = data.main.temp;
    this.details.speed = data.wind.speed;
    this.details.feels_like = data.main.feels_like;
    this.details.temp_max = data.main.temp_max;
    this.details.temp_min = data.main.temp_min;
    this.details.pressure = data.main.pressure;
    this.details.humidity = data.main.humidity;
    this.details.description = data.weather[0].description;
    this.details.timezone = data.timezone;
    this.details.base = data.base;
    this.details.visibility = data.visibility;
  }
  ngOnInit() {

  }

}
