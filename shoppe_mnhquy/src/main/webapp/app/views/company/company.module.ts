import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CompanyComponent } from './company.component';
import { CompanyRoutingModule } from './company.routing';
import { TableModule } from 'primeng/table';
import { TimekeeperSharedModule } from 'app/shared/shared.module';
import { UpdateCompanyComponent } from './update-company.component';
import {InsertCompanyComponent} from './insert-company.component';
import { ConfirmationService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
    imports: [
        CompanyRoutingModule,
        TimekeeperSharedModule,
        TableModule,
        ConfirmDialogModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatPaginatorModule,

    ],
    declarations: [CompanyComponent, UpdateCompanyComponent,InsertCompanyComponent],
    providers: [ConfirmationService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CompanyModule {}