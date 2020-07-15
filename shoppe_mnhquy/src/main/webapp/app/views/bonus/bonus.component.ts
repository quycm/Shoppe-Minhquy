import { Component, OnInit } from '@angular/core';
import { BonusService } from 'app/core/bonus/bonus.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.scss']
})
export class BonusComponent implements OnInit {
  listBonus: any;
  sortedData: any[];
  totalRecords: any;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 50];
  pageSize = 10;
  name = new FormControl(null);
  loading = false;

  constructor(private bonusService: BonusService) {}

  ngOnInit() {
    this.loadAllBonus();
    this.name.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => (this.loading = true)),
        tap(() => this.fetchName())
      )
      .subscribe();
  }

  fetchName() {
    const param = {
      page: 0,
      size: this.pageSize,
      name: this.name.value,
      sort: 'createdDate,desc'
    };
    this.bonusService.filterBonus(param).subscribe(res => {
      this.listBonus = res.body ? res.body : [];
      this.sortedData = this.listBonus.slice();
      this.totalRecords = res.headers.get('X-Total-Count');
    });
  }

  loadAllBonus() {
    const param = {
      page: this.pageIndex,
      size: this.pageSize,
      sort: 'createdDate,desc'
    };
    this.bonusService.getListBonus(param).subscribe(res => {
      this.listBonus = res.body ? res.body : [];
      this.sortedData = this.listBonus.slice();
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
    this.bonusService.getListBonus(param).subscribe(res => {
      this.pageSize = param.size;
      this.listBonus = res.body ? res.body : [];
      this.sortedData = this.listBonus.slice();
      this.totalRecords = res.headers.get('X-Total-Count');
    });
  }
}
