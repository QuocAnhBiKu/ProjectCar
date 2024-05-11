import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.scss']
})
export class UpdateCarComponent {

  carId: number = this.activatedRoute.snapshot.params['id'];
  isSpinning = false;
  imgChange: boolean = false;
  selectedFile: any;
  imagePreview: string | ArrayBuffer | null = null;
  existingImage: string | null = null;
  updateForm!: FormGroup;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfBrands = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"]; listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];

  constructor(private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.updateForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required],
    });
    this.getCarById();
  }
  getCarById() {
    this.isSpinning = true;
    this.adminService.getCarById(this.carId).subscribe(
      (res) => {
        this.isSpinning = false;
        const carDto = res;
        this.existingImage = 'data:image/jpeg;base64,' + res.returnedImage;
        console.log(carDto);
        this.updateForm.patchValue(carDto);
      }
    );
  }
  updateCar() {
    this.isSpinning = true;
    const formData: FormData = new FormData();
    if (this.imgChange && this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    } 
    formData.append('brand', this.updateForm.get('brand')?.value ?? '');
    formData.append('name', this.updateForm.get('name')?.value ?? '');
    formData.append('type', this.updateForm.get('type')?.value ?? '');
    formData.append('color', this.updateForm.get('color')?.value ?? '');
    formData.append('year', new Date(this.updateForm.get('year')?.value).toISOString().split('T')[0]);
    formData.append('transmission', this.updateForm.get('transmission')?.value ?? '');
    formData.append('description', this.updateForm.get('description')?.value ?? '');
    formData.append('price', this.updateForm.get('price')?.value ?? '');
    console.log(formData);
    this.adminService.updateCar(this.carId, formData).subscribe((res) => {
      this.isSpinning = false;
      this.message.success("Car updated successfully", { nzDuration: 5000 })
      this.router.navigateByUrl('/admin/dashboard');
      console.log(res);
    }, (error) => {
      this.message.error("Error while updating car", { nzDuration: 5000 })
    })
  }
  onFileSelected($event: any) {
    this.selectedFile = ($event.target as HTMLInputElement)?.files?.[0] ?? null;
    this.imgChange = true;
    if (this.selectedFile) {
      this.previewImage();
    } else {
      this.imagePreview = null;
    }
  }

  previewImage() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.existingImage = null;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
