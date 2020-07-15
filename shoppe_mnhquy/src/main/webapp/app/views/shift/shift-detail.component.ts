import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-shift-detail',
  templateUrl: './shift-detail.component.html',
  styleUrls: ['./shift.component.scss']
})
export class ShiftDetailComponent implements OnInit {
  shift: any;
  detailShift = this.fb.group({
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
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ shift }) => {
      this.shift = shift.body ? shift.body : shift;
      this.detailShift.controls.id.setValue(this.shift.id);
      this.detailShift.controls.coefficient.setValue(this.shift.coefficient);
      this.detailShift.controls.dayTime.setValue(new Date(this.shift.dayTime));
      this.detailShift.controls.startTime.setValue(new Date(this.shift.startTime));
      this.detailShift.controls.endBreakTime.setValue(new Date(this.shift.endBreakTime));
      this.detailShift.controls.endGoIn.setValue(new Date(this.shift.endGoIn));
      this.detailShift.controls.endGoOut.setValue(new Date(this.shift.endGoOut));
      this.detailShift.controls.endTime.setValue(new Date(this.shift.endTime));
      this.detailShift.controls.goLateAccept.setValue(this.shift.goLateAccept);
      this.detailShift.controls.isNotConfirmEnd.setValue(this.shift.isNotConfirmEnd);
      this.detailShift.controls.isNotConfirmStart.setValue(this.shift.isNotConfirmStart);
      this.detailShift.controls.isOvernight.setValue(this.shift.isOvernight);
      this.detailShift.controls.isOvertimeShiftAfter.setValue(this.shift.isOvertimeShiftAfter);
      this.detailShift.controls.isOvertimeShiftBefore.setValue(this.shift.isOvertimeShiftBefore);
      this.detailShift.controls.isSplitDayNight.setValue(this.shift.isSplitDayNight);
      this.detailShift.controls.leaveEarlyAccept.setValue(this.shift.leaveEarlyAccept);
      this.detailShift.controls.name.setValue(this.shift.name);
      this.detailShift.controls.nightTime.setValue(new Date(this.shift.nightTime));
      this.detailShift.controls.overtimeShiftAfter.setValue(this.shift.overtimeShiftAfter);
      this.detailShift.controls.overtimeShiftBefore.setValue(this.shift.overtimeShiftBefore);
      this.detailShift.controls.startBreakTime.setValue(new Date(this.shift.startBreakTime));
      this.detailShift.controls.startGoIn.setValue(new Date(this.shift.startGoIn));
      this.detailShift.controls.startGoOut.setValue(new Date(this.shift.startGoOut));
      // this.detailShift.controls.status.setValue(this.shift.status);
      this.change();
    });
  }

  change() {
    if (this.detailShift.controls.isOvertimeShiftBefore.value === 1) {
      this.detailShift.controls.isOvertimeShiftBefore.setValue(true);
    } else {
      this.detailShift.controls.isOvertimeShiftBefore.setValue(false);
    }
    if (this.detailShift.controls.isOvertimeShiftAfter.value === 1) {
      this.detailShift.controls.isOvertimeShiftAfter.setValue(true);
    } else {
      this.detailShift.controls.isOvertimeShiftAfter.setValue(false);
    }
    if (this.detailShift.controls.leaveEarlyAccept.value === 1) {
      this.detailShift.controls.leaveEarlyAccept.setValue(true);
    } else {
      this.detailShift.controls.leaveEarlyAccept.setValue(false);
    }
    if (this.detailShift.controls.goLateAccept.value === 1) {
      this.detailShift.controls.goLateAccept.setValue(true);
    } else {
      this.detailShift.controls.goLateAccept.setValue(false);
    }
    if (this.detailShift.controls.isNotConfirmStart.value === 1) {
      this.detailShift.controls.isNotConfirmStart.setValue(true);
    } else {
      this.detailShift.controls.isNotConfirmStart.setValue(false);
    }
    if (this.detailShift.controls.isNotConfirmEnd.value === 1) {
      this.detailShift.controls.isNotConfirmEnd.setValue(true);
    } else {
      this.detailShift.controls.isNotConfirmEnd.setValue(false);
    }
    if (this.detailShift.controls.isOvernight.value === 1) {
      this.detailShift.controls.isOvernight.setValue(true);
    } else {
      this.detailShift.controls.isOvernight.setValue(false);
    }
    if (this.detailShift.controls.isSplitDayNight.value === 1) {
      this.detailShift.controls.isSplitDayNight.setValue(true);
    } else {
      this.detailShift.controls.isSplitDayNight.setValue(false);
    }
  }
}
