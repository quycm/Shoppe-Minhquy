import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UserComponent } from './user.component';
import { UpdateuserComponent } from './update-user.component';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.model';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { InsertUserComponent } from './insert-user.component';

@Injectable({ providedIn: 'root' })
export class UserResolve implements Resolve<any> {
  constructor(private service: UserService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const login = route.params['login'] ? route.params['login'] : null;
    if (login) {
      return this.service.find(login);
    }
    return new User();
  }
}
const routes: Routes = [
  {
    path: '',
    canActivate: [UserRouteAccessService],
    data: {
      title: 'Quản lý người dùng'
    },
    children: [
      {
        path: '',
        component: UserComponent,
        canActivate: [UserRouteAccessService],
        data: {
          title: 'Danh sách người dùng',
          authorities: ['ROLE_ADMIN']
        }
      },
      {
        path: 'insert',
        component: InsertUserComponent,
        canActivate: [UserRouteAccessService],
        resolve: {
          user: UserResolve
        },
        data: {
          title: 'Thêm mới ',
          authorities: ['ROLE_ADMIN']
        }
      },
      {
        path: ':login/update',
        component: UpdateuserComponent,
        canActivate: [UserRouteAccessService],
        resolve: {
          user: UserResolve
        },
        data: {
          title: 'Sửa Người Dùng',
          authorities: ['ROLE_ADMIN']
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
