import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule, TableModule } from 'primeng';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';
import { TimesheetRoutingModule } from 'app/views/timesheet/timesheet-routing.module';
import { TimesheetComponent } from 'app/views/timesheet/timesheet.component';
import { TimesheetCreateComponent } from 'app/views/timesheet/timesheet-create.component';
import { TimesheetUpdateComponent } from 'app/views/timesheet/timesheet-update.component';

@NgModule({
  imports: [
    CommonModule,
    TimesheetRoutingModule,
    TableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    LayoutModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatSelectModule,
    NgSelectModule,
    CalendarModule
  ],
  declarations: [TimesheetComponent, TimesheetCreateComponent, TimesheetUpdateComponent]
})
export class TimesheetModule {}
