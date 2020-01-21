import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componant/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { WeatherService } from './services/weather-service.service';
import { CitiesComponent } from './pages/cities/cities.component';
import {  MatDialogModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailsforecastComponent } from './pages/detailsforecast/detailsforecast.component';
import { LogInComponent } from './log-in/log-in.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    CitiesComponent,
    DetailsforecastComponent,
    LogInComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    

    
  ],
  providers: [WeatherService ],
  bootstrap: [AppComponent],
  entryComponents:[CitiesComponent]
})
export class AppModule { }
