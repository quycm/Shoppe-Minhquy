import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DepartmentComponent } from './department.component';
import { UpdateDepartmentComponent } from './update-department.component';
import { InsertDepartmentComponent } from './insert-department.component';
import { DepartmentService } from 'app/core/department/department.service';
import { Department } from 'app/core/department/department.model';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

@Injectable({ providedIn: 'root' })
export class DepartmentResolve implements Resolve<any> {
  constructor(private service: DepartmentService) {}
  resolve(route: ActivatedRouteSnapshot) {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.getByID(id);
    }
    return new Department();
  }
}

const routes: Routes = [
  {
    path: '',
    component: DepartmentComponent,
    canActivate: [UserRouteAccessService],
    data: {
      title: 'Danh sách phòng ban',
      authorities: ['ROLE_USER']
    }
  },
  {
    path: 'insert',
    component: InsertDepartmentComponent,
    canActivate: [UserRouteAccessService],
    data: {
      title: 'Thêm mới phòng ban',
      authorities: ['ROLE_USER']
    }
  },
  {
    path: ':id/update',
    component: UpdateDepartmentComponent,
    canActivate: [UserRouteAccessService],
    resolve: {
      department: DepartmentResolve
    },
    data: {
      title: 'Sửa Phòng ban',
      authorities: ['ROLE_USER']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule {}
