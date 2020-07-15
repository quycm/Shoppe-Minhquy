export interface ICompany{
    id ?: any;
    name ?: string;
    status ?: any;
    createdBy?: string;
    createdDate?: Date;
    lastModifiedBy?: string;
    lastModifiedDate?: Date;
 
}

export class Company implements ICompany {
   
   constructor(
      public id ?: any,
      public name?: string,
      public status ?: any,
      public createdBy?: string,
      public createdDate?: Date,
      public lastModifiedBy?: string,
      public lastModifiedDate?: Date,
   ) {
     this.id = id ? id : null;
     this.name = name ? name : null;
     this.status = status ? status : null;
     this.createdBy = createdBy ? createdBy : null;
     this.createdDate = createdDate ? createdDate : null;
     this.lastModifiedBy = lastModifiedBy ? lastModifiedBy : null;
     this.lastModifiedDate = lastModifiedDate ? lastModifiedDate : null;
   }
 }
 

