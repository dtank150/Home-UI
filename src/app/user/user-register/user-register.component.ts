import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserForRegister } from 'src/app/model/user';

import { AlertifyService } from 'src/app/service/alertify.service';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})

export class UserRegisterComponent implements OnInit {

  registrationForm!:FormGroup;
  user!: UserForRegister;
  userSubmited!: boolean;

  constructor(private fb: FormBuilder, private Service:AuthService, private alertify:AlertifyService) { }

  ngOnInit(): void {
    this.createRegister();
  }

  createRegister() {
    this.registrationForm = this.fb.group({
      userName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern("[a-zA-Z].*")]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
      cpwd: new FormControl(null, [Validators.required]),
      mobile: new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.pattern("[0-9]*")])
    }, { validators: UserRegisterComponent.PasswordMatchingValidators });
  }

  static PasswordMatchingValidators(fg: FormGroup): ValidationErrors | null {
    return fg.get('password')?.value === fg.get('cpwd')?.value ? null : { notmatched: true };
  }

  get userName():FormControl{
    return this.registrationForm.get("userName") as FormControl;
  }

  get Email():FormControl{
    return this.registrationForm.get("email") as FormControl;
  }

  get mobile(): FormControl {
    return this.registrationForm.get("mobile") as FormControl;
  }

  get password():FormControl{
    return this.registrationForm.get("password") as FormControl;
  }

  get Cpwd():FormControl{
    return this.registrationForm.get("cpwd") as FormControl;
  }

  onSubmit(){
        console.log(this.registrationForm);
        this.userSubmited =true;
        if(this.registrationForm.valid){
          //this.user = Object.assign(this.user, this.registrationForm.value);
          this.Service.registerUser(this.userData()).subscribe(() => {
            this.registrationForm.reset();
          this.userSubmited = false;
          this.alertify.success("Congrats,  You are successfully registerd");
          });
        }
      }
  userData(): UserForRegister{
        return this.user = {
          userName: this.userName.value,
          email:this.Email.value,
          password:this.password.value,
          mobile:this.mobile.value
        }
      }
}
