import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor() { }

authUser(user: any){
  let UserArray = [];
  const storedUsers = localStorage.getItem('Users');
  if (storedUsers) {
    UserArray = JSON.parse(storedUsers);
  }
  return UserArray.find((p: { userName: any; pwd: any; }) => p.userName === user.userName && p.pwd === user.pwd);
}

}
