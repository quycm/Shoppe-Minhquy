import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterModule, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { BonusComponent } from 'app/views/bonus/bonus.component';
import { BonusCreateComponent } from 'app/views/bonus/bonus-create.component';
import { BonusDetailComponent } from 'app/views/bonus/bonus-detail.component';
import { BonusService } from 'app/core/bonus/bonus.service';
import { BonusUpdateComponent } from 'app/views/bonus/bonus-update.component';

@Injectable({ providedIn: 'root' })
export class BonusResolve implements Resolve<any> {
  constructor(private service: BonusService) {}

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
      title: 'Quản lí ưu đãi giờ làm'
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: BonusComponent,
        canActivate: [UserRouteAccessService],
        data: {
          title: 'Danh sách ưu đãi giờ làm',
          authorities: ['ROLE_USER']
        }
      },
      {
        path: 'new',
        component: BonusCreateComponent,
        canActivate: [UserRouteAccessService],
        data: {
          title: 'Tạo mới ưu đãi giờ làm',
          authorities: ['ROLE_USER']
        }
      },
      {
        path: ':id/detail',
        component: BonusDetailComponent,
        canActivate: [UserRouteAccessService],
        resolve: {
          bonus: BonusResolve
        },
        data: {
          title: 'Chi tiết ưu đãi',
          authorities: ['ROLE_USER']
        }
      },
      {
        path: ':id/update',
        component: BonusUpdateComponent,
        canActivate: [UserRouteAccessService],
        resolve: {
          bonus: BonusResolve
        },
        data: {
          title: 'Chỉnh sửa ưu đãi',
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
export class BonusRoutingModule {}
