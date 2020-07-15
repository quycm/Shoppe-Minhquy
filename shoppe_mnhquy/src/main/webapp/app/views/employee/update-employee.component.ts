import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { EmployeeService } from 'app/core/employee/employee.service';
import { IEmployee } from 'app/core/employee/employee.model';
import { DepartmentService } from 'app/core/department/department.service';
import { concat, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, finalize, map, switchMap, tap } from 'rxjs/operators';
import { PositionService } from 'app/core/position/position.service';
import { FolkService } from 'app/core/folk/folk.service';
import { BonusService } from 'app/core/bonus/bonus.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {
  checkError = false;
  employee: IEmployee;
  hasData = false;
  loading = false;
  departments: any = [];
  positions: any = [];
  folks: any = [];
  dataSource: any = [];
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
  genders: any;
  positionSearchTxt = new Subject<string>();
  positionSearchLoading = false;
  defaultPosition = [];

  createUser = this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    email: ['', Validators.required],
    dob: ['', Validators.required],
    gender: [1, Validators.required],
    phone: ['', Validators.required],
    departmentid: ['', Validators.required],
    positionid: ['', Validators.required],
    folkid: ['', Validators.required],
    bonusid: [null, Validators.required]
  });
  msgs: Message;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private emplyeeService: EmployeeService,
    private confirmationService: ConfirmationService,
    private activatedRoute: ActivatedRoute,
    private departmentService: DepartmentService,
    private positionService: PositionService,
    private folkService: FolkService,
    private bonusService: BonusService
  ) {}

  ngOnInit() {
    this.genders = [{ label: 'Nam', value: 1 }, { label: 'Nữ', value: 0 }];
    this.selectBonus();
    this.selectDepartment();
    this.selectPosition();
    this.getAllUser();
    this.selectFolk();
    this.activatedRoute.data.subscribe(({ employee }) => {
      this.employee = employee.body ? employee.body : employee;
      console.log('employee: ', employee);
      if (this.employee.id) {
        this.createUser.get('name').setValue(this.employee.name);
        this.createUser.get('gender').setValue(this.employee.gender);
        this.createUser.get('address').setValue(this.employee.address);
        this.createUser.get('email').setValue(this.employee.email);
        console.log('dob: ', formatDate(new Date(this.employee.dob), 'yyyy-MM-dd', 'en-US'));
        this.createUser.get('dob').setValue(formatDate(new Date(this.employee.dob), 'yyyy-MM-dd', 'en-US'));
        this.createUser.get('phone').setValue(this.employee.phone);
        this.createUser.get('departmentid').setValue(this.employee.departmentid);
        this.createUser.get('positionid').setValue(this.employee.positionid);
        this.createUser.get('folkid').setValue(this.employee.folkid);
        this.createUser.get('bonusid').setValue(this.employee.bonusid);
      }
    });
  }

  maskAsDirty() {
    this.createUser.controls.name.markAsDirty();
    this.createUser.controls.address.markAsDirty();
    this.createUser.controls.email.markAsDirty();
    this.createUser.controls.gender.markAsDirty();
    this.createUser.controls.dob.markAsDirty();
    this.createUser.controls.phone.markAsDirty();
    this.createUser.controls.departmentid.markAsDirty();
    this.createUser.controls.positionid.markAsDirty();
    this.createUser.controls.folkid.markAsDirty();
    this.createUser.controls.bonusid.markAsDirty();
  }

  confirm() {
    this.maskAsDirty();
    this.confirmationService.confirm({
      message: 'Anh(chị) có muốn lưu không?',
      accept: () => {
        const data: IEmployee = this.createUser.getRawValue();

        if (this.employee.id) {
          data.id = this.employee.id;
          this.emplyeeService.update(data).subscribe(res => {
            if (res) {
              this.router.navigate(['employee']);
            }
          });
        }
      }
    });
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

  getAllUser() {
    this.emplyeeService
      .getALL()
      .pipe(
        catchError(() => of([])),
        finalize(() => (this.loading = false))
      )
      .subscribe((res: any) => {
        if (res) {
          this.dataSource = res;
          this.hasData = true;
        } else {
          this.hasData = false;
        }
      });
  }

  onProfitSelectionChange(entry): void {
    this.dataSource.gender = entry;
  }

  get name() {
    return this.createUser.get('name');
  }

  get address() {
    return this.createUser.get('address');
  }

  get email() {
    return this.createUser.get('email');
  }

  get dob() {
    return this.createUser.get('dob');
  }

  get gender() {
    return this.createUser.get('gender');
  }

  get phone() {
    return this.createUser.get('phone');
  }

  get department() {
    return this.createUser.get('department');
  }

  get position() {
    return this.createUser.get('position');
  }

  get folk() {
    return this.createUser.get('folk');
  }
}
