import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentService } from 'app/core/department/department.service';
import { ConfirmationService } from 'primeng/api';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-insert-department',
  templateUrl: './insert-department.component.html',
  styleUrls: ['./insert-department.component.scss']
})
export class InsertDepartmentComponent implements OnInit {
  selectedFile: File;
  listCustomTye: any[] = [];
  listGallery: any[] = [];
  prices: any[] = [];
  countPrice: number;
  listPrices: any[] = [];
  checkError = false;
  createUser = this.fb.group({
    name: ['', Validators.required]
  });
  msgs: Message;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {}

  /**
   * Method create product
   */
  create() {
    this.createUser.controls.name.markAsDirty();
    if (!this.createUser.valid) {
      this.checkError = true;
    }
    if (this.createUser.valid) {
      const data = this.createUser.value;

      this.departmentService.create(data).subscribe(res => {
        if (res) {
          this.confirmationService.confirm({
            message: 'Tạo thành công!Anh(chị) có muốn tạo thêm phòng ban không?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.ngOnInit();
            },
            reject: () => {
              this.router.navigate(['department']);
            }
          });
        }
        this.createUser.reset();
      });
    }
  }
}
