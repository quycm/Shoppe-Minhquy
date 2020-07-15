import { Component, OnInit } from '@angular/core';

import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

import { PositionService } from 'app/core/position/position.service';
import { ConfirmationService } from 'primeng/api';
import { IPosition } from 'app/core/position/position.model';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit {
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
  user: IPosition;
  constructor(private positionService: PositionService, private router: Router, private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.getAllUser();
  }

  findCompany() {
    const model: any = { name: this.pageInfo.name };
    this.positionService
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
  delete(status: any) {
    this.confirmationService.confirm({
      message: 'Anh(chị) có chắc muốn xoá đơn vị này?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.positionService.delete(status).subscribe((res: any[]) => {
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
        this.router.navigate(['position']);
      }
    });
  }

  getAllUser() {
    const param = {
      page: this.pageIndex,
      size: this.pageSize,
      sort: 'createdDate,desc'
    };
    this.positionService
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

  create() {
    this.router.navigate(['position', 'insert']);
  }

  update() {
    this.router.navigate(['position', 'update']);
  }
  handlePagination(page: any) {
    const { pageIndex, pageSize } = page;
    this.pageIndex = pageIndex;
    const param = {
      page: pageIndex,
      size: pageSize,
      sort: 'createdDate,desc'
    };
    this.positionService.getALL(param).subscribe(res => {
      this.pageSize = param.size;
      this.dataSource = res.body;
      this.sortedData = this.dataSource.slice();
      this.totalRecords = res.headers.get('X-Total-Count');
    });
  }
}
