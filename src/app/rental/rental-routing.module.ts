import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RentalComponent } from './rental.component';
import {RentalListComponent} from "./rental-list/rental-list.component";
import {RentalDetailComponent} from "./rental-detail/rental-detail.component";


const routes: Routes = [
  {path: 'rentals', component: RentalComponent,
    children: [
      {path: '', component: RentalListComponent},
      {path: ':rentalId', component: RentalDetailComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentalRoutingModule { }
