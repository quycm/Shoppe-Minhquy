import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { UpdateEmployeeComponent } from './update-employee.component';
import { InsertEmployeeComponent } from './insert-employee.component';
import { EmployeeService } from 'app/core/employee/employee.service';
import { Employee } from 'app/core/employee/employee.model';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

@Injectable({ providedIn: 'root' })
export class EmployeeResolve implements Resolve<any> {
  constructor(private service: EmployeeService) {}
  resolve(route: ActivatedRouteSnapshot) {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.getByID(id);
    }
    return new Employee();
  }
}

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    canActivate: [UserRouteAccessService],
    data: {
      title: 'Danh sách nhân viên',
      authorities: ['ROLE_USER']
    }
  },
  {
    path: 'insert',
    component: InsertEmployeeComponent,
    canActivate: [UserRouteAccessService],
    data: {
      title: 'Tạo nhân viên',
      authorities: ['ROLE_USER']
    }
  },
  {
    path: ':id/update',
    component: UpdateEmployeeComponent,
    canActivate: [UserRouteAccessService],
    resolve: {
      employee: EmployeeResolve
    },
    data: {
      title: 'Chỉnh sửa nhân viên',
      authorities: ['ROLE_USER']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {}
