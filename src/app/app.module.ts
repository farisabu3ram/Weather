import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componant/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { WeatherService } from './services/weather-service.service';
import { CitiesComponent } from './pages/cities/cities.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    CitiesComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule
  ],
  providers: [WeatherService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
