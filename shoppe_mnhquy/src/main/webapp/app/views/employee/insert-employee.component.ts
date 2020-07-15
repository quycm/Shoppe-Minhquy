import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'app/core/employee/employee.service';
import { ConfirmationService } from 'primeng/api';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { DepartmentService } from 'app/core/department/department.service';
import { concat, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { PositionService } from 'app/core/position/position.service';
import { FolkService } from 'app/core/folk/folk.service';
import { BonusService } from 'app/core/bonus/bonus.service';
import * as moment from 'moment';

@Component({
  selector: 'app-insert-employee',
  templateUrl: './insert-employee.component.html',
  styleUrls: ['./insert-employee.component.scss']
})
export class InsertEmployeeComponent implements OnInit {
  hasData = false;
  loading = false;
  countPrice: number;
  listFolk: any;
  defaultFolk = [];
  folkSearchTxt = new Subject<string>();
  folkSearchLoading = false;
  listDepartment: any;
  defaultDepartment = [];
  departmentSearchTxt = new Subject<string>();
  departmentSearchLoading = false;
  listBonus: any;
  bonusSearchTxt = new Subject<string>();
  bonusSearchLoading = false;
  defaultBonus = [];
  listPositon: any;
  positionSearchTxt = new Subject<string>();
  positionSearchLoading = false;
  defaultPosition = [];
  department: any = [];
  position: any = [];
  folk: any = [];
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  day = this.now.getDay();
  minDate = moment({ year: this.year - 100, month: this.month, day: this.day }).format('YYYY-MM-DD');

  maxDate = moment({ year: this.year, month: this.month, day: this.day }).format('YYYY-MM-DD');
  genders: any;
  createUser = new FormGroup({
    name: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9._]+@[a-z0-9.-]+[.][a-z]{2,}$')]),
    dob: new FormControl(null, Validators.required),
    gender: new FormControl(1, Validators.required),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
    departmentid: new FormControl(null, Validators.required),
    positionid: new FormControl(null, Validators.required),
    folkid: new FormControl(null, Validators.required),
    bonusid: new FormControl(null, Validators.required)
  });
  msgs: Message;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private confirmationService: ConfirmationService,
    private departmentService: DepartmentService,
    private positionService: PositionService,
    private folkService: FolkService,
    private bonusService: BonusService
  ) {}

  ngOnInit() {
    this.genders = [{ label: 'Nam', value: 1 }, { label: 'Nữ', value: 0 }];
    this.selectDepartment();
    this.selectPosition();
    this.selectFolk();
    this.selectBonus();
  }

  maskAsDirty() {
    this.createUser.controls.name.markAsDirty();
    this.createUser.controls.address.markAsDirty();
    this.createUser.controls.email.markAsDirty();
    this.createUser.controls.dob.markAsDirty();
    this.createUser.controls.phone.markAsDirty();
    this.createUser.controls.departmentid.markAsDirty();
    this.createUser.controls.positionid.markAsDirty();
    this.createUser.controls.folkid.markAsDirty();
    this.createUser.controls.bonusid.markAsDirty();
  }

  /**
   * Method create product
   */
  create() {
    this.maskAsDirty();
    console.log(this.createUser.get('phone'));
    if (this.createUser.valid) {
      const data = this.createUser.value;
      this.employeeService.create(data).subscribe(res => {
        if (res) {
          this.confirmationService.confirm({
            message: 'Tạo thành công!Anh(chị) có muốn tạo thêm nhân viên?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.ngOnInit();
            },
            reject: () => {
              this.router.navigate(['employee']);
            }
          });
        }
        this.createUser.reset();
      });
    }
  }

  selectFolk() {
    this.listFolk = concat(
      of(this.defaultFolk),
      this.folkService
        .getListFolk({
          page: 0,
          size: 10
        })
        .pipe(
          map((data: any) => {
            return data.body;
          })
        ),
      this.folkSearchTxt.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => (this.folkSearchLoading = true)),
        switchMap(t => {
          return this.folkService
            .getListFolk({
              name: t ? t : '',
              page: 0,
              size: 10
            })
            .pipe(
              catchError(() => of({ body: [] })),
              tap(() => (this.folkSearchLoading = false))
            );
        }),
        map((data: any) => {
          return data.body;
        })
      )
    );
  }

  selectBonus() {
    this.listBonus = concat(
      of(this.defaultBonus),
      this.bonusService
        .filterBonus({
          page: 0,
          size: 10
        })
        .pipe(
          map((data: any) => {
            return data.body;
          })
        ),
      this.bonusSearchTxt.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => (this.bonusSearchLoading = true)),
        switchMap(t => {
          return this.bonusService
            .filterBonus({
              name: t ? t : '',
              page: 0,
              size: 10
            })
            .pipe(
              catchError(() => of({ body: [] })),
              tap(() => (this.bonusSearchLoading = false))
            );
        }),
        map((data: any) => {
          return data.body;
        })
      )
    );
  }

  selectPosition() {
    this.listPositon = concat(
      of(this.defaultPosition),
      this.positionService
        .filter({
          page: 0,
          size: 10
        })
        .pipe(),
      this.positionSearchTxt.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => (this.positionSearchLoading = true)),
        switchMap(t => {
          return this.positionService
            .filter({
              name: t ? t : '',
              page: 0,
              size: 10
            })
            .pipe(
              catchError(() => of({ body: [] })),
              tap(() => (this.positionSearchLoading = false))
            );
        })
      )
    );
  }

  selectDepartment() {
    this.listDepartment = concat(
      of(this.defaultDepartment),
      this.departmentService
        .filter({
          page: 0,
          size: 10
        })
        .pipe(),
      this.departmentSearchTxt.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => (this.departmentSearchLoading = true)),
        switchMap(t => {
          return this.departmentService
            .filter({
              name: t ? t : '',
              page: 0,
              size: 10
            })
            .pipe(
              catchError(() => of({ body: [] })),
              tap(() => (this.departmentSearchLoading = false))
            );
        })
      )
    );
  }
}
