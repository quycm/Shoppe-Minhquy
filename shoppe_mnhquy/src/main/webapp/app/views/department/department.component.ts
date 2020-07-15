import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DepartmentService } from 'app/core/department/department.service';
import { ConfirmationService } from 'primeng/api';
import { IDepartment } from 'app/core/department/department.model';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  id: any;
  hasData = false;
  loading = false;
  alternate = true;
  pageInfo: any = {};
  dataSource: any;
  sortedData: any[];
  totalRecords: any;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 50];
  pageSize = 10;
  user: IDepartment;
  constructor(private departmentService: DepartmentService, private router: Router, private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.getAllUser();
  }

  findCompany() {
    const param = {
      page: this.pageIndex,
      size: this.pageSize,
      status: 1,
      sort: 'createdDate,desc',
      name: this.pageInfo.name
    };
    this.departmentService
      .filter(param)
      .pipe(
        catchError(() => of([])),
        finalize(() => (this.loading = false))
      )
      .subscribe((res: any) => {
        if (res) {
          this.dataSource = res.body;
          this.hasData = true;
          /* this.sortedData = this.dataSource.slice();
          this.totalRecords = res.headers.get('X-Total-Count');*/
        } else {
          this.hasData = false;
        }
      });
  }

  delete(status?: any) {
    this.confirmationService.confirm({
      message: 'Anh(chị) có muốn xoá phòng ban này?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.departmentService.delete(status).subscribe(res => {
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
        this.router.navigate(['department']);
      }
    });
  }

  getAllUser() {
    const param = {
      page: this.pageIndex,
      size: this.pageSize,
      sort: 'createdDate,desc'
    };
    this.departmentService
      .getALL(param)
      .pipe(
        catchError(() => of([])),
        finalize(() => (this.loading = false))
      )
      .subscribe((res: any) => {
        if (res) {
          this.dataSource = res.body;
          this.hasData = true;
          this.sortedData = this.dataSource.slice();
          this.totalRecords = res.headers.get('X-Total-Count');
        } else {
          this.hasData = false;
        }
      });
  }

  create() {
    this.router.navigate(['department', 'insert']);
  }

  update() {
    this.router.navigate(['department', 'update']);
  }
  handlePagination(page: any) {
    const { pageIndex, pageSize } = page;
    this.pageIndex = pageIndex;
    const param = {
      page: pageIndex,
      size: pageSize,
      sort: 'createdDate,desc'
    };
    this.departmentService.getALL(param).subscribe(res => {
      this.pageSize = param.size;
      this.dataSource = res.body ? res.body : [];
      this.sortedData = this.dataSource.slice();
      this.totalRecords = res.headers.get('X-Total-Count');
    });
  }
}
