import { Component, OnInit, HostBinding } from '@angular/core';
import { WeatherService } from 'src/app/services/weather-service.service';
import { foreCastForFourDays } from '../../pages/foreCastForFourDays'
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CitiesComponent } from 'src/app/pages/cities/cities.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    constructor(private weatherService: WeatherService, private matDialog: MatDialog, private router: Router) { }

    lat: number;
    lon: number;
    weather: any;
    foreCast: any;
    currentWeather = this.weatherService.currentWeather;
    foreCastArray = this.weatherService.foreCastArray;


    ngOnInit() {
        if (this.weatherService.yourArea) {
            this.homeDetails();
            this.weatherService.yourArea = false;
        }
    }
    /**
     This function set the data from your location
     */
    homeDetails() {
        navigator.geolocation.getCurrentPosition((success) => {
            this.lat = success.coords.latitude;
            this.lon = success.coords.longitude;
            this.weatherService.getWeatherDateByCoords('weather', this.lat, this.lon).subscribe((data) => {
                this.weather = data;
                this.setData(this.weather);
                this.weatherService.background = this.background();
                this.currentWeather = this.weatherService.currentWeather;
                this.weatherService.getWeatherDateByCoords("forecast", this.lat, this.lon).subscribe((data) => {
                    this.foreCast = data;
                    this.weatherService.foreCastArray = this.setDataForeCast(this.foreCast.list);
                    this.foreCastArray = this.weatherService.foreCastArray;

                })
            })
        })
    }
    /*
   This function take a date and retuen a day of that day
    */
    getDay(date: string) {
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let dates = new Date(date);
        let day = dates.getDay();
        return days[day];

    }

    setData(data: any) {
        try {
            this.weatherService.currentWeather.name = data.name;
            this.weatherService.currentWeather.icon = data.weather[0].icon;
            this.weatherService.currentWeather.temp = data.main.temp;
            this.weatherService.currentWeather.description = data.weather[0].description;
        }
        catch (e) {
            console.log(e);
        }
    }
    /**
     get four days casts and it's data 
     */
    setDataForeCast(data: any) {
        let counter = 4;
        let four = [];
        let currentDay = this.getDay(data[0].dt_txt);
        let i = 1;
        try {
            while (counter > 0 && i < data.length) {
                if (currentDay != this.getDay(data[i].dt_txt)) {
                    let fourDays = new foreCastForFourDays(this.getDay(data[i].dt_txt),
                        data[i].weather[0].icon,
                        data[i].main.temp_max,
                        data[i].main.temp_min,
                        data[i]);
                    four.push(fourDays);
                    currentDay = this.getDay(data[i].dt_txt);
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
    /**
      Create  menu popup and choose another region to get it's weather
     */
    onCreate() {
        const matDialogConfig = new MatDialogConfig();
        matDialogConfig.disableClose = true;
        matDialogConfig.autoFocus = true;
        matDialogConfig.width = '80%';
        matDialogConfig.height = '640px';
        matDialogConfig.data = this.weatherService.currentWeather.name;
        matDialogConfig.panelClass = 'custom-modalbox';

        let g = this.matDialog.open(CitiesComponent, matDialogConfig);
        g.afterClosed().subscribe(result => {
            let city = result;
            this.weatherService.getDataByCityName('weather', city).subscribe((data) => {
                this.weather = data;
                this.setData(this.weather);
                this.weatherService.background = this.background();
                this.currentWeather = this.weatherService.currentWeather;
                this.weatherService.getDataByCityName("forecast", city).subscribe((data) => {
                    this.foreCast = data;
                    this.weatherService.foreCastArray = this.setDataForeCast(this.foreCast.list);
                    this.foreCastArray = this.weatherService.foreCastArray;
                });
            })
        })
    }
    /**
     Show day's details
     */
    showDetails(data: any) {
        this.weatherService.setDetails(data);
        this.router.navigate(["home/details", this.weatherService.currentWeather.name]);
    }
    /**
     change the background depends on the day description
     */
    background() {
        if (this.currentWeather.description.search('rain') != -1)
            return 'url(' + 'https://scontent.fjrs11-1.fna.fbcdn.net/v/t1.15752-9/82477750_787917458369370_7153681306126123008_n.png?_nc_cat=109&_nc_ohc=jTPCxVzXgSMAX8JVNqI&_nc_ht=scontent.fjrs11-1.fna&oh=7360ca6d6ec5da8404eb189efb18f5ef&oe=5EDAD222' + ')';
        else if (this.currentWeather.description.search('snow') != -1)
            return 'url(' + 'https://scontent.fjrs2-1.fna.fbcdn.net/v/t1.15752-9/82941078_510368736262289_4687722160930684928_n.png?_nc_cat=106&_nc_ohc=SWsJ1fLZpqsAX_F6fwp&_nc_ht=scontent.fjrs2-1.fna&oh=17bf8b4bf6568e20100b31a46f4a51a0&oe=5E8F51DE' + ')';
        else if (this.currentWeather.description == 'clear sky')
            return 'url(' + 'https://scontent.fjrs11-1.fna.fbcdn.net/v/t1.15752-9/83260132_578924512688994_657297770595483648_n.png?_nc_cat=111&_nc_ohc=AT8FPUDG3KIAX_Iw-IX&_nc_ht=scontent.fjrs11-1.fna&oh=9911595d4e24bfa29409e535ff1701f5&oe=5E96E5E8' + ')';
        else if (this.currentWeather.description.search('mist') != -1)
            return 'url(' + 'https://scontent.fjrs11-1.fna.fbcdn.net/v/t1.15752-9/82603676_254561648857113_8323517160743763968_n.png?_nc_cat=108&_nc_ohc=7pehXxgLQ1EAX92cnvE&_nc_ht=scontent.fjrs11-1.fna&oh=7dca208fb69a8d0addcf1d2a64592541&oe=5ED4DE4C' + ')';
        else if (this.currentWeather.description.search('clouds') != -1)
            return 'url(' + 'https://scontent.fjrs11-1.fna.fbcdn.net/v/t1.15752-9/82209072_200519761125359_9207814132005339136_n.png?_nc_cat=110&_nc_ohc=5dHERwjQshMAX_nKGF2&_nc_ht=scontent.fjrs11-1.fna&oh=30374abafd009a67ffdff648cef3b53c&oe=5ED68DB4' + ')';
        return 'url(' + 'https://scontent.fjrs11-1.fna.fbcdn.net/v/t1.15752-9/83100427_312609046354190_2374057707033329664_n.png?_nc_cat=105&_nc_ohc=1LKUscAsPj4AX9P0tvo&_nc_ht=scontent.fjrs11-1.fna&oh=af66f84cb61fa105c915d8bf29d7ee44&oe=5ED5330C' + ')';

    }
}