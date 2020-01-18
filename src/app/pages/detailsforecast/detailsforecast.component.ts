import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailsforecast',
  templateUrl: './detailsforecast.component.html',
  styleUrls: ['./detailsforecast.component.scss']
})
export class DetailsforecastComponent implements OnInit {
  detail: any;
  details = {
    name: '',
    day: '',
    temp: '',
    speed: '',
    feels_like: '',
    temp_max: '',
    temp_min: '',
    pressure: '',
    humidity: '',
    description: ''
  }
  constructor(private weatherService: WeatherService, private routeParmCtrl: ActivatedRoute) {
    let city = routeParmCtrl.snapshot.paramMap.get('city');
    this.weatherService.getDetails().subscribe((data) => {
      this.detail = data;
      this.setData(this.detail, city);
    })

  }
  setData(data: any, city: string) {
    this.details.name = city;
    this.details.day = this.getDay(data.dt_txt);
    this.details.temp = data.main.temp;
    this.details.speed = data.wind.speed;
    this.details.feels_like = data.main.feels_like;
    this.details.temp_max = data.main.temp_max;
    this.details.temp_min = data.main.temp_min;
    this.details.pressure = data.main.pressure;
    this.details.humidity = data.main.humidity;
    this.details.description = data.weather[0].description;
  }
  ngOnInit() {
  }
  background() {
    return this.weatherService.background;
  }

  getDay(date: string) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dates = new Date(date);
    let day = dates.getDay();
    return days[day];
  }

}
