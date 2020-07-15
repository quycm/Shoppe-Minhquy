export interface IPosition{
    id ?: any;
    name ?: string;
    status ?: any;
    tkid ?: any;
    gender ?: any;
    address ?: string;
    startdate ?: Date;
    enddate ?: Date;
    dob ?: Date;
    phone ?: string;
    email ?: string;
    numberid ?: string;
    religion ?: string;
    privilege ?: any;
    cardid ?: any;
    password ?: string;
    enabled ?: any;
    departmentid ?: any;
    positionid ?: any;
    folkid ?: any;
    scheduleid ?: any;
    createdBy?: string;
    createdDate?: Date;
    lastModifiedBy?: string;
    lastModifiedDate?: Date;
 
}

export class Position implements IPosition {
   
   constructor(
      public id ?: any,
      public name?: string,
      public status ?: any,
      public tkid ?: any,
      public gender ?: any,
      public address ?: string,
      public startdate ?: Date,
      public enddate ?: Date,
      public dob ?: Date,
      public phone ?: string,
      public email ?: string,
      public numberid ?: string,
      public religion ?: string,
      public privilege ?: any,
      public cardid ?: any,
      public password ?: string,
      public enabled ?: any,
      public departmentid ?: any,
      public positionid ?: any,
      public folkid ?: any,
      public scheduleid ?: any,
      public createdBy?: string,
      public createdDate?: Date,
      public lastModifiedBy?: string,
      public lastModifiedDate?: Date,
   ) {
     this.id = id ? id : null;
     this.name = name ? name : null;
     this.status = status ? status : null;
     this.tkid = tkid ? tkid : null;
     this.gender = gender ? gender : null;
     this.address = address ? address : null;
     this.startdate = startdate ? startdate : null;
     this.enddate = enddate ? enddate : null;
     this.dob = dob ? dob : null;
     this.phone = phone ? phone : null;
     this.email = email ? email : null;
     this.numberid = numberid ? numberid : null;
     this.religion = religion ? religion : null;
     this.privilege = privilege ? privilege : null;
     this.cardid = cardid ? cardid : null;
     this.password = password ? password : null;
     this.enabled = enabled ? enabled : null;
     this.departmentid = departmentid ? departmentid : null;
     this.positionid = positionid ? positionid : null;
     this.folkid = folkid ? folkid : null;
     this.scheduleid = scheduleid ? scheduleid : null;
     this.createdBy = createdBy ? createdBy : null;
     this.createdDate = createdDate ? createdDate : null;
     this.lastModifiedBy = lastModifiedBy ? lastModifiedBy : null;
     this.lastModifiedDate = lastModifiedDate ? lastModifiedDate : null;
   }
 }