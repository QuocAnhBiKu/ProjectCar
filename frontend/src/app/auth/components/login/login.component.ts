import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isSpinning:boolean=false;
  loginForm!: FormGroup;

  constructor(private fb:FormBuilder,
    private authService:AuthService,
    private router:Router,
    private message: NzMessageService
  ){}

  ngOnInit() {
    this.loginForm =this.fb.group({
        email:[null,[Validators.email,Validators.required]],
        password:[null,[Validators.required]],
    })
  }

  login() {
    this.isSpinning = true;
  
    try {
      this.authService.login(this.loginForm.value).subscribe(
        (res) => {
          console.log(res);
          if (res.userId != null) {
            const user = {
              id: res.userId,
              role: res.userRole
            };
            StorageService.saveUser(user);
            StorageService.saveToken(res.jwt);
            if (StorageService.isAdminLoggedIn()) {
              this.router.navigateByUrl("admin/dashboard");
            } else if (StorageService.isUserLoggedIn()) {
              this.router.navigateByUrl("/customer/dashboard");
            }
          } else {
            this.message.error("Invalid email or password", { nzDuration: 5000 });
          }
        },
        (error) => {
          // Xử lý lỗi từ yêu cầu HTTP
          this.message.error("Invalid email or password", { nzDuration: 5000 });
          this.isSpinning = false;
        }
      );
    } catch (error : any) {
      // Xử lý ngoại lệ khác
      this.message.error(error.message, { nzDuration: 5000 });
      this.isSpinning = false;
    }
  }

}
