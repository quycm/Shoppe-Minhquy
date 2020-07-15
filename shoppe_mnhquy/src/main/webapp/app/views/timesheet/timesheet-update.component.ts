import { Component, OnInit } from '@angular/core';
import { concat, of, Subject } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { ShiftService } from 'app/core/shift/shift.service';
import { TimesheetService } from 'app/core/timesheet/timesheet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { pageUrl } from 'app/core/model/pageUrl';

@Component({
  selector: 'app-timesheet-update',
  templateUrl: './timesheet-update.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetUpdateComponent implements OnInit {
  listShift: any;
  defaultShift = [];
  shiftSearchTxt = new Subject<string>();
  shiftSearchLoading = false;
  vn: any;
  timesheet: any;

  updateTimesheet = this.fb.group({
    id: [null],
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
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private shiftService: ShiftService,
    private timesheetService: TimesheetService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ timesheet }) => {
      this.timesheet = timesheet.body ? timesheet.body : timesheet;
      this.updateTimesheet.controls.id.setValue(this.timesheet.id);
      this.updateTimesheet.controls.date.setValue(new Date(this.timesheet.date));
      this.updateTimesheet.controls.endBreaktimeLogId.setValue(this.timesheet.endBreaktimeLogId);
      this.updateTimesheet.controls.goInLogId.setValue(this.timesheet.goInLogId);
      this.updateTimesheet.controls.goOutLogId.setValue(this.timesheet.goOutLogId);
      this.updateTimesheet.controls.shiftId.setValue(this.timesheet.shiftId);
      this.updateTimesheet.controls.startBreaktimeLogId.setValue(this.timesheet.startBreaktimeLogId);
      this.updateTimesheet.controls.statusEndBreaktime.setValue(this.timesheet.statusEndBreaktime);
      this.updateTimesheet.controls.statusGoIn.setValue(this.timesheet.statusGoIn);
      this.updateTimesheet.controls.statusGoOut.setValue(this.timesheet.statusGoOut);
      this.updateTimesheet.controls.statusStartBreaktime.setValue(this.timesheet.statusStartBreaktime);
      this.updateTimesheet.controls.timeDifferenceGoIn.setValue(this.timesheet.timeDifferenceGoIn);
      this.updateTimesheet.controls.timeDifferenceGoOut.setValue(this.timesheet.timeDifferenceGoOut);
      this.updateTimesheet.controls.timeDiffrenceEndBreaktime.setValue(this.timesheet.timeDiffrenceEndBreaktime);
      this.updateTimesheet.controls.timeDiffrenceStartBreaktime.setValue(this.timesheet.timeDiffrenceStartBreaktime);
      this.updateTimesheet.controls.userIdTk.setValue(this.timesheet.userIdTk);
      this.updateTimesheet.controls.verifyTimeEndBreaktime.setValue(new Date(this.timesheet.verifyTimeEndBreaktime));
      this.updateTimesheet.controls.verifyTimeGoOut.setValue(new Date(this.timesheet.verifyTimeGoOut));
      this.updateTimesheet.controls.verifyTimeStartBreaktime.setValue(new Date(this.timesheet.verifyTimeStartBreaktime));
      this.updateTimesheet.controls.verifyTimeGoIn.setValue(new Date(this.timesheet.verifyTimeGoIn));

      // this.beginName = this.folk.name;
    });
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
    if (this.updateTimesheet.value.timeDifferenceGoOut === null) {
      this.updateTimesheet.controls.statusGoOut.reset();
    } else if (this.updateTimesheet.value.timeDifferenceGoOut > 0) {
      this.updateTimesheet.controls.statusGoOut.setValue(0);
    } else if (this.updateTimesheet.value.timeDifferenceGoOut === 0) {
      this.updateTimesheet.controls.statusGoOut.setValue(1);
    }
  }

  changeDifferenceGoIn() {
    if (this.updateTimesheet.value.timeDifferenceGoIn === null) {
      this.updateTimesheet.controls.statusGoIn.reset();
    } else if (this.updateTimesheet.value.timeDifferenceGoIn > 0) {
      this.updateTimesheet.controls.statusGoIn.setValue(0);
    } else if (this.updateTimesheet.value.timeDifferenceGoIn === 0) {
      this.updateTimesheet.controls.statusGoIn.setValue(1);
    }
  }

  changeDiffrenceStartBreaktime() {
    if (this.updateTimesheet.value.timeDiffrenceStartBreaktime === null) {
      this.updateTimesheet.controls.statusStartBreaktime.reset();
    } else if (this.updateTimesheet.value.timeDiffrenceStartBreaktime > 0) {
      this.updateTimesheet.controls.statusStartBreaktime.setValue(0);
    } else if (this.updateTimesheet.value.timeDiffrenceStartBreaktime === 0) {
      this.updateTimesheet.controls.statusStartBreaktime.setValue(1);
    }
  }

  changeDiffrenceEndBreaktime() {
    if (this.updateTimesheet.value.timeDiffrenceEndBreaktime === null) {
      this.updateTimesheet.controls.statusEndBreaktime.reset();
    } else if (this.updateTimesheet.value.timeDiffrenceEndBreaktime > 0) {
      this.updateTimesheet.controls.statusEndBreaktime.setValue(0);
    } else if (this.updateTimesheet.value.timeDiffrenceEndBreaktime === 0) {
      this.updateTimesheet.controls.statusEndBreaktime.setValue(1);
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

  update() {
    this.updateTimesheet.controls.date.markAsDirty();
    this.updateTimesheet.controls.endBreaktimeLogId.markAsDirty();
    this.updateTimesheet.controls.goInLogId.markAsDirty();
    this.updateTimesheet.controls.goOutLogId.markAsDirty();
    this.updateTimesheet.controls.shiftId.markAsDirty();
    this.updateTimesheet.controls.startBreaktimeLogId.markAsDirty();
    this.updateTimesheet.controls.statusEndBreaktime.markAsDirty();
    this.updateTimesheet.controls.statusGoIn.markAsDirty();
    this.updateTimesheet.controls.statusGoOut.markAsDirty();
    this.updateTimesheet.controls.statusStartBreaktime.markAsDirty();
    this.updateTimesheet.controls.timeDifferenceGoIn.markAsDirty();
    this.updateTimesheet.controls.timeDifferenceGoOut.markAsDirty();
    this.updateTimesheet.controls.timeDiffrenceEndBreaktime.markAsDirty();
    this.updateTimesheet.controls.timeDiffrenceStartBreaktime.markAsDirty();
    this.updateTimesheet.controls.userIdTk.markAsDirty();
    this.updateTimesheet.controls.verifyTimeEndBreaktime.markAsDirty();
    this.updateTimesheet.controls.verifyTimeGoOut.markAsDirty();
    this.updateTimesheet.controls.verifyTimeStartBreaktime.markAsDirty();
    this.updateTimesheet.controls.verifyTimeGoIn.markAsDirty();
    if (this.updateTimesheet.valid) {
      const data = this.updateTimesheet.value;
      this.timesheetService.update(data).subscribe(res => {
        this.router.navigate(['timesheet/list']);
      });
    }
  }
}
