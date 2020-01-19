import { Component, OnInit, Inject } from '@angular/core';
import { WeatherService } from '../../services/weather-service.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'


@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
  allcities: any;
  cities: any;
  filterdCity: any;
  weather: any;
  lat: number;
  lon: number;
  name: string;
  onKey(event) {
    this.name = event.target.value;
    this.filterdCity = this.filter(this.name);
  }
  filter(name) {
    return this.cities.filter(city =>
      city.name.toLowerCase().indexOf(name.toLowerCase()) !== -1);
  }

  constructor(private weatherService: WeatherService, private routeParmCtrl: ActivatedRoute, public matDialogRef: MatDialogRef<CitiesComponent>, @Inject(MAT_DIALOG_DATA) public city: any) {

  }

  ngOnInit() {
    this.weatherService.getDataByCityName('weather', this.city).subscribe((data) => {
      this.weather = data;
      this.lat = this.weather.coord.lat;
      this.lon = this.weather.coord.lon;
      this.weatherService.getWeatherDateByCoords('find', this.lat, this.lon).subscribe((data) => {
        this.allcities = data;
        this.cities = this.allcities.list;
        this.filterdCity = this.cities;
      })
    })
  }
  background(){
    return this.weatherService.background;
  }
  onClose(city) {
    this.matDialogRef.close(city);
  }
 
}
