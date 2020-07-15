import { Component, OnInit } from '@angular/core';
import { TimesheetService } from 'app/core/timesheet/timesheet.service';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {
  listTimesheet: any;
  sortedData: any[];
  totalRecords: any;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 50];
  pageSize = 10;
  constructor(private timesheetService: TimesheetService) {}

  ngOnInit() {
    this.loadAllTimesheet();
  }

  loadAllTimesheet() {
    const param = {
      page: this.pageIndex,
      size: this.pageSize,
      sort: 'createdDate,desc'
    };
    this.timesheetService.getListTimesheet(param).subscribe(res => {
      this.listTimesheet = res.body ? res.body : [];
      this.sortedData = this.listTimesheet.slice();
      this.totalRecords = res.headers.get('X-Total-Count');
    });
  }

  handlePagination(page: any) {
    const { pageIndex, pageSize } = page;
    this.pageIndex = pageIndex;
    const param = {
      page: pageIndex,
      size: pageSize,
      sort: 'createdDate,desc'
    };
    this.timesheetService.getListTimesheet(param).subscribe(res => {
      this.pageSize = param.size;
      this.listTimesheet = res.body ? res.body : [];
      this.sortedData = this.listTimesheet.slice();
      this.totalRecords = res.headers.get('X-Total-Count');
    });
  }
}
