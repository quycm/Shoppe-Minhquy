import { Component, OnInit } from '@angular/core';

import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

import { EmployeeService } from 'app/core/employee/employee.service';
import { ConfirmationService } from 'primeng/api';
import { IEmployee } from 'app/core/employee/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  id: any;
  hasData = false;
  loading = false;
  alternate = true;
  pageInfo: { name?: string; namedepartment?: string; nameposition?: string; namefolk?: string } = {};
  dataSource: any = [];
  block: any = [];
  employee: IEmployee;
  sortedData: any[];
  totalRecords: any;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 50];
  pageSize = 10;
  constructor(private employeeService: EmployeeService, private router: Router, private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.getAllUser();
  }

  delete(status?: any) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xoá nhân viên này không?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.employeeService.delete(status).subscribe(res => {
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
        this.router.navigate(['employee']);
      }
    });
  }

  getAllUser() {
    const param = {
      page: this.pageIndex,
      size: this.pageSize,
      sort: 'createdDate,desc'
    };
    this.employeeService
      .getALL(param)
      .pipe(
        catchError(() => of([])),
        finalize(() => (this.loading = false))
      )
      .subscribe((res: any) => {
        if (res) {
          this.dataSource = res.body;
          this.sortedData = this.dataSource.slice();
          this.totalRecords = res.headers.get('X-Total-Count');
          this.hasData = true;
        } else {
          this.hasData = false;
        }
      });
  }
  findCompany() {
    const filter: any = {
      name: this.pageInfo.name,
      namedepartment: this.pageInfo.namedepartment,
      nameposition: this.pageInfo.nameposition,
      namefolk: this.pageInfo.namefolk
    };
    this.employeeService
      .filter(filter)
      .pipe(
        catchError(() => of([])),
        finalize(() => (this.loading = false))
      )
      .subscribe((res: any) => {
        if (res) {
          this.dataSource = res;
          this.sortedData = this.dataSource.slice();
          this.totalRecords = res.headers.get('X-Total-Count');
          this.hasData = true;
        } else {
          this.hasData = false;
        }
      });
  }

  getByid(id?: any) {
    this.employeeService
      .getByID(id)
      .pipe(
        catchError(() => of([])),
        finalize(() => (this.loading = false))
      )
      .subscribe((res: any[]) => {
        if (res) {
          this.block = res;
          this.hasData = true;
        } else {
          this.hasData = false;
        }
      });
  }

  create() {
    this.router.navigate(['employee', 'insert']);
  }

  update() {
    this.router.navigate(['employee', 'update']);
  }

  handlePagination(page: any) {
    const { pageIndex, pageSize } = page;
    this.pageIndex = pageIndex;
    const param = {
      page: pageIndex,
      size: pageSize,
      sort: 'createdDate,desc'
    };
    this.employeeService.getALL(param).subscribe(res => {
      this.pageSize = param.size;
      this.dataSource = res.body;
      this.sortedData = this.dataSource.slice();
      this.totalRecords = res.headers.get('X-Total-Count');
    });
  }
}
