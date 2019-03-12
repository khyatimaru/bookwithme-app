import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageComponent } from './manage.component';
import { ManageBookingComponent } from './manage-booking/manage-booking.component';
import { ManageRentalComponent } from './manage-rental/manage-rental.component';

import { AuthGuard } from '../auth/shared/auth.guard';


const routes: Routes = [
  {path: 'manage', component: ManageComponent,
    children: [
      {path: 'bookings', component: ManageBookingComponent, canActivate: [AuthGuard]},
      {path: 'rentals', component: ManageRentalComponent, canActivate: [AuthGuard]}
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
