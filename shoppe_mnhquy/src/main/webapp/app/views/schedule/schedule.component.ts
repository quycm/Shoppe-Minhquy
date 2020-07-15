import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'app/core/schedule/schedule.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  listSchedule: any;
  sortedData: any[];
  totalRecords: any;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 50];
  pageSize = 10;
  name = new FormControl(null);
  loading = false;

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit() {
    this.loadAllSchedule();
    this.name.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => (this.loading = true)),
        tap(() => this.fetchName())
      )
      .subscribe();
  }

  loadAllSchedule() {
    const param = {
      sort: 'createdDate,desc'
    };
    this.scheduleService.getListSchedule(param).subscribe(res => {
      this.listSchedule = res.body ? res.body : [];
      this.sortedData = this.listSchedule.slice();
      this.totalRecords = res.headers.get('X-Total-Count');
    });
  }

  fetchName() {
    const param = {
      page: 0,
      size: this.pageSize,
      name: this.name.value,
      sort: 'createdDate,desc'
    };
    this.scheduleService.getListSchedule(param).subscribe(res => {
      this.listSchedule = res.body ? res.body : [];
      this.sortedData = this.listSchedule.slice();

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
    this.scheduleService.getListSchedule(param).subscribe(res => {
      this.pageSize = param.size;
      this.listSchedule = res.body ? res.body : [];

      this.sortedData = this.listSchedule.slice();
      this.totalRecords = res.headers.get('X-Total-Count');
    });
  }
}
