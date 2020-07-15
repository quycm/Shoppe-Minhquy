import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InsertUserComponent } from './insert-user.component';
import { UsersRoutingModule } from './user.routing';
import { TableModule } from 'primeng/table';
import { TimekeeperSharedModule } from 'app/shared/shared.module';
import { UpdateuserComponent } from './update-user.component';
import { UserComponent } from './user.component';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgSelectModule } from '@ng-select/ng-select';
import { CheckboxModule } from 'primeng';

@NgModule({
  imports: [UsersRoutingModule, TimekeeperSharedModule, TableModule, ConfirmDialogModule, NgSelectModule, CheckboxModule],
  declarations: [UserComponent, UpdateuserComponent, InsertUserComponent],
  providers: [ConfirmationService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UsersModule {}
