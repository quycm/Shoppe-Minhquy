import { Component, OnInit } from '@angular/core';

import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

import { UserService } from 'app/core/user/user.service';
import { ConfirmationService } from 'primeng/api';
import { IUser } from 'app/core/user/user.model';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  id: any;
  hasData = false;
  loading = false;
  alternate = true;
  pageInfo: any = {};
  dataSource: any = [];
  user: IUser;
  sortedData: any[];
  totalRecords: any;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 50];
  pageSize = 10;
  constructor(private userService: UserService, private router: Router, private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.getAllUser();
  }

  delete(login?) {
    this.confirmationService.confirm({
      message: 'Anh(chị) có chắc muốn xoá người dùng này?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.delete(login).subscribe(res => {
          if (res) {
            this.dataSource = res;
            this.hasData = true;
          } else {
            this.hasData = false;
          }
          this.ngOnInit();
        });
      },
      reject: () => {
        this.router.navigate(['user']);
      }
    });
  }

  getAllUser() {
    const param = {
      page: this.pageIndex,
      size: this.pageSize,
      sort: 'createdDate,desc'
    };
    this.userService
      .getAll(param)
      .pipe(
        catchError(() => of([])),
        finalize(() => (this.loading = false))
      )
      .subscribe((res: HttpResponse<any>) => {
        if (res) {
          console.log(res);
          this.dataSource = res.body;

          this.sortedData = this.dataSource.slice();
          console.log('res : ', res.headers);
          this.totalRecords = res.headers.get('X-Total-Count');
          this.hasData = true;
        } else {
          this.hasData = false;
        }
      });
  }

  findUsers() {
    const model: any = { login: this.pageInfo.login };
    this.userService
      .filter(model)
      .pipe(
        catchError(() => of([])),
        finalize(() => (this.loading = false))
      )
      .subscribe((res: any) => {
        if (res) {
          this.dataSource = res;
          this.hasData = true;
        } else {
          this.hasData = false;
        }
      });
  }

  create() {
    this.router.navigate(['user', 'insert']);
  }

  update() {
    this.router.navigate(['user', 'update']);
  }

  handlePagination(page: any) {
    const { pageIndex, pageSize } = page;
    this.pageIndex = pageIndex;
    const param = {
      page: pageIndex,
      size: pageSize,
      sort: 'createdDate,desc'
    };
    this.userService.getAll(param).subscribe(res => {
      this.pageSize = param.size;
      this.dataSource = res.body;
      this.sortedData = this.dataSource.slice();
      this.totalRecords = res.headers.get('X-Total-Count');
    });
  }

  // handlePagination(page: any) {
  //   const { pageIndex, pageSize } = page;
  //   this.pageIndex = pageIndex;
  //   const param = {
  //     page: pageIndex,
  //     size: pageSize,
  //     sort: 'createdDate,desc'
  //   };
  //   this.userService.getALL(param).subscribe(res => {
  //     this.pageSize = param.size;
  //     this.dataSource = res;
  //     this.sortedData = this.dataSource.slice();
  //     this.totalRecords = res.headers.get('X-Total-Count');
  //   });
  // }
}
