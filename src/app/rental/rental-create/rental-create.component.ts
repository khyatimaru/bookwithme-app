import { Component, OnInit } from '@angular/core';
import { Rental } from '../shared/rental.modal';
import { RentalService } from '../shared/rental.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'bookwithme-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.scss']
})
export class RentalCreateComponent implements OnInit {

  newRental: Rental;
  errors: any[] = [];
  rentalCategories = Rental.CATEGORIES;

  constructor(private rentalService: RentalService,
  private router: Router) { }

  ngOnInit() {
    this.newRental = new Rental;
    this.newRental.shared = false;
  }

  handleImageChange() {
    this.newRental.image = "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/13/image.jpeg";
  }
  createRental() {
    this.rentalService.createRental(this.newRental).subscribe(
      (rental: Rental) => {
        this.router.navigate([`/rentals/${rental._id}`]);
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
      });

  }
}
