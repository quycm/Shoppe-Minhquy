import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterModule, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { TimesheetComponent } from 'app/views/timesheet/timesheet.component';
import { TimesheetCreateComponent } from 'app/views/timesheet/timesheet-create.component';
import { TimesheetUpdateComponent } from 'app/views/timesheet/timesheet-update.component';
import { TimesheetService } from 'app/core/timesheet/timesheet.service';

@Injectable({ providedIn: 'root' })
export class TimesheetResolve implements Resolve<any> {
  constructor(private service: TimesheetService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id);
    }
    return null;
  }
}

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Quản lí thời gian biểu '
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: TimesheetComponent,
        canActivate: [UserRouteAccessService],
        data: {
          title: 'Danh sách thời gian biểu',
          authorities: ['ROLE_USER']
        }
      },
      {
        path: 'new',
        component: TimesheetCreateComponent,
        canActivate: [UserRouteAccessService],
        data: {
          title: 'Tạo mới thời gian biểu',
          authorities: ['ROLE_USER']
        }
      },
      {
        path: ':id/update',
        component: TimesheetUpdateComponent,
        canActivate: [UserRouteAccessService],
        resolve: {
          timesheet: TimesheetResolve
        },
        data: {
          title: 'Chỉnh sửa thời gian biểu',
          authorities: ['ROLE_USER']
        }
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesheetRoutingModule {}
