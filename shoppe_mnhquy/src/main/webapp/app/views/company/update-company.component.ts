import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from 'app/core/company/company.service';
import { ConfirmationService } from 'primeng/api';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ICompany } from 'app/core/company/company.model';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.scss']
})
export class UpdateCompanyComponent implements OnInit {
  selectedFile: File;
  listCustomTye: any[] = [];
  listGallery: any[] = [];
  prices: any[] = [];
  countPrice: number;
  listPrices: any[] = [];
  checkError = false;
  company: any = {};

  createUser = this.fb.group({
    name: ['', Validators.required]
  });
  msgs: Message;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private companyService: CompanyService,
    private confirmationService: ConfirmationService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ company }) => {
      this.company = company.body ? company.body : company;
      if (this.company.id) {
        this.createUser.get('name').setValue(this.company.name);
      }
    });
  }

  confirm() {
    this.name.markAsDirty();
    this.confirmationService.confirm({
      message: 'Anh(chị) có muốn lưu không?',
      accept: () => {
        const data: ICompany = this.createUser.getRawValue();
        if (this.company.id) {
          data.id = this.company.id;
          this.companyService.update(data).subscribe(res => {
            if (res) {
              this.router.navigate(['company']);
            }
          });
        }
      },
      reject: () => {
        this.ngOnInit();
      }
    });
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
}
