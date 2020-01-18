import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './pages/details/details.component';
import { CitiesComponent } from './pages/cities/cities.component';
import { HomeComponent } from './componant/home/home.component';
import { DetailsforecastComponent } from './pages/detailsforecast/detailsforecast.component';


const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'home/City/:city',component:DetailsComponent},
  {path:'home/cities',component:CitiesComponent},
  {path:'home/details/:city',component:DetailsforecastComponent},
  {path:'',redirectTo:'home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
