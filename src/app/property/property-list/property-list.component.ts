import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { IPropertyBase } from 'src/app/model/Ipropertybase';
import { HousingService } from 'src/app/service/housing.service';


@Component({
    selector: 'app-property-list',
    templateUrl: './property-list.component.html',
    styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
    SellRent = 1;
    properties!: IPropertyBase[];
    Today = new Date();
    City = '';
    SearchCity = '';
    SortbyParam = '';
    SortDirection = 'asc';

    constructor(private route: ActivatedRoute, private housingService: HousingService) { }

    ngOnInit(): void {
        if (this.route.snapshot.url.toString()) {
            this.SellRent = 2; // Means we are on rent-property URL else we are on base URL
        }
        this.housingService.getAllProperties(this.SellRent).subscribe(
            data => {
                this.properties = data;
                // const newProperty = JSON.parse(localStorage.getItem('newProp')!);
                // if(newProperty.SellRent == this.SellRent){
                //   this.properties = [newProperty, ...this.properties];
                // }
                console.log(data);
            }, error => {
                console.log('httperror:');
                console.log(error);
            }
        );
    }
    OnFilter(){
      this.SearchCity = this.City;
    }
    OnClear(){
      this.SearchCity = '';
      this.City = '';
    }
    OnSort(){
      if(this.SortDirection === 'desc'){
        this.SortDirection = 'asc';
      }
      else{
        this.SortDirection ='desc';
      }
    }

}
