import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule, TableModule, ToggleButtonModule } from 'primeng';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShiftComponent } from 'app/views/shift/shift.component';
import { ShiftRoutingModule } from 'app/views/shift/shift.routing';
import { ShiftCreateComponent } from './shift-create.component';
import { ShiftUpdateComponent } from './shift-update.component';
import { ShiftDetailComponent } from './shift-detail.component';

@NgModule({
  imports: [
    CommonModule,
    ShiftRoutingModule,
    TableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    LayoutModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CalendarModule,
    FormsModule,
    ToggleButtonModule
  ],
  declarations: [ShiftComponent, ShiftCreateComponent, ShiftUpdateComponent, ShiftDetailComponent]
})
export class ShiftModule {}
