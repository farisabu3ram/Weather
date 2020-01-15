import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
  allcities: any;
  cities: any;
  filterdCity: any;
  lat;
  lon;
  name: string;
  onKey(event) {
    this.name = event.target.value;
    this.filterdCity = this.filter(this.name);
  }
  filter(name) {
    return this.cities.filter(city=>
      city.name.toLowerCase().indexOf(name.toLowerCase())!==-1);
  }

  constructor(private weatherService: WeatherService, private routeParmCtrl: ActivatedRoute) {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition((success) => {
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude
        this.weatherService.getNearCities(this.lat, this.lon,50).subscribe((data) => {
          this.allcities = data;
          this.cities = this.allcities.list;
          this.filterdCity = this.cities;

        })
      })
    }
  }

  ngOnInit() {
  }

}
