import { IPropertyBase } from "./Ipropertybase";
import { Photo } from "./Photo";

export class Property implements IPropertyBase{
  id?: number;
  sellRent?: number;
  name!: string;
  propertyTypeId?:number;
  propertyType!: string;
  furnishingTypeId?:number;
  furnishingType!: string;
  bhk?: number;
  builtArea?: number;
  carpetArea?:number;
  address!:string;
  address2?:string;
  cityId?:number;
  city!: string;
  floorNo?:string;
  totalFloors?:string;
  readyToMove!:boolean;
  age?:string;
  mianEntrance?:string;
  security?:number;
  gated?:boolean;
  maintenance?:number;
  estPossessionOn!:string;
  price?: number;
  photo?: string;
  description?:string;
  PostedOn!:string;
  PostedBy?:number;
  photos?: Photo[];

}
