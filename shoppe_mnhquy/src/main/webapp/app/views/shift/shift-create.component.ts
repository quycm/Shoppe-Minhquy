import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShiftService } from 'app/core/shift/shift.service';
import { pageUrl } from 'app/core/model/pageUrl';

@Component({
  selector: 'app-shift-create',
  templateUrl: './shift-create.component.html',
  styleUrls: ['./shift.component.scss']
})
export class ShiftCreateComponent implements OnInit {
  formattedDate: any;

  newShift = this.fb.group({
    coefficient: [null, [Validators.required, Validators.max(9999), Validators.min(0)]],
    dayTime: [null],
    endBreakTime: [null, Validators.required],
    endGoIn: [null, Validators.required],
    endGoOut: [null, Validators.required],
    endTime: [null, Validators.required],
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
    // , [Validators.required, Validators.min(0), Validators.max(1440)]
    startBreakTime: [null, Validators.required],
    startGoIn: [null, Validators.required],
    startGoOut: [null, Validators.required],
    startTime: [null, Validators.required],
    status: [1]
  });

  constructor(private fb: FormBuilder, private router: Router, private shiftService: ShiftService) {}

  ngOnInit() {}

  create() {
    this.newShift.controls.coefficient.markAsDirty();
    this.newShift.controls.endBreakTime.markAsDirty();
    this.newShift.controls.endGoIn.markAsDirty();
    this.newShift.controls.endGoOut.markAsDirty();
    this.newShift.controls.endTime.markAsDirty();
    this.newShift.controls.goLateAccept.markAsDirty();
    this.newShift.controls.isNotConfirmEnd.markAsDirty();
    this.newShift.controls.name.markAsDirty();
    this.newShift.controls.overtimeShiftAfter.markAsDirty();
    this.newShift.controls.overtimeShiftBefore.markAsDirty();
    this.newShift.controls.startBreakTime.markAsDirty();
    this.newShift.controls.startGoIn.markAsDirty();
    this.newShift.controls.startGoOut.markAsDirty();
    this.newShift.controls.startTime.markAsDirty();
    console.log('form now: ', this.newShift.valid);
    console.log('overtimeShiftBefore now: ', this.newShift.controls.overtimeShiftBefore.valid);
    console.log('overtimeShiftAfter now: ', this.newShift.controls.overtimeShiftAfter.valid);
    console.log('dayTime now: ', this.newShift.controls.dayTime.valid);
    console.log('nightTime now: ', this.newShift.controls.nightTime.valid);

    if (this.newShift.valid) {
      this.changeTrueFalse();
      this.shiftService.create(this.newShift.value).subscribe(res => {
        this.previousState();
        this.newShift.reset();
      });
    }
  }

  changeOvertimeShiftBefore() {
    if (this.newShift.controls.isOvertimeShiftBefore.value === true) {
      this.newShift.controls.overtimeShiftBefore.markAsDirty();
      this.newShift.controls.overtimeShiftBefore.setValidators([Validators.required, Validators.min(0), Validators.max(1440)]);
      this.newShift.controls.overtimeShiftBefore.updateValueAndValidity();
    } else {
      this.newShift.controls.overtimeShiftBefore.clearValidators();
      this.newShift.controls.overtimeShiftBefore.updateValueAndValidity();
      this.newShift.controls.overtimeShiftBefore.setValue(null);
    }
  }

  changeOvertimeShiftAfter() {
    if (this.newShift.controls.isOvertimeShiftAfter.value === true) {
      this.newShift.controls.overtimeShiftAfter.markAsDirty();
      this.newShift.controls.overtimeShiftAfter.setValidators([Validators.required, Validators.min(0), Validators.max(1440)]);
      this.newShift.controls.overtimeShiftAfter.updateValueAndValidity();
    } else {
      this.newShift.controls.overtimeShiftAfter.clearValidators();
      this.newShift.controls.overtimeShiftAfter.updateValueAndValidity();
      this.newShift.controls.overtimeShiftAfter.setValue(null);
    }
  }

  changeSplitDayNight() {
    if (this.newShift.controls.isSplitDayNight.value === true) {
      this.newShift.controls.dayTime.markAsDirty();
      this.newShift.controls.dayTime.setValidators(Validators.required);
      this.newShift.controls.dayTime.updateValueAndValidity();
      this.newShift.controls.overtimeShiftAfter.markAsDirty();
      this.newShift.controls.nightTime.markAsDirty();
      this.newShift.controls.nightTime.setValidators(Validators.required);
      this.newShift.controls.nightTime.updateValueAndValidity();
      this.newShift.controls.overtimeShiftAfter.markAsDirty();
    } else {
      this.newShift.controls.dayTime.clearValidators();
      this.newShift.controls.dayTime.updateValueAndValidity();
      this.newShift.controls.dayTime.setValue(null);
      this.newShift.controls.nightTime.clearValidators();
      this.newShift.controls.nightTime.updateValueAndValidity();
      this.newShift.controls.nightTime.setValue(null);
    }
  }

  changeTrueFalse() {
    if (this.newShift.controls.isOvertimeShiftBefore.value === true) {
      this.newShift.controls.isOvertimeShiftBefore.setValue(1);
    } else {
      this.newShift.controls.isOvertimeShiftBefore.setValue(0);
    }
    if (this.newShift.controls.isOvertimeShiftAfter.value === true) {
      this.newShift.controls.isOvertimeShiftAfter.setValue(1);
    } else {
      this.newShift.controls.isOvertimeShiftAfter.setValue(0);
    }
    if (this.newShift.controls.leaveEarlyAccept.value === true) {
      this.newShift.controls.leaveEarlyAccept.setValue(1);
    } else {
      this.newShift.controls.leaveEarlyAccept.setValue(0);
    }
    if (this.newShift.controls.goLateAccept.value === true) {
      this.newShift.controls.goLateAccept.setValue(1);
    } else {
      this.newShift.controls.goLateAccept.setValue(0);
    }
    if (this.newShift.controls.isNotConfirmStart.value === true) {
      this.newShift.controls.isNotConfirmStart.setValue(1);
    } else {
      this.newShift.controls.isNotConfirmStart.setValue(0);
    }
    if (this.newShift.controls.isNotConfirmEnd.value === true) {
      this.newShift.controls.isNotConfirmEnd.setValue(1);
    } else {
      this.newShift.controls.isNotConfirmEnd.setValue(0);
    }
    if (this.newShift.controls.isOvernight.value === true) {
      this.newShift.controls.isOvernight.setValue(1);
    } else {
      this.newShift.controls.isOvernight.setValue(0);
    }
    if (this.newShift.controls.isSplitDayNight.value === true) {
      this.newShift.controls.isSplitDayNight.setValue(1);
    } else {
      this.newShift.controls.isSplitDayNight.setValue(0);
    }
  }

  previousState() {
    this.router.navigate([pageUrl.listShift]);
  }
}
