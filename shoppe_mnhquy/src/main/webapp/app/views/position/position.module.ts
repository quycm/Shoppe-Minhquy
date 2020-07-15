import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PositionComponent } from './position.component';
import { PositionRoutingModule } from './position.routing';
import { TableModule } from 'primeng/table';
import { TimekeeperSharedModule } from 'app/shared/shared.module';
import { UpdatePositionComponent } from './update-position.component';
import {InsertPositionComponent} from './insert-position.component';
import { ConfirmationService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
    imports: [
        PositionRoutingModule,
        TimekeeperSharedModule,
        TableModule,
        ConfirmDialogModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatPaginatorModule
       
      
    ],
    declarations: [PositionComponent, UpdatePositionComponent,InsertPositionComponent],
    providers: [ConfirmationService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PositionModule {}