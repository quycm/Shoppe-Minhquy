import { Component, OnInit } from '@angular/core';
import { concat, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, finalize, map, switchMap, tap } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'app/core/user/user.service';
import { ConfirmationService } from 'primeng/api';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { IUser } from 'app/core/user/user.model';
import { CompanyService } from 'app/core/company/company.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateuserComponent implements OnInit {
  authen: any = [];
  hasData = false;
  loading = false;
  checkError = false;
  user: IUser;
  listCompany: any;
  defaultCompany = [];
  companySearchTxt = new Subject<string>();
  companySearchLoading = false;
  createUser = this.fb.group(
    {
      id: [''],
      companyid: [''],
      login: ['', Validators.required],
      authorities: ['', Validators.required],
      confirmPassword: ['', [Validators.required]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      activated: ['']
    },
    {
      // validator: this.checkPasswords
    }
  );
  msgs: Message;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private activatedRoute: ActivatedRoute,
    private service: UserService,
    private companyService: CompanyService
  ) {}

  ngOnInit() {
    const login = this.activatedRoute.snapshot.paramMap.get('login');
    this.service.find(login).subscribe((user: any) => {
      this.user = user.body ? user.body : user;
      if (this.user.id) {
        this.login.disable();
        this.id.setValue(this.user.id);
        this.companyid.setValue(this.user.companyid);
        this.login.setValue(this.user.login);
        this.firstName.setValue(this.user.firstName);
        this.lastName.setValue(this.user.lastName);
        this.email.setValue(this.user.email);
        this.activated.setValue(this.user.activated);
        this.authorities.setValue(this.user.authorities);
      }
    });

    this.getAllRole();
    this.selectCompany();
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
  // checkPasswords(group: FormGroup) {
  //   const pass = group.controls.password.value;
  //   const confirmPass = group.controls.confirmPassword.value;

  //   return pass === confirmPass ? null : { notSame: true };
  // }

  getAllCompany() {
    this.companyService
      .getALL()
      .pipe(
        catchError(() => of([])),
        finalize(() => (this.loading = false))
      )
      .subscribe((res: any) => {
        if (res) {
          this.authen = res;
          console.log(this.authen);
          this.hasData = true;
        } else {
          this.hasData = false;
        }
      });
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Anh(chị) có muốn lưu?',
      accept: () => {
        const data: IUser = this.createUser.getRawValue();
        if (this.user.id) {
          data.id = this.user.id;
          this.userService.update(data).subscribe(res => {
            if (res) {
              this.router.navigate(['user']);
            }
          });
        }
      }
    });
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

  createFormSubmit() {
    this.login.markAsDirty();
    this.firstName.markAsDirty();
    this.lastName.markAsDirty();
    this.email.markAsDirty();
    if (this.createUser.valid) {
      this.confirm();
    }
  }

  // uploadFile(event) {

  // }
  get login() {
    return this.createUser.get('login');
  }
  get firstName() {
    return this.createUser.get('firstName');
  }
  get lastName() {
    return this.createUser.get('lastName');
  }
  get email() {
    return this.createUser.get('email');
  }
  get activated() {
    return this.createUser.get('activated');
  }

  get authorities() {
    return this.createUser.get('authorities');
  }

  get id() {
    return this.createUser.get('id');
  }

  get companyid() {
    return this.createUser.get('companyid');
  }

  // get imageURL(){
  //     return this.createUser.get('imageURL');
  // }
}
