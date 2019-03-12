import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../booking/shared/booking.service'
import { Booking } from '../../booking/shared/booking.model';
import * as moment from 'moment';

@Component({
  selector: 'bookwithme-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.scss']
})
export class ManageBookingComponent implements OnInit {

  bookings: Booking[];

  constructor(private bookingService: BookingService) { }

  ngOnInit() {

    const bookingObservable = this.bookingService.getUserBookings();

    bookingObservable.subscribe(
      (bookings: Booking[]) => {
        this.bookings = bookings;
      },
      (err) => {
      },
      () => {
      });
  }

}
