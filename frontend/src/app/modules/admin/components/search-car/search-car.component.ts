import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.scss']
})
export class SearchCarComponent {

  cars : any = [];
  searchCarForm!: FormGroup;
  isSpinning = false;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfBrands = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];

  constructor(private fb: FormBuilder,
    private service: AdminService,
    private message : NzMessageService,
    private router: Router
  ) {
    this.searchCarForm = this.fb.group({
      brand: [null],
      type: [null],
      transmission: [null],
      color: [null]
    });
  }

  searchCar() {
    this.isSpinning = true;
    this.service.searchCar(this.searchCarForm.value).subscribe((res)=>{
      res.carDtoList.forEach((element: { processedImg: string; returnedImage: string; }) => {
        // Tạo URL hợp lệ từ dữ liệu base64
        const imageUrl = "data:image/jpeg;base64," + element.returnedImage;
        // Thay đổi thuộc tính processedImg thành URL hợp lệ
        element.processedImg = imageUrl;
        // Thêm phần tử vào mảng
        this.cars.push(element);
      })
      this.isSpinning = false;
    })
  }

}
