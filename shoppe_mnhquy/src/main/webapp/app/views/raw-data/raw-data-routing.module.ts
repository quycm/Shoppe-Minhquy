import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { RawDataComponent } from 'app/views/raw-data/raw-data.component';
import { RawDataCreateComponent } from 'app/views/raw-data/raw-data-create.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Quản lí dữ liệu thô'
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: RawDataComponent,
        canActivate: [UserRouteAccessService],
        data: {
          title: 'Danh sách dữ liệu thô',
          authorities: ['ROLE_USER']
        }
      },
      {
        path: 'new',
        component: RawDataCreateComponent,
        canActivate: [UserRouteAccessService],
        data: {
          title: 'Tạo mới dữ liệu thô',
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
export class RawDataRoutingModule {}
