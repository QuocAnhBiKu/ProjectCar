import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  cars:any = [];

  constructor(private adminService: AdminService,
        private message : NzMessageService
  ) { }

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars(){
    this.adminService.getAllCars().subscribe((res)=>{
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

  deleteCar(id: number)
   {
    console.log(id);
    this.adminService.deleteCar(id).subscribe((res) =>{
      this.cars = this.cars.filter((car: { id: number; }) => car.id !== id);
      this.getAllCars();
      this.message.success("Car deleted successfully",{nzDuration:5000});
    })
  }

}
