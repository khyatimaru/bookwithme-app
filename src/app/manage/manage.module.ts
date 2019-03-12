import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRoutingModule } from './manage-routing.module';

import { ManageComponent } from './manage.component';
import { ManageBookingComponent } from './manage-booking/manage-booking.component';
import { ManageRentalComponent } from './manage-rental/manage-rental.component';
import { ManageRentalBookingComponent } from './manage-rental/manage-rental-booking/manage-rental-booking.component';

import { RentalService } from '../rental/shared/rental.service';
import { BookingService } from '../booking/shared/booking.service';
import { NgPipesModule } from 'ngx-pipes';
import { FormatDatePipe } from '../common/pipes/format-date.pipes';

import { AuthGuard } from '../auth/shared/auth.guard';

@NgModule({
  declarations: [
    ManageComponent,
    ManageBookingComponent,
    ManageRentalComponent,
    FormatDatePipe,
    ManageRentalBookingComponent

  ],
  providers: [
    RentalService,
    BookingService
  ],
  imports: [
    CommonModule,
    ManageRoutingModule,
    NgPipesModule
  ]
})

export class ManageModule {}
