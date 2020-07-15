import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { FolkService } from 'app/core/folk/folk.service';

@Component({
  selector: 'app-folk',
  templateUrl: './folk.component.html',
  styleUrls: ['./folk.component.scss']
})
export class FolkComponent implements OnInit {
  listFolk: any;
  sortedData: any[];
  totalRecords: any;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 50];
  pageSize = 10;
  name = new FormControl('');
  loading = false;

  constructor(private folkService: FolkService, private router: Router) {}

  ngOnInit() {
    this.loadAllFolk();
    this.name.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => (this.loading = true)),
        tap(() => this.fetchName())
      )
      .subscribe();
  }

  loadAllFolk() {
    const param = {
      page: this.pageIndex,
      size: this.pageSize,
      status: 1,
      sort: 'createdDate,desc'
    };
    this.folkService.getListFolk(param).subscribe(res => {
      this.listFolk = res.body ? res.body : [];
      this.sortedData = this.listFolk.slice();
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
    this.folkService.getListFolk(param).subscribe(res => {
      this.listFolk = res.body ? res.body : [];
      this.sortedData = this.listFolk.slice();
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
    this.folkService.getListFolk(param).subscribe(res => {
      this.pageSize = param.size;
      this.listFolk = res.body ? res.body : [];
      this.sortedData = this.listFolk.slice();
      this.totalRecords = res.headers.get('X-Total-Count');
    });
  }
}
