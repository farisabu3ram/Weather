import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  lat: number;
  lon: number;
  weather: any;
  foreCast: any;
  city: string;
  day1:string;
  day2:string;
  day3:string;
  day4:string;


  constructor(private weatherService: WeatherService, private rout: ActivatedRoute, private rout1: ActivatedRoute) {

  }

  ngOnInit() {
    this.rout.data.subscribe(
      (data: { weather }) => {
        this.weather = data.weather;
      }
    )
    this.rout1.data.subscribe(
      (data: { foreCast }) => {
        this.foreCast = data.foreCast;
        this.day1=this.getDay(this.foreCast.list[8].dt_txt.substr(0, 10));
        this.day2=this.getDay(this.foreCast.list[16].dt_txt.substr(0, 10));
        this.day3=this.getDay(this.foreCast.list[24].dt_txt.substr(0, 10));
        this.day4=this.getDay(this.foreCast.list[32].dt_txt.substr(0, 10));

       
      }
    )
  }
  getDay(date: string) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dates = new Date(date);
     let day=dates.getDay();
     return days[day];

  }







}
