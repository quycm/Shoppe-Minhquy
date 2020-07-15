import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ShiftService } from 'app/core/shift/shift.service';

@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss']
})
export class ShiftComponent implements OnInit {
  listShift: any;
  sortedData: any[];
  totalRecords: any;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 50];
  pageSize = 10;
  name = new FormControl(null);
  status = new FormControl('1');
  loading = false;
  constructor(private shiftService: ShiftService, private router: Router) {}

  ngOnInit() {
    this.loadAllShift();
    this.name.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => (this.loading = true)),
        tap(() => this.fetchName())
      )
      .subscribe();
  }

  loadAllShift() {
    const param = {
      page: this.pageIndex,
      size: this.pageSize,
      status: this.status.value,
      sort: 'createdDate,desc'
    };
    this.shiftService.getListShift(param).subscribe(res => {
      this.listShift = res.body ? res.body : [];
      this.sortedData = this.listShift.slice();
      this.totalRecords = res.headers.get('X-Total-Count');
    });
  }

  fetchName() {
    const param = {
      page: 0,
      size: this.pageSize,
      name: this.name.value,
      status: this.status.value,
      sort: 'createdDate,desc'
    };
    this.shiftService.getListShift(param).subscribe(res => {
      this.listShift = res.body ? res.body : [];
      this.sortedData = this.listShift.slice();
      this.totalRecords = res.headers.get('X-Total-Count');
    });
  }

  handlePagination(page: any) {
    const { pageIndex, pageSize } = page;
    this.pageIndex = pageIndex;
    const param = {
      page: pageIndex,
      size: pageSize,
      status: this.status.value,
      sort: 'createdDate,desc'
    };
    this.shiftService.getListShift(param).subscribe(res => {
      this.pageSize = param.size;
      this.listShift = res.body ? res.body : [];
      this.sortedData = this.listShift.slice();
      this.totalRecords = res.headers.get('X-Total-Count');
    });
  }
}
