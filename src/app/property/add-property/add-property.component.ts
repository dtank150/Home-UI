import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IPropertyBase } from 'src/app/model/Ipropertybase';


@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

 // @ViewChild('Form') addPropertyForm!:NgForm;
  @ViewChild('formTabs') formTabs!: TabsetComponent;
  addPropertyForm!: FormGroup;

//will come from masters
  propertyTypes: Array<string> = ["House", "Apartment", "Duplex"]
  furnishTypes: Array<string> = ["Fully", "Semi", "Unfurnished"]

  propertyView: IPropertyBase = {
    Id: '',
    Name: '',
    Price: '',
    SellRent: '',
    PType: '',
    FType: '',
    BHK: '',
    BuiltArea: '',
    City: '',
    RTM: ''
  };



  constructor(private fb: FormBuilder ,private router:Router) { }

  ngOnInit() {
    this.CreateAddPropertyForm();
  }

  CreateAddPropertyForm(){
    this.addPropertyForm = this.fb.group({
      SellRent: [null, Validators.required],
      PType: [null, Validators.required],
      Name: [null, Validators.required],
      Price: [null, Validators.required],
      BuiltArea: [null, Validators.required]
    })
  }

  onBack(){
    this.router.navigate(['/']);
  }
  onSubmit(){
    console.log("Form Submited....");
    console.log("SellRent= " + this.addPropertyForm.value.BasicInfo.SellRent);
    console.log(this.addPropertyForm);
  }
  selectTab(tabId: number) {

      this.formTabs.tabs[tabId].active = true;
    }

}
