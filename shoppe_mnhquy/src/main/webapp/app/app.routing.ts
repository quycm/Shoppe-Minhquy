import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { UserRouteAccessService } from './core/auth/user-route-access-service';
import { PasswordResetInitComponent } from './views/password-reset-init/password-reset-init.component';
import { PasswordResetFinishComponent } from './views/password-reset-finish/password-reset-finish.component';
import { RegisterComponent } from 'app/views/login/register/register.component';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Trang chủ'
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule)
      },
      {
        path: '404',
        component: P404Component,
        data: {
          title: 'Page 404'
        }
      },
      {
        path: '500',
        component: P500Component,
        data: {
          title: 'Page 500'
        }
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Login Page'
        }
      },
      {
        path: 'password-reset-init',
        component: PasswordResetInitComponent,
        data: {
          title: 'Reset password'
        }
      },
      {
        path: 'password-reset-finish',
        component: PasswordResetFinishComponent,
        data: {
          title: 'Reset password'
        }
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {
          title: 'Đăng kí tài khoản'
        }
      }
    ]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [UserRouteAccessService],
    data: {
      title: 'Trang chủ',
      authorities: ['ROLE_ADMIN', 'ROLE_USER']
    },
    children: [
      {
        path: 'dashboard',
        data: {
          authorities: ['ROLE_ADMIN', 'ROLE_USER']
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'folk',
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./views/folk/folk.module').then(f => f.FolkModule)
      },
      {
        path: 'raw-data',
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./views/raw-data/raw-data.module').then(f => f.RawDataModule)
      },
      {
        path: 'timesheet',
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./views/timesheet/timesheet.module').then(f => f.TimesheetModule)
      },
      {
        path: 'bonus',
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./views/bonus/bonus.module').then(f => f.BonusModule)
      },
      {
        path: 'company',
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./views/company/company.module').then(m => m.CompanyModule)
      },
      {
        path: 'department',
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./views/department/department.module').then(m => m.DepartmentModule)
      },
      {
        path: 'employee',
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./views/employee/employee.module').then(m => m.EmployeeModule)
      },
      {
        path: 'position',
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./views/position/position.module').then(m => m.PositionModule)
      },
      {
        path: 'user',
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./views/user/user.module').then(m => m.UsersModule)
      },
      {
        path: 'shift',
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./views/shift/shift.module').then(m => m.ShiftModule)
      },
      {
        path: 'schedule',
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./views/schedule/schedule.module').then(m => m.ScheduleModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
