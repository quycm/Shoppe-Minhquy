import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentService } from 'app/core/department/department.service';

import { ConfirmationService } from 'primeng/api';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { IDepartment } from 'app/core/department/department.model';

@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.scss']
})
export class UpdateDepartmentComponent implements OnInit {
  selectedFile: File;
  listCustomTye: any[] = [];
  listGallery: any[] = [];
  prices: any[] = [];
  countPrice: number;
  listPrices: any[] = [];
  checkError = false;
  department: IDepartment;
  createUser = this.fb.group({
    name: ['', Validators.required],
   
  });
  msgs: Message;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private confirmationService: ConfirmationService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ department }) => {
      this.department = department.body ? department.body : department;
      if (this.department.id) {
        this.createUser.get('name').setValue(this.department.name);
      }
    });
  }
  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  confirm() {
    if(this.createUser.valid){
      this.confirmationService.confirm({
        message: 'Anh(chị) có muốn lưu không?',
        accept: () => {
          const data: IDepartment = this.createUser.getRawValue();
          if (this.department.id) {
            data.id = this.department.id;
            this.departmentService.update(data).subscribe(res => {
              if (res) {
                this.router.navigate(['department']);
              }
            });
          }
        }
      });
    }
    
  }

  createFormSubmit() {
    this.name.markAsDirty();
    if (this.createUser.valid) {
      this.confirm();
    }
  }

  get name() {
    return this.createUser.get('name');
  }

  get namecompany() {
    return this.createUser.get('namecompany');
  }

  get parentid() {
    return this.createUser.get('parentid');
  }
}
