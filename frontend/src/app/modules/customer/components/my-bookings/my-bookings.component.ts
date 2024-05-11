import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent {

  bookings: any;
  isSpinning= false;

  constructor(private customerService: CustomerService) { }

  ngOnInit(){
    this.getMyBookings();
  }

  getMyBookings(){
    this.customerService.getBookingsByUserId().subscribe((res)=>{
      this.isSpinning = false;
      console.log(res);
      this.bookings = res;
    })
  }

}
