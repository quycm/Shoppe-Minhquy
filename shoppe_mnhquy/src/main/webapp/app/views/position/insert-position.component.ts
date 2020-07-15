import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PositionService } from 'app/core/position/position.service';
import { ConfirmationService } from 'primeng/api';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-insert-position',
  templateUrl: './insert-position.component.html',
  styleUrls: ['./insert-position.component.scss']
})
export class InsertPositionComponent implements OnInit {
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
    private positionService: PositionService,
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

      this.positionService.create(data).subscribe(res => {
        if (res) {
          this.confirmationService.confirm({
            message: 'Tạo thành công?Anh(chị) có muốn tạo thêm?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.ngOnInit();
            },
            reject: () => {
              this.router.navigate(['position']);
            }
          });
        }
        this.createUser.reset();
      });
    }
  }
}
