import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Property } from '../model/property';
import {environment} from '../../environment/environment';
import { Ikeyvaluepair } from '../model/Ikeyvaluepair';


@Injectable({
  providedIn: 'root'
})
export class HousingService {

  baseUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  getAllCities():Observable<string[]>{
    return this.http.get<string[]>(this.baseUrl + '/City');
  }
  getPropertyTypes():Observable<Ikeyvaluepair[]>{
    return this.http.get<Ikeyvaluepair[]>(this.baseUrl + '/PropertyType/list');
  }
  getFurnishingTypes():Observable<Ikeyvaluepair[]>{
    return this.http.get<Ikeyvaluepair[]>(this.baseUrl + '/FurnishingType/List');
  }

  getProperty(id: number){
    return this.http.get<Property>(this.baseUrl + '/Property/Detail/'+id.toString());
    // return this.getAllProperties(1).pipe(
    //   map(propertiesArray => {
    //     //throw new Error('Some error');
    //     return propertiesArray.find(p => p.id === id);
    //   })
    // );
  }

  getAllProperties(SellRent?:number):Observable<Property[]>{
    return this.http.get<Property[]>(this.baseUrl + '/Property/List/'+SellRent?.toString());
    // return this.http.get('data/properties.json').pipe(
    //   map((data:any) => {
    //       const propertiesArray: Array<Property> = [];
    //       const localProperties = JSON.parse(localStorage.getItem('newProp')!);
    //       if(localProperties){
    //         for(const id in localProperties){
    //           if(SellRent){
    //           if(localProperties.hasOwnProperty(id) && localProperties[id].SellRent === SellRent){
    //             propertiesArray.push(localProperties[id]);
    //           }
    //         }else{
    //           propertiesArray.push(localProperties[id]);
    //         }
    //       }
    //       }
    //       for(const id in data){
    //         if(SellRent){
    //         if(data.hasOwnProperty(id) && data[id].SellRent === SellRent){
    //           propertiesArray.push(data[id])
    //         }
    //       }else{
    //         propertiesArray.push(data[id])
    //       }

    //       }
    //       return propertiesArray;
    //   })
    // );
    // return this.http.get<Property[]>('data/properties.json');
  }
  addProperty(property:Property){
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.post(this.baseUrl + '/Property/Add', property,httpOptions);
    // let newProp = [property];
    // //Add new property in array if newProp alredy exists in local storage
    // if(localStorage.getItem('newProp')){
    //   newProp = [property, ...JSON.parse(localStorage.getItem('newProp')!)];
    // }

    // localStorage.setItem('newProp',JSON.stringify(newProp));
  }
  newPropID() {
    if(localStorage.getItem('PID')){
      localStorage.setItem('PID', String(+localStorage.getItem('PID')! + 1));
      return +localStorage.getItem('PID')!;
    }else{
      localStorage.setItem('PID', '101');
      return 101;
    }

  }
  getPropertyAge(dateofEstablishment: Date):string{
    const today = new Date();
    const estDate = new Date(dateofEstablishment);
    let age = today.getFullYear() - estDate.getFullYear();
    const m = today.getMonth() - estDate.getMonth();

    //current month smaller than establishment month or
    //same month but current date smaller than establishment date
    if(m < 0 || (m === 0 && today.getDate() < estDate.getDate())){
      age--;
    }
    //Establshment date is future date
    if(today < estDate){
      return '0';
    }
    //Age is less than a year
    if(age === 0){
      return 'Less than a year';
    }
    return age.toString();
  }
  setPrimaryPhoto(propertyId: number, propertyPhotoId: string) {
    const httpOptions = {
        headers: new HttpHeaders({
            Authorization: 'Bearer '+ localStorage.getItem('token')
        })
    };
    return this.http.post(this.baseUrl + '/Property/Add/'+String(propertyId)
        +'/'+propertyPhotoId, {}, httpOptions);
}

deletePhoto(propertyId: number, propertyPhotoId: string) {
    const httpOptions = {
        headers: new HttpHeaders({
            Authorization: 'Bearer '+ localStorage.getItem('token')
        })
    };
    return this.http.delete(this.baseUrl + '/Property/Delete/'
        +String(propertyId)+'/'+propertyPhotoId, httpOptions);
}
}
