import { IPropertyBase } from "./Ipropertybase";

export class Property implements IPropertyBase{
  Id?: number;
  SellRent?: number;
  Name!: string;
  FType!: string;
  PType!: string;
  BHK?: number;
  BuiltArea?: number;
  CarpetArea?:number;
  Address!:string;
  Address2?:string;
  City!: string;
  FloorNo?:string;
  TotalFloor?:string;
  RTM!: string;
  AOP?:string;
  MainEntrance?:string;
  Security?:number;
  Gated?:number;
  Maintenance?:number;
  Possession?:string;
  Price?: number;
  Image?: string;
  Description?:string;
  PostedOn!:string;
  PostedBy?:number

}
