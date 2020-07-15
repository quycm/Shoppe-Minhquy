import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ScheduleRoutingModule } from 'app/views/schedule/schedule-routing.module';
import { ScheduleComponent } from 'app/views/schedule/schedule.component';
import { ScheduleCreateComponent } from './schedule-create.component';
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';
import { ScheduleUpdateComponent } from './schedule-update.component';

@NgModule({
  imports: [
    CommonModule,
    ScheduleRoutingModule,
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
    NgSelectModule
  ],
  declarations: [ScheduleComponent, ScheduleCreateComponent, ScheduleUpdateComponent]
})
export class ScheduleModule {}
