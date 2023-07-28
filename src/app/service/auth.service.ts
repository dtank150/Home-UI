import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { UserForLogin, UserForRegister } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL= environment.apiUrl;

constructor(private http:HttpClient) { }

authUser(user: UserForLogin){
  return this.http.post(this.baseURL+'/Account/Login',user);
//   let UserArray = [];
//   const storedUsers = localStorage.getItem('Users');
//   if (storedUsers) {
//     UserArray = JSON.parse(storedUsers);
//   }
//   return UserArray.find((p: { userName: any; pwd: any; }) => p.userName === user.userName && p.pwd === user.pwd);
  }
  registerUser(user:UserForRegister){
    return this.http.post(this.baseURL+'/Account/Register',user);
  }

}
