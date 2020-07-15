import { Component, OnInit } from '@angular/core';
import { RawDataService } from '../../core/raw-data/raw-data.service';

@Component({
  selector: 'app-raw-data',
  templateUrl: './raw-data.component.html',
  styleUrls: ['./raw-data.component.scss']
})
export class RawDataComponent implements OnInit {
  listRawData: any;
  sortedData: any[];
  totalRecords: any;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 50];
  pageSize = 10;
  constructor(private rawDataService: RawDataService) {}

  ngOnInit() {
    this.loadAllRawData();
  }

  loadAllRawData() {
    const param = {
      page: this.pageIndex,
      size: this.pageSize,
      sort: 'createdDate,desc'
    };
    this.rawDataService.getListRawData(param).subscribe(res => {
      this.listRawData = res.body ? res.body : [];
      this.sortedData = this.listRawData.slice();
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
    this.rawDataService.getListRawData(param).subscribe(res => {
      this.pageSize = param.size;
      this.listRawData = res.body ? res.body : [];
      this.sortedData = this.listRawData.slice();
      this.totalRecords = res.headers.get('X-Total-Count');
    });
  }
}
