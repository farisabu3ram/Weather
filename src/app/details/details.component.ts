import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  details : any;
  constructor(private weatherService: WeatherService, private routeParmCtrl: ActivatedRoute) {
    let city = routeParmCtrl.snapshot.paramMap.get('city');
    this.weatherService.getDataByCityName(city).subscribe(data => {
      this.details = data;
    })

  }

  ngOnInit() {

  }

}
