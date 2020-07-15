import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { concat, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { ShiftService } from 'app/core/shift/shift.service';
import { TimesheetService } from 'app/core/timesheet/timesheet.service';
import { pageUrl } from 'app/core/model/pageUrl';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timesheet-create',
  templateUrl: './timesheet-create.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetCreateComponent implements OnInit {
  listShift: any;
  defaultShift = [];
  shiftSearchTxt = new Subject<string>();
  shiftSearchLoading = false;
  vn: any;

  newTimesheet = this.fb.group({
    date: [null, [Validators.required]],
    endBreaktimeLogId: [null],
    goInLogId: [null],
    goOutLogId: [null],
    shiftId: [null, [Validators.required]],
    startBreaktimeLogId: [null],
    statusEndBreaktime: [null, [Validators.required]],
    statusGoIn: [null, [Validators.required]],
    statusGoOut: [null, [Validators.required]],
    statusStartBreaktime: [null, [Validators.required]],
    timeDifferenceGoIn: [null, [Validators.required, Validators.min(0)]],
    timeDifferenceGoOut: [null, [Validators.required, Validators.min(0)]],
    timeDiffrenceEndBreaktime: [null, [Validators.required, Validators.min(0)]],
    timeDiffrenceStartBreaktime: [null, [Validators.required, Validators.min(0)]],
    userIdTk: [null, [Validators.required, Validators.min(0)]],
    verifyTimeEndBreaktime: [null, [Validators.required]],
    verifyTimeGoOut: [null, [Validators.required]],
    verifyTimeStartBreaktime: [null, [Validators.required]],
    verifyTimeGoIn: [null, [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private shiftService: ShiftService,
    private timesheetService: TimesheetService,
    private router: Router
  ) {}

  ngOnInit() {
    this.selectShift();
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

  changeDifferenceGoOut() {
    if (this.newTimesheet.value.timeDifferenceGoOut === null) {
      this.newTimesheet.controls.statusGoOut.reset();
    } else if (this.newTimesheet.value.timeDifferenceGoOut > 0) {
      this.newTimesheet.controls.statusGoOut.setValue(0);
    } else if (this.newTimesheet.value.timeDifferenceGoOut === 0) {
      this.newTimesheet.controls.statusGoOut.setValue(1);
    }
  }

  changeDifferenceGoIn() {
    if (this.newTimesheet.value.timeDifferenceGoIn === null) {
      this.newTimesheet.controls.statusGoIn.reset();
    } else if (this.newTimesheet.value.timeDifferenceGoIn > 0) {
      this.newTimesheet.controls.statusGoIn.setValue(0);
    } else if (this.newTimesheet.value.timeDifferenceGoIn === 0) {
      this.newTimesheet.controls.statusGoIn.setValue(1);
    }
  }

  changeDiffrenceStartBreaktime() {
    if (this.newTimesheet.value.timeDiffrenceStartBreaktime === null) {
      this.newTimesheet.controls.statusStartBreaktime.reset();
    } else if (this.newTimesheet.value.timeDiffrenceStartBreaktime > 0) {
      this.newTimesheet.controls.statusStartBreaktime.setValue(0);
    } else if (this.newTimesheet.value.timeDiffrenceStartBreaktime === 0) {
      this.newTimesheet.controls.statusStartBreaktime.setValue(1);
    }
  }

  changeDiffrenceEndBreaktime() {
    if (this.newTimesheet.value.timeDiffrenceEndBreaktime === null) {
      this.newTimesheet.controls.statusEndBreaktime.reset();
    } else if (this.newTimesheet.value.timeDiffrenceEndBreaktime > 0) {
      this.newTimesheet.controls.statusEndBreaktime.setValue(0);
    } else if (this.newTimesheet.value.timeDiffrenceEndBreaktime === 0) {
      this.newTimesheet.controls.statusEndBreaktime.setValue(1);
    }
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
    this.newTimesheet.controls.date.markAsDirty();
    this.newTimesheet.controls.endBreaktimeLogId.markAsDirty();
    this.newTimesheet.controls.goInLogId.markAsDirty();
    this.newTimesheet.controls.goOutLogId.markAsDirty();
    this.newTimesheet.controls.shiftId.markAsDirty();
    this.newTimesheet.controls.startBreaktimeLogId.markAsDirty();
    this.newTimesheet.controls.statusEndBreaktime.markAsDirty();
    this.newTimesheet.controls.statusGoIn.markAsDirty();
    this.newTimesheet.controls.statusGoOut.markAsDirty();
    this.newTimesheet.controls.statusStartBreaktime.markAsDirty();
    this.newTimesheet.controls.timeDifferenceGoIn.markAsDirty();
    this.newTimesheet.controls.timeDifferenceGoOut.markAsDirty();
    this.newTimesheet.controls.timeDiffrenceEndBreaktime.markAsDirty();
    this.newTimesheet.controls.timeDiffrenceStartBreaktime.markAsDirty();
    this.newTimesheet.controls.userIdTk.markAsDirty();
    this.newTimesheet.controls.verifyTimeEndBreaktime.markAsDirty();
    this.newTimesheet.controls.verifyTimeGoOut.markAsDirty();
    this.newTimesheet.controls.verifyTimeStartBreaktime.markAsDirty();
    this.newTimesheet.controls.verifyTimeGoIn.markAsDirty();
    if (this.newTimesheet.valid) {
      this.timesheetService.create(this.newTimesheet.value).subscribe(res => {
        this.previousState();
        this.newTimesheet.reset();
      });
    }
  }

  previousState() {
    this.router.navigate([pageUrl.listTimesheet]);
  }
}
