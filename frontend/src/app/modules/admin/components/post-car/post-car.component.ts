import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-car',
  templateUrl: './post-car.component.html',
  styleUrls: ['./post-car.component.scss']
})
export class PostCarComponent {

postCarForm!: FormGroup;
isSpinning: boolean = false;
selectedFile: File | null= null;
imagePreview: string | ArrayBuffer | null=null;
listOfOption: Array<{ label: string; value: string }> = [];
listOfBrands = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"]; 
listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
listOfTransmission = ["Manual", "Automatic"];

constructor(private fb :FormBuilder,
    private adminService:AdminService,
    private message : NzMessageService,
    private router : Router
){}
ngOnInit(){
  this.postCarForm = this.fb.group({
    name: [null, Validators.required],
    brand: [null, Validators.required],
    type: [null, Validators.required],
    color: [null, Validators.required],
    transmission: [null, Validators.required],
    price: [null, Validators.required],
    description: [null, Validators.required],
    year: [null, Validators.required],
  });
}
postCar(){
  console.log(this.postCarForm.value);
  this.isSpinning = true;
  const formData: FormData = new FormData();
  if (this.selectedFile !== null) {
    formData.append('image', this.selectedFile, this.selectedFile.name);
  }
  formData.append('brand', this.postCarForm.get('brand')?.value ?? '');
  formData.append('name', this.postCarForm.get('name')?.value ?? '');
  formData.append('type', this.postCarForm.get('type')?.value ?? '');
  formData.append('color', this.postCarForm.get('color')?.value ?? '');
  formData.append('year', new Date(this.postCarForm.get('year')?.value).toISOString().split('T')[0]);
  formData.append('transmission', this.postCarForm.get('transmission')?.value ?? '');
  formData.append('description', this.postCarForm.get('description')?.value ?? '');
  formData.append('price', this.postCarForm.get('price')?.value ?? '');
  console.log(formData);
  this.adminService.postCar(formData).subscribe((res)=>{
    this.isSpinning = true;
    this.message.success("Car posted successfully", {nzDuration : 5000})
    this.router.navigateByUrl('/admin/dashboard');
    console.log(res);
  },error =>{
    this.message.error("Error while posting car",{nzDuration:5000})
  })

}

onFileSelected($event: any) {
  this.selectedFile = ($event.target as HTMLInputElement)?.files?.[0] ?? null;
  if (this.selectedFile) {
    this.previewImage();
  }
}
previewImage() {
  if (this.selectedFile) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }
}
}