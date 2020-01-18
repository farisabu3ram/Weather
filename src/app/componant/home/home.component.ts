import { Component, OnInit, HostBinding } from '@angular/core';
import { WeatherService } from 'src/app/services/weather-service.service';
import { foreCastForFourDays } from '../foreCastForFourDays'
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
    showDetsils(data: any) {
        this.weatherService.setDetails(data);
        this.router.navigate(["home/details", this.weatherService.currentWeather.name]);
    }
    background() {
        if (this.currentWeather.description.search('rain'))
            return 'url(' + 'https://lh3.googleusercontent.com/tz1Z6UYPbCQjCbmfPDD1Jd04X0t7igNyszYbqnDoTA1YsKlveHCwHEMSBD0dBitB7WC0uiYSdKjLCoBynm1OzfvMtpB4YMq7VtOuSRaQODjAwDG-2zuSEpl2nt89jjX3JYs62SRuMwSlhDy_dYzZF88xA7pDW8ES2psyTvONXMm5MWWNb6ZCim6GCSm64qBFVInJ6JijzVPV4Pa5KhbCh2eiy2OjjoAGzd1gzHlTZHDDrDO-AO7FUl-7pBiPTpKHN6gwfqf1Y24JhhHIqRNP4droO55LFz215WFf1V4d-czUQE98wvZ0nEK7-KmaaUU4hcpNHIc2nZqOCsSojInrClRZDG3BpEQbyNDZTQKl4kBwXvqH_LuJAqumlG4dreHDx03fLlxqWEMlJDNyN0srfDzF1v9zVhx17A-2YGcT8Hn4mx-b0Ee67y6pqiGYEc74K0GUujFKantzCGWHJZ8hm-IqIQPZdBIuel3lzJyjS0m_UjTOtVF8mWoF5RiCTZlYNeTXHXBMX6UYafU65CjYH3bLmJmhQ0ssXZfwX5Av04UxutjFOUy5PFwTLWC5fMCv6jqIwNIhaPd_HQYmdsZp02HrPGbL1-9LmJjL7hhTnYo2WdgL8ZdegAI_kVHhHb6DDLzOXjtvQkzBBZloppTpPUm74HHjItRFtpnwEjGmXh1mo8LFqqEhEKo=w580-h928-no' + ')';
        else if (this.currentWeather.description.search('Snow'))
            return 'url(' + 'https://lh3.googleusercontent.com/AuxgV76rmYMQyCzn4Vukp2qR-ct1QjzNqeJM2ypVKMZweY_ECoIWz4aec2V3pilkRZOJJABke5Ke1g-nFs346E5jfEMJRvgQs6O3knyyaHoFKaDHRzeTgFJUZH_PphLDhAPHQyMiwLmBkLT3pdXRZHTIdyh2IbJGblOtkYib49VpFuyoobdkicIXgmluRqsHDkOEmubhdwJ28PhFrbrwiAOWRofDUlpoaGQyp059XgjQLcUSaUP-XXtGTkVr3VyRQzYy-pXKzVTcV0parIA_E56RJvBRRnfP5zHLJ-POlJiBQDG-TQm9O3sv8t7YUHm3nfIUatn9UBchjN-uaZ5SlIDgqnTkhehc4PXRv1rl3D_7y5nzoPz1fMFx7dmZgKAZQLQ8X_RVLkiojpUd_4zZcEBPjeuh3iZULqwA2Aj0fDwYfBZivyI8KV8zm2ErxEKgIEGr2R8J5IpTWHspOPTddIjSKtmUFCfajJA3RtpI1T81CKR8kvfEBPCphDI72l_bCseGIgMZA7f0pLf91Ytx5_OeuAR6d3xHymvB_2zRiQQyrKt8kLz78KJeWWi9y8YwZuPTcAWe6O4slAYv96t1Uas94pnWXYWAbWjESakHR2N88fOake2m5icYqt0MmkmaP_AqJY5s1j1jPjPHH0-f-AH_ABdg4YiCfaKA1vEjTLoFLlrnbY93Uz0=s204-no' + ')';
        else if (this.currentWeather.description == 'clear sky')
            return 'url(' + 'https://scontent.fjrs11-1.fna.fbcdn.net/v/t1.15752-9/83100427_312609046354190_2374057707033329664_n.png?_nc_cat=105&_nc_ohc=1LKUscAsPj4AX9P0tvo&_nc_ht=scontent.fjrs11-1.fna&oh=af66f84cb61fa105c915d8bf29d7ee44&oe=5ED5330C' + ')';
        else if (this.currentWeather.description == 'mist')
            return 'url(' + 'https://scontent.fjrs11-1.fna.fbcdn.net/v/t1.15752-9/82603676_254561648857113_8323517160743763968_n.png?_nc_cat=108&_nc_ohc=7pehXxgLQ1EAX92cnvE&_nc_ht=scontent.fjrs11-1.fna&oh=7dca208fb69a8d0addcf1d2a64592541&oe=5ED4DE4C' + ')';
        else if (this.currentWeather.description.search('clouds'))
            return 'url(' + 'https://scontent.fjrs11-1.fna.fbcdn.net/v/t1.15752-9/82209072_200519761125359_9207814132005339136_n.png?_nc_cat=110&_nc_ohc=5dHERwjQshMAX_nKGF2&_nc_ht=scontent.fjrs11-1.fna&oh=30374abafd009a67ffdff648cef3b53c&oe=5ED68DB4' + ')';
        return 'url(' + 'https://scontent.fjrs11-1.fna.fbcdn.net/v/t1.15752-9/83260132_578924512688994_657297770595483648_n.png?_nc_cat=111&_nc_ohc=AT8FPUDG3KIAX_Iw-IX&_nc_ht=scontent.fjrs11-1.fna&oh=9911595d4e24bfa29409e535ff1701f5&oe=5E96E5E8' + ')';
    }
}