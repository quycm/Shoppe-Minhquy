import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RawDataRoutingModule } from 'app/views/raw-data/raw-data-routing.module';
import { RawDataComponent } from 'app/views/raw-data/raw-data.component';
import { RawDataCreateComponent } from 'app/views/raw-data/raw-data-create.component';
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

@NgModule({
  imports: [
    CommonModule,
    RawDataRoutingModule,
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
  declarations: [RawDataComponent, RawDataCreateComponent]
})
export class RawDataModule {}
