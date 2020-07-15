import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { concat, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { CompanyService } from 'app/core/company/company.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { UserService } from '../../../core/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  listCompany: any;
  defaultCompany = [];
  companySearchTxt = new Subject<string>();
  companySearchLoading = false;

  createUser = new FormGroup(
    {
      login: new FormControl('', [
        Validators.required,
        Validators.pattern('^[_.@A-Za-z0-9-]*$'),
        Validators.minLength(5),
        Validators.maxLength(50)
      ]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      firstName: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[^0-9]*[ ]*[^!@#$%^&*()_+=-][^":;<>,.?|/]$')
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[^0-9]*[ ]*[^!@#$%^&*()_+=-][^":;<>,.?|/]$')
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
        Validators.pattern('[a-zA-Z0-9._]+@[a-z0-9.-]+.[a-z]{2,}$')
      ]),
      // activated: new FormControl(true),
      companyid: new FormControl(null, Validators.required),
      authorities: new FormControl(['ROLE_USER'])
    },
    [this.checkPasswords]
  );

  mess: any;

  constructor(private fb: FormBuilder, private companyService: CompanyService, private accountService: UserService) {}

  ngOnInit() {
    this.selectCompany();
  }

  register() {
    this.createUser.controls.login.markAsDirty();
    this.createUser.controls.password.markAsDirty();
    this.createUser.controls.confirmPassword.markAsDirty();
    this.createUser.controls.firstName.markAsDirty();
    this.createUser.controls.lastName.markAsDirty();
    this.createUser.controls.email.markAsDirty();
    this.createUser.controls.companyid.markAsDirty();
    if (this.createUser.valid) {
      const data = this.createUser.value;
      this.accountService.register(data).subscribe(
        (res: HttpResponse<any>) => {
          this.mess = 1;
          this.createUser.reset();
          this.createUser.patchValue(res);
        },
        (error: HttpErrorResponse) => {
          console.log('error: ', error);
          this.mess = 2;
        }
      );
    }
    // this.createUser.patchValue(res);
    //     this.createUser.reset();
  }

  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notSame: true };
  }

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
}
