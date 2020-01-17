import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather-service.service';
import{foreCastForFourDays} from '../foreCastForFourDays'

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
    currentWeather = {
        name: '',
        icon: '',
        temp: '',
        description: ''
    }
    foreCastArray = [];


    constructor(private weatherService: WeatherService) {

    }

    ngOnInit() {
        navigator.geolocation.getCurrentPosition((success) => {
            this.lat = success.coords.latitude;
            this.lon = success.coords.longitude;
            this.weatherService.getWeatherDateByCoords('weather', this.lat, this.lon).subscribe((data) => {
                this.weather = data;
                this.setData(this.weather);
                this.weatherService.getWeatherDateByCoords("forecast", this.lat, this.lon).subscribe((data) => {
                    this.foreCast = data;
                    this.foreCastArray = this.setDataForeCast(this.foreCast.list);
                })
            })


            // this.day1 = this.getDay(this.foreCast.list[8].dt_txt.substr(0, 10));
            // this.day2 = this.getDay(this.foreCast.list[16].dt_txt.substr(0, 10));
            // this.day3 = this.getDay(this.foreCast.list[24].dt_txt.substr(0, 10));
            // this.day4 = this.getDay(this.foreCast.list[32].dt_txt.substr(0, 10));

        })
    }

    getDay(date: string) {
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let dates = new Date(date);
        let day = dates.getDay();
        return days[day];

    }
    setData(data: any) {
        try {
            this.currentWeather.name = data.name;
            this.currentWeather.icon = data.weather[0].icon;
            this.currentWeather.temp = data.main.temp;
            this.currentWeather.description = data.weather[0].description;
        }
        catch (e) {
            console.log(e);
        }
    }
    setDataForeCast(data: any) {
        let counter = 4;
        let four = [];
        let currentDate = data[0].dt_txt.substr(0, 10);
        let i = 1;
        try {
            while (counter > 0 && i < data.length){
              if(currentDate!=data[i].dt_txt.substr(0, 10)){
                  let fourDays=new foreCastForFourDays(this.getDay(data[i].dt_txt.substr(0, 10)),data[i].weather[0].icon,data[i].main.temp_max,data[i].main.temp_min);
                  four.push(fourDays);
                  currentDate=data[i].dt_txt.substr(0, 10);
                  counter--;
              }
                i++;
            }
        }
        catch (e) {
            console.log(e);
        }
        return four;
    }
}