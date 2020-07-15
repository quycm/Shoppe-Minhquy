import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'app/core/employee/employee.service';
import { ShiftService } from 'app/core/shift/shift.service';
import { concat, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { ScheduleService } from 'app/core/schedule/schedule.service';
import { pageUrl } from 'app/core/model/pageUrl';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule-create',
  templateUrl: './schedule-create.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleCreateComponent implements OnInit {
  listEmployee: any;
  listShiftMonday: any;
  listShiftTuesday: any;
  listShiftWednesday: any;
  listShiftThursday: any;
  listShiftFriday: any;
  listShiftSaturday: any;
  listShiftSunday: any;
  defaultEmployee = [];
  defaultShiftMonday = [];
  defaultShiftTuesday = [];
  defaultShiftWednesday = [];
  defaultShiftThursday = [];
  defaultShiftFriday = [];
  defaultShiftSaturday = [];
  defaultShiftSunday = [];
  employeeSearchTxt = new Subject<string>();
  shiftMondaySearchTxt = new Subject<string>();
  shiftTuesdaySearchTxt = new Subject<string>();
  shiftWednesdaySearchTxt = new Subject<string>();
  shiftThursdaySearchTxt = new Subject<string>();
  shiftFridaySearchTxt = new Subject<string>();
  shiftSaturdaySearchTxt = new Subject<string>();
  shiftSundaySearchTxt = new Subject<string>();
  employeeLoading = false;
  shiftSearchLoadingMonday = false;
  shiftSearchLoadingTuesday = false;
  shiftSearchLoadingWednesday = false;
  shiftSearchLoadingThursday = false;
  shiftSearchLoadingFriday = false;
  shiftSearchLoadingSaturday = false;
  shiftSearchLoadingSunday = false;

  newSchedule = this.fb.group({
    name: [null, [Validators.required, Validators.pattern('^.{1,255}$')]],
    mondayShiftId: [null, Validators.required],
    tuesdayShiftId: [null, Validators.required],
    wednesdayShiftId: [null, Validators.required],
    thursdayShiftId: [null, Validators.required],
    fridayShiftId: [null, Validators.required],
    saturdayShiftId: [null, Validators.required],
    sundayShiftId: [null, Validators.required],
    employeeId: [null, Validators.required]
  });

  constructor(
    private employeeService: EmployeeService,
    private shiftService: ShiftService,
    private scheduleService: ScheduleService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.selectShiftMonday();
    this.selectShiftFriday();
    this.selectShiftSaturday();
    this.selectShiftSunday();
    this.selectShiftThursday();
    this.selectShiftTuesday();
    this.selectShiftWednesday();
    this.loadAllEmployee();
  }

  loadAllEmployee() {
    this.listEmployee = concat(
      of(this.defaultEmployee),
      this.employeeService
        .filter({
          page: 0,
          size: 10
        })
        .pipe(
          map((data: any) => {
            return data;
          })
        ),
      this.employeeSearchTxt.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => (this.employeeLoading = true)),
        switchMap(t => {
          return this.employeeService
            .filter({
              name: t ? t : '',
              page: 0,
              size: 10
            })
            .pipe(
              catchError(() => of({ body: [] })),
              tap(() => (this.employeeLoading = false))
            );
        }),
        map((data: any) => {
          return data;
        })
      )
    );
  }

  create() {
    this.newSchedule.controls.name.markAsDirty();
    this.newSchedule.controls.tuesdayShiftId.markAsDirty();
    this.newSchedule.controls.mondayShiftId.markAsDirty();
    this.newSchedule.controls.wednesdayShiftId.markAsDirty();
    this.newSchedule.controls.thursdayShiftId.markAsDirty();
    this.newSchedule.controls.fridayShiftId.markAsDirty();
    this.newSchedule.controls.saturdayShiftId.markAsDirty();
    this.newSchedule.controls.sundayShiftId.markAsDirty();
    this.newSchedule.controls.employeeId.markAsDirty();
    if (this.newSchedule.valid) {
      this.scheduleService.create(this.newSchedule.value).subscribe(res => {
        this.previousState();
        this.newSchedule.reset();
      });
    }
  }

  previousState() {
    this.router.navigate([pageUrl.listSchedule]);
  }

  selectShiftMonday() {
    this.listShiftMonday = concat(
      of(this.defaultShiftMonday),
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
      this.shiftMondaySearchTxt.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => (this.shiftSearchLoadingMonday = true)),
        switchMap(t => {
          return this.shiftService
            .getListShift({
              name: t ? t : '',
              page: 0,
              size: 10
            })
            .pipe(
              catchError(() => of({ body: [] })),
              tap(() => (this.shiftSearchLoadingMonday = false))
            );
        }),
        map((data: any) => {
          return data.body;
        })
      )
    );
  }

  selectShiftTuesday() {
    this.listShiftTuesday = concat(
      of(this.defaultShiftTuesday),
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
      this.shiftTuesdaySearchTxt.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => (this.shiftSearchLoadingTuesday = true)),
        switchMap(t => {
          return this.shiftService
            .getListShift({
              name: t ? t : '',
              page: 0,
              size: 10
            })
            .pipe(
              catchError(() => of({ body: [] })),
              tap(() => (this.shiftSearchLoadingMonday = false))
            );
        }),
        map((data: any) => {
          return data.body;
        })
      )
    );
  }

  selectShiftWednesday() {
    this.listShiftWednesday = concat(
      of(this.defaultShiftWednesday),
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
      this.shiftWednesdaySearchTxt.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => (this.shiftSearchLoadingWednesday = true)),
        switchMap(t => {
          return this.shiftService
            .getListShift({
              name: t ? t : '',
              page: 0,
              size: 10
            })
            .pipe(
              catchError(() => of({ body: [] })),
              tap(() => (this.shiftSearchLoadingWednesday = false))
            );
        }),
        map((data: any) => {
          return data.body;
        })
      )
    );
  }

  selectShiftThursday() {
    this.listShiftThursday = concat(
      of(this.defaultShiftThursday),
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
      this.shiftThursdaySearchTxt.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => (this.shiftSearchLoadingThursday = true)),
        switchMap(t => {
          return this.shiftService
            .getListShift({
              name: t ? t : '',
              page: 0,
              size: 10
            })
            .pipe(
              catchError(() => of({ body: [] })),
              tap(() => (this.shiftSearchLoadingThursday = false))
            );
        }),
        map((data: any) => {
          return data.body;
        })
      )
    );
  }

  selectShiftFriday() {
    this.listShiftFriday = concat(
      of(this.defaultShiftFriday),
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
      this.shiftFridaySearchTxt.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => (this.shiftSearchLoadingFriday = true)),
        switchMap(t => {
          return this.shiftService
            .getListShift({
              name: t ? t : '',
              page: 0,
              size: 10
            })
            .pipe(
              catchError(() => of({ body: [] })),
              tap(() => (this.shiftSearchLoadingFriday = false))
            );
        }),
        map((data: any) => {
          return data.body;
        })
      )
    );
  }

  selectShiftSaturday() {
    this.listShiftSaturday = concat(
      of(this.defaultShiftSaturday),
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
      this.shiftSaturdaySearchTxt.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => (this.shiftSearchLoadingSaturday = true)),
        switchMap(t => {
          return this.shiftService
            .getListShift({
              name: t ? t : '',
              page: 0,
              size: 10
            })
            .pipe(
              catchError(() => of({ body: [] })),
              tap(() => (this.shiftSearchLoadingSaturday = false))
            );
        }),
        map((data: any) => {
          return data.body;
        })
      )
    );
  }

  selectShiftSunday() {
    this.listShiftSunday = concat(
      of(this.defaultShiftSunday),
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
      this.shiftSundaySearchTxt.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => (this.shiftSearchLoadingSunday = true)),
        switchMap(t => {
          return this.shiftService
            .getListShift({
              name: t ? t : '',
              page: 0,
              size: 10
            })
            .pipe(
              catchError(() => of({ body: [] })),
              tap(() => (this.shiftSearchLoadingSunday = false))
            );
        }),
        map((data: any) => {
          return data.body;
        })
      )
    );
  }
}
