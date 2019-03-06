import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentalRoutingModule } from './rental-routing.module';
import { RentalComponent } from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalService } from './shared/rental.service';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { NgPipesModule } from 'ngx-pipes';
import { UppercasePipe } from '../common/pipes/uppercase.pipes';

import { MapModule } from '../common/map/map.module';
import { Daterangepicker } from 'ng2-daterangepicker';

import { AuthGuard } from '../auth/shared/auth.guard';
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';


@NgModule({
  declarations: [
    RentalListComponent,
    RentalListItemComponent,
    RentalComponent,
    RentalDetailComponent,
    UppercasePipe,
    RentalDetailBookingComponent
  ],
  providers: [
    RentalService
  ],
  imports: [
    CommonModule,
    RentalRoutingModule,
    HttpClientModule,
    NgPipesModule,
    MapModule,
    Daterangepicker
  ]
})

export class RentalModule {}
