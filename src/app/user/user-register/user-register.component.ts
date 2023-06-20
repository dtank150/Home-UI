import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { AlertifyService } from 'src/app/service/alertify.service';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registrationForm!: FormGroup;
  user!: User;
  userSubmited!: boolean;

  constructor(private fb: FormBuilder, private userService:UserService, private alertify:AlertifyService) { }

  ngOnInit() {
    // this.registrationForm = new FormGroup({
    //   userName: new FormControl(null, [Validators.required]),
    //   email: new FormControl(null, [Validators.required, Validators.email]),
    //   pwd: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    //   cpwd: new FormControl(null, [Validators.required]),
    //   mobile: new FormControl(null, [Validators.required, Validators.maxLength(10)])
    // },this.passwordMatchingValidatior);
    this.createRegistrationForm();
  }

  createRegistrationForm(){
    this.registrationForm = this.fb.group({
      userName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      pwd: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      cpwd: new FormControl(null, [Validators.required]),
      mobile: new FormControl(null, [Validators.required, Validators.maxLength(10)])
    },{Validators:this.passwordMatchingValidatior})
  }

  passwordMatchingValidatior(fg: FormGroup): Validators |null  {
    return fg.get('pwd')?.value === fg.get('cpwd')?.value ? null :
        {notmatched: true};
}

get userName(){
  return this.registrationForm.get('userName') as FormControl;
}
get email(){
  return this.registrationForm.get('email') as FormControl;
}
get pwd(){
  return this.registrationForm.get('pwd') as FormControl;
}
get cpwd(){
  return this.registrationForm.get('cpwd') as FormControl;
}
get mobile(){
  return this.registrationForm.get('mobile') as FormControl;
}
  onSubmit(){
    console.log(this.registrationForm);
    this.userSubmited =true;
    if(this.registrationForm.valid){
      //this.user = Object.assign(this.user, this.registrationForm.value);
      this.userService.addUser(this.userData());
      this.registrationForm.reset();
      this.userSubmited = false;
      this.alertify.success("Congrats,  You are successfully registerd");
    }
    else{
      this.alertify.error("Kindly Provide Required Field");
    }

  }
  userData(): User{
    return this.user = {
      userName: this.userName.value,
      email:this.email.value,
      pwd:this.pwd.value,
      mobile:this.mobile.value
    }
  }



}
