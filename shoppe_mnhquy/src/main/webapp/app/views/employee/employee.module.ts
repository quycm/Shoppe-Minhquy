import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './employee.routing';
import { TableModule } from 'primeng/table';
import { TimekeeperSharedModule } from 'app/shared/shared.module';
import { UpdateEmployeeComponent } from './update-employee.component';
import { InsertEmployeeComponent } from './insert-employee.component';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SelectButtonModule } from 'primeng';

@NgModule({
  imports: [
    EmployeeRoutingModule,
    TimekeeperSharedModule,
    TableModule,
    ConfirmDialogModule,
    NgSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    SelectButtonModule
  ],
  declarations: [EmployeeComponent, UpdateEmployeeComponent, InsertEmployeeComponent],
  providers: [ConfirmationService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmployeeModule {}
