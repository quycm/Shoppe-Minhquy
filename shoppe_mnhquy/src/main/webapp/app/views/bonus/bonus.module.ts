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
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';
import { BonusRoutingModule } from 'app/views/bonus/bonus-routing.module';
import { BonusComponent } from 'app/views/bonus/bonus.component';
import { BonusCreateComponent } from 'app/views/bonus/bonus-create.component';
import { BonusUpdateComponent } from 'app/views/bonus/bonus-update.component';
import { BonusDetailComponent } from 'app/views/bonus/bonus-detail.component';

@NgModule({
  imports: [
    CommonModule,
    BonusRoutingModule,
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
  declarations: [BonusComponent, BonusCreateComponent, BonusUpdateComponent, BonusDetailComponent]
})
export class BonusModule {}
