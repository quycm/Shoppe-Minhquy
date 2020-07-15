import { NgModule, Injectable } from '@angular/core';
import { RouterModule, Routes, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { FolkComponent } from 'app/views/folk/folk.component';
import { FolkCreateComponent } from 'app/views/folk/folk-create.component';
import { FolkUpdateComponent } from 'app/views/folk/folk-update.component';
import { FolkService } from 'app/core/folk/folk.service';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { FolkDetailComponent } from 'app/views/folk/folk-detail.component';

@Injectable({ providedIn: 'root' })
export class FolkResolve implements Resolve<any> {
  constructor(private service: FolkService) {}

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
      title: 'Quản lí Dân tộc'
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: FolkComponent,
        canActivate: [UserRouteAccessService],
        data: {
          title: 'Danh sách Dân tộc',
          authorities: ['ROLE_USER']
        }
      },
      {
        path: 'new',
        component: FolkCreateComponent,
        canActivate: [UserRouteAccessService],
        data: {
          title: 'Tạo mới Dân tộc',
          authorities: ['ROLE_USER']
        }
      },
      {
        path: ':id/update',
        component: FolkUpdateComponent,
        canActivate: [UserRouteAccessService],
        resolve: {
          folk: FolkResolve
        },
        data: {
          title: 'Chỉnh sửa Dân tộc',
          authorities: ['ROLE_USER']
        }
      },
      {
        path: ':id/detail',
        component: FolkDetailComponent,
        canActivate: [UserRouteAccessService],
        resolve: {
          folk: FolkResolve
        },
        data: {
          title: 'Chi tiết Dân tộc',
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
export class FolkRoutingModule {}
