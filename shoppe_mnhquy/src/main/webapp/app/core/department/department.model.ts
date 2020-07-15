export interface IDepartment{
    id ?: any;
    name ?: string;
    status ?: any;
    parentid ?: any;
    employeeid ?: any;
    companyid ?: any;
    createdBy?: string;
    createdDate?: Date;
    lastModifiedBy?: string;
    lastModifiedDate?: Date;
 
}

export class Department implements IDepartment {
   
   constructor(
      public id ?: any,
      public name?: string,
      public status ?: any,
      public parentid ?: any,
      public employeeid ?: any,
      public companyid ?: any,
      public createdBy?: string,
      public createdDate?: Date,
      public lastModifiedBy?: string,
      public lastModifiedDate?: Date,
   ) {
     this.id = id ? id : null;
     this.name = name ? name : null;
     this.status = status ? status : null;
     this.parentid = parentid ? parentid : null;
     this.employeeid = employeeid ? employeeid : null;
     this.companyid = companyid ? companyid : null;
     this.createdBy = createdBy ? createdBy : null;
     this.createdDate = createdDate ? createdDate : null;
     this.lastModifiedBy = lastModifiedBy ? lastModifiedBy : null;
     this.lastModifiedDate = lastModifiedDate ? lastModifiedDate : null;
   }
 }