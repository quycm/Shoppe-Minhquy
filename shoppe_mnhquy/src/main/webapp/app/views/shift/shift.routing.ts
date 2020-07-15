import { ActivatedRouteSnapshot, Resolve, RouterModule, Routes } from '@angular/router';
import { Injectable, NgModule } from '@angular/core';
import { ShiftComponent } from 'app/views/shift/shift.component';
import { ShiftCreateComponent } from 'app/views/shift/shift-create.component';
import { ShiftService } from 'app/core/shift/shift.service';
import { ShiftUpdateComponent } from 'app/views/shift/shift-update.component';
import { ShiftDetailComponent } from 'app/views/shift/shift-detail.component';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

@Injectable({ providedIn: 'root' })
export class ShiftResolve implements Resolve<any> {
  constructor(private service: ShiftService) {}

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
      title: 'Quản lí ca làm việc'
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ShiftComponent,
        canActivate: [UserRouteAccessService],
        data: {
          title: 'Danh sách ca làm việc',
          authorities: ['ROLE_USER']
        }
      },
      {
        path: 'new',
        component: ShiftCreateComponent,
        canActivate: [UserRouteAccessService],
        data: {
          title: 'Tạo mới ca làm việc',
          authorities: ['ROLE_USER']
        }
      },
      {
        path: ':id/update',
        component: ShiftUpdateComponent,
        canActivate: [UserRouteAccessService],
        resolve: {
          shift: ShiftResolve
        },
        data: {
          title: 'Chỉnh sửa ca làm việc',
          authorities: ['ROLE_USER']
        }
      },
      {
        path: ':id/detail',
        component: ShiftDetailComponent,
        canActivate: [UserRouteAccessService],
        resolve: {
          shift: ShiftResolve
        },
        data: {
          title: 'Chi tiết ca làm việc',
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
export class ShiftRoutingModule {}
