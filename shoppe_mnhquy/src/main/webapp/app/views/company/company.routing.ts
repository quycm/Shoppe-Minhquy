import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { CompanyComponent } from './company.component';
import { UpdateCompanyComponent } from './update-company.component';
import { InsertCompanyComponent } from './insert-company.component';
import { CompanyService } from 'app/core/company/company.service';
import { Company } from 'app/core/company/company.model';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

@Injectable({ providedIn: 'root' })
export class CompanyResolve implements Resolve<any> {
  constructor(private service: CompanyService) {}
  resolve(route: ActivatedRouteSnapshot) {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.getByID(id);
    }
    // eslint-disable-next-line no-console
    return new Company();
  }
}

const routes: Routes = [
  {
    path: '',
    component: CompanyComponent,
    canActivate: [UserRouteAccessService],
    data: {
      title: 'Danh sách Công ty',
      authorities: ['ROLE_ADMIN']
    }
  },
  {
    path: 'insert',
    component: InsertCompanyComponent,
    canActivate: [UserRouteAccessService],
    data: {
      title: 'Thêm mới công ty',
      authorities: ['ROLE_ADMIN']
    }
  },
  {
    path: ':id/update',
    component: UpdateCompanyComponent,
    canActivate: [UserRouteAccessService],
    resolve: {
      company: CompanyResolve
    },
    data: {
      title: 'Sửa Công ty',
      authorities: ['ROLE_ADMIN']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule {}
