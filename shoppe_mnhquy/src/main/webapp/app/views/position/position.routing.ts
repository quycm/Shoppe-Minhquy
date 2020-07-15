import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { PositionComponent } from './position.component';
import { UpdatePositionComponent } from './update-position.component';
import { InsertPositionComponent } from './insert-position.component';
import { PositionService } from 'app/core/position/position.service';
import { Position } from 'app/core/position/position.model';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

@Injectable({ providedIn: 'root' })
export class PositionResolve implements Resolve<any> {
  constructor(private service: PositionService) {}
  resolve(route: ActivatedRouteSnapshot) {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.getByID(id);
    }
    return new Position();
  }
}
const routes: Routes = [
  {
    path: '',
    component: PositionComponent,
    canActivate: [UserRouteAccessService],
    data: {
      title: 'Danh sách đơn vị',
      authorities: ['ROLE_USER']
    }
  },
  {
    path: 'insert',
    component: InsertPositionComponent,
    canActivate: [UserRouteAccessService],
    data: {
      title: 'Thêm mới đơn vị',
      authorities: ['ROLE_USER']
    }
  },
  {
    path: ':id/update',
    component: UpdatePositionComponent,
    canActivate: [UserRouteAccessService],
    resolve: {
      position: PositionResolve
    },
    data: {
      title: 'Chỉnh sửa đơn vị',
      authorities: ['ROLE_USER']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PositionRoutingModule {}
