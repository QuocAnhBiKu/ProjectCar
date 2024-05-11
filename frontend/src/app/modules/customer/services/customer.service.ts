import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

const BASE_URL = ["http://localhost:8080"];

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAllCars(): Observable<any>{
    return this.http.get(BASE_URL + "/api/customer/cars",{
      headers: this.createAuthorizationHeader()
    })
  }
  getCarById(id: number): Observable<any> {
    return this.http.get(BASE_URL+"/api/customer/car/"+ id ,{
        headers:this.createAuthorizationHeader()
    })
  }

  bookACar(bookAcarFto: any): Observable<any> {
    const url = `${BASE_URL}/api/customer/car/book`;
    return this.http.post(url, bookAcarFto, {
      headers: this.createAuthorizationHeader()
    });
  }
  getBookingsByUserId(): Observable<any> {
    return this.http.get(BASE_URL+"/api/customer/car/bookings/"+ StorageService.getUserId() ,{
        headers:this.createAuthorizationHeader()
    });
  }
  createAuthorizationHeader(): HttpHeaders{
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    )
  }
}
