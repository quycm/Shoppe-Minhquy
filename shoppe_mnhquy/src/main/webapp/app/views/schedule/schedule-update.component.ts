import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { concat, of, Subject } from 'rxjs';
import { EmployeeService } from 'app/core/employee/employee.service';
import { ShiftService } from 'app/core/shift/shift.service';
import { ScheduleService } from 'app/core/schedule/schedule.service';
import { pageUrl } from 'app/core/model/pageUrl';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-schedule-update',
  templateUrl: './schedule-update.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleUpdateComponent implements OnInit {
  schedule: any;
  listEmployee: any;
  defaultEmployee = [];

  employeeLoading = false;
  employeeSearchTxt = new Subject<string>();
  listShiftMonday: any;
  listShiftTuesday: any;
  listShiftWednesday: any;
  listShiftThursday: any;
  listShiftFriday: any;
  listShiftSaturday: any;
  listShiftSunday: any;
  defaultShiftMonday = [];
  defaultShiftTuesday = [];
  defaultShiftWednesday = [];
  defaultShiftThursday = [];
  defaultShiftFriday = [];
  defaultShiftSaturday = [];
  defaultShiftSunday = [];
  shiftMondaySearchTxt = new Subject<string>();
  shiftTuesdaySearchTxt = new Subject<string>();
  shiftWednesdaySearchTxt = new Subject<string>();
  shiftThursdaySearchTxt = new Subject<string>();
  shiftFridaySearchTxt = new Subject<string>();
  shiftSaturdaySearchTxt = new Subject<string>();
  shiftSundaySearchTxt = new Subject<string>();
  shiftSearchLoadingMonday = false;
  shiftSearchLoadingTuesday = false;
  shiftSearchLoadingWednesday = false;
  shiftSearchLoadingThursday = false;
  shiftSearchLoadingFriday = false;
  shiftSearchLoadingSaturday = false;
  shiftSearchLoadingSunday = false;

  updateSchedule = this.fb.group({
    id: [null],
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
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private shiftService: ShiftService,
    private scheduleService: ScheduleService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadAllEmployee();
    this.selectShiftMonday();
    this.selectShiftFriday();
    this.selectShiftSaturday();
    this.selectShiftSunday();
    this.selectShiftThursday();
    this.selectShiftTuesday();
    this.selectShiftWednesday();
    this.activatedRoute.data.subscribe(({ schedule }) => {
      this.schedule = schedule.body ? schedule.body : schedule;
      this.updateSchedule.controls.id.setValue(this.schedule.id);
      this.updateSchedule.controls.name.setValue(this.schedule.name);
      this.updateSchedule.controls.mondayShiftId.setValue(this.schedule.mondayShiftId);
      this.updateSchedule.controls.tuesdayShiftId.setValue(this.schedule.tuesdayShiftId);
      this.updateSchedule.controls.wednesdayShiftId.setValue(this.schedule.wednesdayShiftId);
      this.updateSchedule.controls.thursdayShiftId.setValue(this.schedule.thursdayShiftId);
      this.updateSchedule.controls.fridayShiftId.setValue(this.schedule.fridayShiftId);
      this.updateSchedule.controls.saturdayShiftId.setValue(this.schedule.saturdayShiftId);
      this.updateSchedule.controls.sundayShiftId.setValue(this.schedule.sundayShiftId);
      this.updateSchedule.controls.employeeId.setValue(this.schedule.employees.id);
    });
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

  update() {
    if (this.updateSchedule.valid) {
      const data = this.updateSchedule.value;
      this.scheduleService.update(data).subscribe(() => {
        this.previousState();
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
