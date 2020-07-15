import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolkRoutingModule } from './folk.routing';
import { TableModule } from 'primeng';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { FolkComponent } from 'app/views/folk/folk.component';
import { FolkCreateComponent } from 'app/views/folk/folk-create.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FolkUpdateComponent } from 'app/views/folk/folk-update.component';
import { FolkDetailComponent } from './folk-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FolkRoutingModule,
    TableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    LayoutModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  declarations: [FolkComponent, FolkCreateComponent, FolkUpdateComponent, FolkDetailComponent]
})
export class FolkModule {}
