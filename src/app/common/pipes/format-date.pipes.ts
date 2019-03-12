import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { Booking } from '../../booking/shared/booking.model'

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: string): string {
    return moment(value).format(Booking.DATE_FORMAT);
  }

}
