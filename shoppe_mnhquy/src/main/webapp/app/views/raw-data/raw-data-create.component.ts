import { Component, OnInit } from '@angular/core';
import { concat, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { ShiftService } from '../../core/shift/shift.service';
import { FormBuilder, Validators } from '@angular/forms';
import { RawDataService } from '../../core/raw-data/raw-data.service';
import { pageUrl } from '../../core/model/pageUrl';
import { Router } from '@angular/router';

@Component({
  selector: 'app-raw-data-create',
  templateUrl: './raw-data-create.component.html',
  styleUrls: ['./raw-data.component.scss']
})
export class RawDataCreateComponent implements OnInit {
  vn: any;
  listShift: any;
  defaultShift = [];
  shiftSearchTxt = new Subject<string>();
  shiftSearchLoading = false;
  listVerifyState: any;
  listVerifyType: any;
  newRawData = this.fb.group({
    shiftsid: [null, [Validators.required]],
    userTkId: [null, [Validators.required, Validators.min(0)]],
    verifyState: [null, [Validators.required]],
    verifyTime: [null, [Validators.required]],
    verifyType: [null, [Validators.required]]
  });
  constructor(
    private shiftService: ShiftService,
    private fb: FormBuilder,
    private rawDataService: RawDataService,
    private router: Router
  ) {}

  beginData() {
    this.listVerifyState = [
      {
        id: 1,
        name: 'Vào'
      },
      {
        id: 0,
        name: 'Ra'
      }
    ];
    this.listVerifyType = [
      {
        id: 0,
        name: 'Mã PIN'
      },
      {
        id: 1,
        name: 'Khuôn mặt'
      },
      {
        id: 2,
        name: 'Vân tay'
      },
      {
        id: 3,
        name: 'Thẻ'
      }
    ];
    this.vn = {
      firstDayOfWeek: 0,
      dayNames: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
      dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
      dayNamesMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
      monthNames: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12'
      ],
      monthNamesShort: ['TH1', 'TH2', 'TH3', 'TH4', 'TH5', 'TH6', 'TH7', 'TH8', 'TH9', 'TH10', 'TH11', 'TH12'],
      today: 'Hôm nay',
      clear: 'Xóa',
      dateFormat: 'mm/dd/yy HH:mm',
      weekHeader: 'Wk'
    };
  }

  ngOnInit() {
    this.selectShift();
    this.beginData();
  }

  selectShift() {
    this.listShift = concat(
      of(this.defaultShift),
      this.shiftService
        .getListShift({
          page: 0,
          size: 10
        })
        .pipe(
          map((data: any) => {
            return data.body;
          })
        ),
      this.shiftSearchTxt.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => (this.shiftSearchLoading = true)),
        switchMap(t => {
          return this.shiftService
            .getListShift({
              name: t ? t : '',
              page: 0,
              size: 10
            })
            .pipe(
              catchError(() => of({ body: [] })),
              tap(() => (this.shiftSearchLoading = false))
            );
        }),
        map((data: any) => {
          return data.body;
        })
      )
    );
  }

  create() {
    this.newRawData.controls.shiftsid.markAsDirty();
    this.newRawData.controls.userTkId.markAsDirty();
    this.newRawData.controls.verifyState.markAsDirty();
    this.newRawData.controls.verifyTime.markAsDirty();
    this.newRawData.controls.verifyType.markAsDirty();
    if (this.newRawData.valid) {
      this.rawDataService.create(this.newRawData.value).subscribe(res => {
        this.previousState();
        this.newRawData.reset();
      });
    }
  }

  previousState() {
    this.router.navigate([pageUrl.listRawData]);
  }
}
