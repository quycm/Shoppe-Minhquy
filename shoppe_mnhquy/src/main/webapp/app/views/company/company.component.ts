import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CompanyService } from 'app/core/company/company.service';
import { ConfirmationService } from 'primeng/api';
import { ICompany } from 'app/core/company/company.model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
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
  user: ICompany;
  constructor(private companyService: CompanyService, private router: Router, private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.getAllUser();
  }

  findCompany() {
    const model: any = { name: this.pageInfo.name };
    this.companyService
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
      message: 'Anh(chị) có muốn xoá công ty này không?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.companyService.delete(status).subscribe((res: any[]) => {
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
        this.router.navigate(['company']);
      }
    });
  }

  getAllUser() {
    const param = {
      page: this.pageIndex,
      size: this.pageSize,
      sort: 'createdDate,desc'
    };
    this.companyService
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
    this.router.navigate(['company', 'insert']);
  }

  update() {
    this.router.navigate(['company', 'update']);
  }

  handlePagination(page: any) {
    const { pageIndex, pageSize } = page;
    this.pageIndex = pageIndex;
    const param = {
      page: pageIndex,
      size: pageSize,
      sort: 'createdDate,desc'
    };
    this.companyService.getALL(param).subscribe(res => {
      this.pageSize = param.size;
      this.dataSource = res.body;
      this.sortedData = this.dataSource.slice();
      this.totalRecords = res.headers.get('X-Total-Count');
    });
  }
}
