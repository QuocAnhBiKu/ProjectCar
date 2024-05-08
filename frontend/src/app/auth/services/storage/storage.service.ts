import { Injectable } from '@angular/core';

const TOKEN = "token";
const USER = "user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  static saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN,token);
  }
  static saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER,JSON.stringify(user));
  }

  static getToken(){
    return window.localStorage.getItem(TOKEN);
  }

  static getUser(): any{
    const userStr = localStorage.getItem(USER);
    if (userStr === null) {
      return null; // or you can return an empty object {} if you prefer
    }
    return JSON.parse(userStr);
  }
  
  static getUserRole():string{
    const user = this.getUser();
    if(user === null){
      return "";
    }
    return user.role;
  }

  static isAdminLoggedIn(): boolean {
    if(this.getToken()== null) return false;
    const role: string = this.getUserRole();
    return role == "ADMIN";
  }

  static isUserLoggedIn(): boolean {
    if(this.getToken()== null) return false;
    const role: string = this.getUserRole();
    return role == "USER";
  }

  static logout(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
