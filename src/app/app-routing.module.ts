import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { CitiesComponent } from './cities/cities.component';
import { ResolveService } from './resolve.service';
import { ResolveForeCastService } from './resolve-fore-cast.service';


const routes: Routes = [
  {path:'home',component:HomeComponent,resolve:{weather:ResolveService,foreCast:ResolveForeCastService}},
  {path:'home/City/:city',component:DetailsComponent},
  {path:'home/cities',component:CitiesComponent},
  {path:'',redirectTo:'home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
