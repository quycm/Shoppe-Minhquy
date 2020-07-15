import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from 'app/core/company/company.service';
import { ConfirmationService } from 'primeng/api';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-insert-company',
  templateUrl: './insert-company.component.html',
  styleUrls: ['./insert-company.component.scss']
})
export class InsertCompanyComponent implements OnInit {
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
    private companyService: CompanyService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {}

  /**
   * Method create product
   */
  create() {
    if (!this.createUser.valid) {
      this.checkError = true;
    }
    if (this.createUser.valid) {
      const data = this.createUser.value;
      this.companyService.create(data).subscribe(() => {
        this.confirmationService.confirm({
          message: 'Tạo thành công!Anh(chị) có muốn tạo thêm công ty không?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.ngOnInit();
          },
          reject: () => {
            this.router.navigate(['company']);
          }
        });
      });
      this.createUser.reset();
    }
  }
}
