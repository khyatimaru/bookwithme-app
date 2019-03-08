import { Rental } from '../../rental/shared/rental.modal'

export class Booking {

  static readonly DATE_FORMAT = 'Y/MM/DD';

  _id: string;
  startAt: string;
  endAt: string;
  totalPrice: number;
  days: number;
  guests: number;
  createdAt: string;
  rental: Rental;
}
