import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { CitiesComponent } from './cities/cities.component';


const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'home/City/:city',component:DetailsComponent},
  {path:'home/cities',component:CitiesComponent},
  {path:'',redirectTo:'home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
