import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ShiftService } from 'app/core/shift/shift.service';
// import { parse } from '@typescript-eslint/parser';
// import { parse } from '@typescript-eslint/parser';
// import * as moment from 'moment';
// import { Calendar } from 'primeng';

@Component({
  selector: 'app-shift-update',
  templateUrl: './shift-update.component.html',
  styleUrls: ['./shift.component.scss']
})
export class ShiftUpdateComponent implements OnInit {
  shift: any;
  startTime: any;
  updateShift = this.fb.group({
    id: [null],
    coefficient: [null],
    dayTime: [null],
    endBreakTime: [null],
    endGoIn: [null],
    endGoOut: [null],
    endTime: [null],
    goLateAccept: [false],
    isNotConfirmEnd: [false],
    isNotConfirmStart: [false],
    isOvernight: [false],
    isOvertimeShiftAfter: [false],
    isOvertimeShiftBefore: [false],
    isSplitDayNight: [false],
    leaveEarlyAccept: [false],
    name: [null, [Validators.required, Validators.pattern('^.{1,255}$')]],
    nightTime: [null],
    overtimeShiftAfter: [null],
    overtimeShiftBefore: [null],
    startBreakTime: [null],
    startGoIn: [null],
    startGoOut: [null],
    startTime: [null],
    status: [1]
  });

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private shiftService: ShiftService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ shift }) => {
      this.shift = shift.body ? shift.body : shift;
      this.updateShift.controls.id.setValue(this.shift.id);
      this.updateShift.controls.coefficient.setValue(this.shift.coefficient);
      this.updateShift.controls.dayTime.setValue(new Date(this.shift.dayTime));
      this.updateShift.controls.startTime.setValue(new Date(this.shift.startTime));
      this.updateShift.controls.endBreakTime.setValue(new Date(this.shift.endBreakTime));
      this.updateShift.controls.endGoIn.setValue(new Date(this.shift.endGoIn));
      this.updateShift.controls.endGoOut.setValue(new Date(this.shift.endGoOut));
      this.updateShift.controls.endTime.setValue(new Date(this.shift.endTime));
      this.updateShift.controls.goLateAccept.setValue(this.shift.goLateAccept);
      this.updateShift.controls.isNotConfirmEnd.setValue(this.shift.isNotConfirmEnd);
      this.updateShift.controls.isNotConfirmStart.setValue(this.shift.isNotConfirmStart);
      this.updateShift.controls.isOvernight.setValue(this.shift.isOvernight);
      this.updateShift.controls.isOvertimeShiftAfter.setValue(this.shift.isOvertimeShiftAfter);
      this.updateShift.controls.isOvertimeShiftBefore.setValue(this.shift.isOvertimeShiftBefore);
      this.updateShift.controls.isSplitDayNight.setValue(this.shift.isSplitDayNight);
      this.updateShift.controls.leaveEarlyAccept.setValue(this.shift.leaveEarlyAccept);
      this.updateShift.controls.name.setValue(this.shift.name);
      this.updateShift.controls.nightTime.setValue(new Date(this.shift.nightTime));
      this.updateShift.controls.overtimeShiftAfter.setValue(this.shift.overtimeShiftAfter);
      this.updateShift.controls.overtimeShiftBefore.setValue(this.shift.overtimeShiftBefore);
      this.updateShift.controls.startBreakTime.setValue(new Date(this.shift.startBreakTime));
      this.updateShift.controls.startGoIn.setValue(new Date(this.shift.startGoIn));
      this.updateShift.controls.startGoOut.setValue(new Date(this.shift.startGoOut));
      this.change();
    });
  }

  changeOvertimeShiftBefore() {
    if (this.updateShift.controls.isOvertimeShiftBefore.value === true) {
      this.updateShift.controls.overtimeShiftBefore.markAsDirty();
      this.updateShift.controls.overtimeShiftBefore.setValidators([Validators.required, Validators.min(0), Validators.max(1440)]);
      this.updateShift.controls.overtimeShiftBefore.updateValueAndValidity();
    } else {
      this.updateShift.controls.overtimeShiftBefore.clearValidators();
      this.updateShift.controls.overtimeShiftBefore.updateValueAndValidity();
      this.updateShift.controls.overtimeShiftBefore.setValue(null);
    }
  }

  changeOvertimeShiftAfter() {
    if (this.updateShift.controls.isOvertimeShiftAfter.value === true) {
      this.updateShift.controls.overtimeShiftAfter.markAsDirty();
      this.updateShift.controls.overtimeShiftAfter.setValidators([Validators.required, Validators.min(0), Validators.max(1440)]);
      this.updateShift.controls.overtimeShiftAfter.updateValueAndValidity();
    } else {
      this.updateShift.controls.overtimeShiftAfter.clearValidators();
      this.updateShift.controls.overtimeShiftAfter.updateValueAndValidity();
      this.updateShift.controls.overtimeShiftAfter.setValue(null);
    }
  }

  changeSplitDayNight() {
    if (this.updateShift.controls.isSplitDayNight.value === true) {
      this.updateShift.controls.dayTime.markAsDirty();
      this.updateShift.controls.dayTime.setValidators(Validators.required);
      this.updateShift.controls.dayTime.updateValueAndValidity();
      this.updateShift.controls.overtimeShiftAfter.markAsDirty();
      this.updateShift.controls.nightTime.markAsDirty();
      this.updateShift.controls.nightTime.setValidators(Validators.required);
      this.updateShift.controls.nightTime.updateValueAndValidity();
      this.updateShift.controls.overtimeShiftAfter.markAsDirty();
    } else {
      this.updateShift.controls.dayTime.clearValidators();
      this.updateShift.controls.dayTime.updateValueAndValidity();
      this.updateShift.controls.dayTime.setValue(null);
      this.updateShift.controls.nightTime.clearValidators();
      this.updateShift.controls.nightTime.updateValueAndValidity();
      this.updateShift.controls.nightTime.setValue(null);
    }
  }

  update() {
    this.updateShift.controls.coefficient.markAsDirty();
    this.updateShift.controls.dayTime.markAsDirty();
    this.updateShift.controls.endBreakTime.markAsDirty();
    this.updateShift.controls.endGoIn.markAsDirty();
    this.updateShift.controls.endGoOut.markAsDirty();
    this.updateShift.controls.endTime.markAsDirty();
    this.updateShift.controls.goLateAccept.markAsDirty();
    this.updateShift.controls.isNotConfirmEnd.markAsDirty();
    this.updateShift.controls.name.markAsDirty();
    this.updateShift.controls.nightTime.markAsDirty();
    this.updateShift.controls.overtimeShiftAfter.markAsDirty();
    this.updateShift.controls.overtimeShiftBefore.markAsDirty();
    this.updateShift.controls.startBreakTime.markAsDirty();
    this.updateShift.controls.startGoIn.markAsDirty();
    this.updateShift.controls.startGoOut.markAsDirty();
    this.updateShift.controls.startTime.markAsDirty();
    if (this.updateShift.valid) {
      this.changeTrueFalse();
      const data = this.updateShift.value;
      this.shiftService.update(data).subscribe(res => {
        console.log(res);
        this.router.navigate(['shift/list']);
      });
    }
  }

  changeTrueFalse() {
    if (this.updateShift.controls.isOvertimeShiftBefore.value === true) {
      this.updateShift.controls.isOvertimeShiftBefore.setValue(1);
    } else {
      this.updateShift.controls.isOvertimeShiftBefore.setValue(0);
    }
    if (this.updateShift.controls.isOvertimeShiftAfter.value === true) {
      this.updateShift.controls.isOvertimeShiftAfter.setValue(1);
    } else {
      this.updateShift.controls.isOvertimeShiftAfter.setValue(0);
    }
    if (this.updateShift.controls.leaveEarlyAccept.value === true) {
      this.updateShift.controls.leaveEarlyAccept.setValue(1);
    } else {
      this.updateShift.controls.leaveEarlyAccept.setValue(0);
    }
    if (this.updateShift.controls.goLateAccept.value === true) {
      this.updateShift.controls.goLateAccept.setValue(1);
    } else {
      this.updateShift.controls.goLateAccept.setValue(0);
    }
    if (this.updateShift.controls.isNotConfirmStart.value === true) {
      this.updateShift.controls.isNotConfirmStart.setValue(1);
    } else {
      this.updateShift.controls.isNotConfirmStart.setValue(0);
    }
    if (this.updateShift.controls.isNotConfirmEnd.value === true) {
      this.updateShift.controls.isNotConfirmEnd.setValue(1);
    } else {
      this.updateShift.controls.isNotConfirmEnd.setValue(0);
    }
    if (this.updateShift.controls.isOvernight.value === true) {
      this.updateShift.controls.isOvernight.setValue(1);
    } else {
      this.updateShift.controls.isOvernight.setValue(0);
    }
    if (this.updateShift.controls.isSplitDayNight.value === true) {
      this.updateShift.controls.isSplitDayNight.setValue(1);
    } else {
      this.updateShift.controls.isSplitDayNight.setValue(0);
    }
  }

  change() {
    if (this.updateShift.controls.isOvertimeShiftBefore.value === 1) {
      this.updateShift.controls.isOvertimeShiftBefore.setValue(true);
    } else {
      this.updateShift.controls.isOvertimeShiftBefore.setValue(false);
    }
    if (this.updateShift.controls.isOvertimeShiftAfter.value === 1) {
      this.updateShift.controls.isOvertimeShiftAfter.setValue(true);
    } else {
      this.updateShift.controls.isOvertimeShiftAfter.setValue(false);
    }
    if (this.updateShift.controls.leaveEarlyAccept.value === 1) {
      this.updateShift.controls.leaveEarlyAccept.setValue(true);
    } else {
      this.updateShift.controls.leaveEarlyAccept.setValue(false);
    }
    if (this.updateShift.controls.goLateAccept.value === 1) {
      this.updateShift.controls.goLateAccept.setValue(true);
    } else {
      this.updateShift.controls.goLateAccept.setValue(false);
    }
    if (this.updateShift.controls.isNotConfirmStart.value === 1) {
      this.updateShift.controls.isNotConfirmStart.setValue(true);
    } else {
      this.updateShift.controls.isNotConfirmStart.setValue(false);
    }
    if (this.updateShift.controls.isNotConfirmEnd.value === 1) {
      this.updateShift.controls.isNotConfirmEnd.setValue(true);
    } else {
      this.updateShift.controls.isNotConfirmEnd.setValue(false);
    }
    if (this.updateShift.controls.isOvernight.value === 1) {
      this.updateShift.controls.isOvernight.setValue(true);
    } else {
      this.updateShift.controls.isOvernight.setValue(false);
    }
    if (this.updateShift.controls.isSplitDayNight.value === 1) {
      this.updateShift.controls.isSplitDayNight.setValue(true);
    } else {
      this.updateShift.controls.isSplitDayNight.setValue(false);
    }
  }
}
