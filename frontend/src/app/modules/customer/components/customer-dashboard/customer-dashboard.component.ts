import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent implements OnInit {
  cars: any = [];

  constructor(private customerService:CustomerService) { }

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars(){
      this.customerService.getAllCars().subscribe((res)=>{
        console.log(res);
        res.forEach((element: { processedImg: string; returnedImage: string; }) => {
          // Tạo URL hợp lệ từ dữ liệu base64
          const imageUrl = "data:image/jpeg;base64," + element.returnedImage;
          // Thay đổi thuộc tính processedImg thành URL hợp lệ
          element.processedImg = imageUrl;
          // Thêm phần tử vào mảng
          this.cars.push(element);
        })
      })
  }

}
