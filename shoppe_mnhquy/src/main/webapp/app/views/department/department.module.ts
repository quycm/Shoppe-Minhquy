import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DepartmentComponent } from './department.component';
import { DepartmentRoutingModule } from './department.routing';
import { TableModule } from 'primeng/table';
import { TimekeeperSharedModule } from 'app/shared/shared.module';
import { UpdateDepartmentComponent } from './update-department.component';
import { InsertDepartmentComponent } from './insert-department.component';
import { ConfirmationService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
    imports: [
        DepartmentRoutingModule,
        TimekeeperSharedModule,
        TableModule,
        ConfirmDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatSortModule,
       
      
    ],
    declarations: [DepartmentComponent, UpdateDepartmentComponent,InsertDepartmentComponent],
    providers: [ConfirmationService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  
})
export class DepartmentModule {}
