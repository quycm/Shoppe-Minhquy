import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { concat, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, finalize, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from 'app/core/user/user.service';
import { ConfirmationService } from 'primeng/api';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { CompanyService } from 'app/core/company/company.service';

@Component({
  selector: 'app-insert-user',
  templateUrl: './insert-user.component.html',
  styleUrls: ['./insert-user.component.scss']
})
export class InsertUserComponent implements OnInit {
  authen: any = [];
  hasData = false;
  listCompany: any;
  defaultCompany = [];
  companySearchTxt = new Subject<string>();
  companySearchLoading = false;
  loading = false;
  alternate = true;
  pageInfo: any = {};
  dataSource: any = [];
  prices: any[] = [];
  countPrice: number;
  listPrices: any[] = [];
  checkError = false;
  createUser = this.fb.group(
    {
      login: ['', Validators.required],
      password: ['', [Validators.required, Validators.maxLength(50)]],
      confirmPassword: ['', [Validators.required]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._]+@[a-z0-9.-]+[.][a-z]{2,}$')]],
      activated: [''],
      companyid: [''],
      authorities: ['', Validators.required]
    },
    { validator: this.checkPasswords }
  );
  msgs: Message;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private companyService: CompanyService
  ) {}

  ngOnInit() {
    this.selectCompany();
    this.getAllRole();
  }
  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  /**
   * Method create product
   */
  create() {
    if (!this.createUser.valid) {
      this.checkError = true;
    }
    if (this.createUser.valid) {
      const data = this.createUser.value;

      this.userService.create(data).subscribe(res => {
        this.createUser.patchValue(res);

        if (res) {
          this.confirmationService.confirm({
            message: 'Tạo thành công! Anh(chị) có muốn tạo thêm?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.ngOnInit();
            },
            reject: () => {
              this.router.navigate(['user']);
            }
          });
        }
        this.createUser.reset();
      });
    }
  }

  getAllRole() {
    this.userService
      .authorities()
      .pipe(
        catchError(() => of([])),
        finalize(() => (this.loading = false))
      )
      .subscribe((res: any) => {
        if (res) {
          this.authen = res;
          this.hasData = true;
        } else {
          this.hasData = false;
        }
      });
  }
  /**
   * Method create product
   */

  selectCompany() {
    this.listCompany = concat(
      of(this.defaultCompany),
      this.companyService
        .getALL({
          page: 0,
          size: 10
        })
        .pipe(
          map((data: any) => {
            return data.body;
          })
        ),
      this.companySearchTxt.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => (this.companySearchLoading = true)),
        switchMap(t => {
          return this.companyService
            .getALL({
              name: t ? t : '',
              page: 0,
              size: 10
            })
            .pipe(
              catchError(() => of({ body: [] })),
              tap(() => (this.companySearchLoading = false))
            );
        }),
        map((data: any) => {
          return data.body;
        })
      )
    );
  }
  // uploadFile(event) {

  // }
}
