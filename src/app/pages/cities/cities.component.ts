import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather-service.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material';



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
    return this.cities.filter(city =>
      city.name.toLowerCase().indexOf(name.toLowerCase()) !== -1);
  }

  constructor(private weatherService: WeatherService, private routeParmCtrl: ActivatedRoute, public matDialogRef: MatDialogRef<CitiesComponent>) {

  }

  ngOnInit() {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition((success) => {
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude
        this.weatherService.getWeatherDateByCoords('find', this.lat, this.lon).subscribe((data) => {
          this.allcities = data;
          this.cities = this.allcities.list;
          this.filterdCity = this.cities;
        })
      })
    }
  }
  onClose(city) {
    this.matDialogRef.close(city);
  }

}
