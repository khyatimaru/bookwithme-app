import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RentalComponent } from './rental.component';
import {RentalListComponent} from "./rental-list/rental-list.component";
import {RentalDetailComponent} from "./rental-detail/rental-detail.component";
import {RentalSearchComponent} from "./rental-search/rental-search.component";
import {RentalCreateComponent} from "./rental-create/rental-create.component";

import { AuthGuard } from '../auth/shared/auth.guard';


const routes: Routes = [
  {path: 'rentals', component: RentalComponent,
    children: [
      {path: '', component: RentalListComponent},
      {path: 'new', component: RentalCreateComponent},
      {path: ':rentalId', component: RentalDetailComponent},
      {path: ':city/homes', component: RentalSearchComponent}

    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentalRoutingModule { }
