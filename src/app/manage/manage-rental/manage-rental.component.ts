import { Component, OnInit } from '@angular/core';
import { RentalService } from '../../rental/shared/rental.service';
import { Rental } from '../../rental/shared/rental.modal';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'bookwithme-manage-rental',
  templateUrl: './manage-rental.component.html',
  styleUrls: ['./manage-rental.component.scss']
})
export class ManageRentalComponent implements OnInit {

  rentals: Rental[];
  rentalDeleteIndex: number;
  error: any[] = [];
  constructor(private rentalService: RentalService,
              private toastr: ToastrService,) { }

  ngOnInit() {

    const rentalObservable = this.rentalService.getUserRentals();

    rentalObservable.subscribe(
      (rentals: Rental[]) => {
        this.rentals = rentals;
      },
      (err) => {
      },
      () => {
      });
  }

  deleteRental (rentalId: string) {
    this.rentalService.deleteRental(rentalId);

    this.rentalService.deleteRental(rentalId).subscribe(
      () => {
        console.log("deleted");
        this.rentals.splice(this.rentalDeleteIndex, 1);
        this.rentalDeleteIndex = undefined;
      },
      (errorResponse: HttpErrorResponse) => {
        this.error = errorResponse.error.errors;
        this.toastr.error(this.error[0].detail, 'Failed');

      });

  }
}
