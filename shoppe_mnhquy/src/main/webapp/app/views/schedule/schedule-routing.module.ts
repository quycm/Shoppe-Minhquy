import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterModule, Routes } from '@angular/router';
import { ScheduleComponent } from 'app/views/schedule/schedule.component';
import { ScheduleCreateComponent } from 'app/views/schedule/schedule-create.component';
import { ScheduleUpdateComponent } from 'app/views/schedule/schedule-update.component';
import { ScheduleService } from 'app/core/schedule/schedule.service';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

@Injectable({ providedIn: 'root' })
export class ScheduleResolve implements Resolve<any> {
  constructor(private service: ScheduleService) {}

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
      title: 'Quản lí lịch trình làm việc'
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ScheduleComponent,
        canActivate: [UserRouteAccessService],
        data: {
          title: 'Danh sách lịch trình làm việc',
          authorities: ['ROLE_USER']
        }
      },
      {
        path: 'new',
        component: ScheduleCreateComponent,
        canActivate: [UserRouteAccessService],
        data: {
          title: 'Tạo mới lịch trình làm việc',
          authorities: ['ROLE_USER']
        }
      },
      {
        path: ':id/update',
        component: ScheduleUpdateComponent,
        canActivate: [UserRouteAccessService],
        resolve: {
          schedule: ScheduleResolve
        },
        data: {
          title: 'Chỉnh sửa Lịch trình làm việc',
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
export class ScheduleRoutingModule {}
