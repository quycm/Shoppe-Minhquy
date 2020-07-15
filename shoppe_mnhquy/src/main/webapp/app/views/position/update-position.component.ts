import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { PositionService } from 'app/core/position/position.service';

import { ConfirmationService } from 'primeng/api';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { IPosition } from 'app/core/position/position.model';

@Component({
  selector: 'app-update-position',
  templateUrl: './update-position.component.html',
  styleUrls: ['./update-position.component.scss']
})
export class UpdatePositionComponent implements OnInit {
  selectedFile: File;
  listCustomTye: any[] = [];
  listGallery: any[] = [];
  prices: any[] = [];
  countPrice: number;
  listPrices: any[] = [];
  checkError = false;
  position: IPosition;
  createUser = this.fb.group({
    name: ['', Validators.required]
  });
  msgs: Message;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private positionService: PositionService,
    private confirmationService: ConfirmationService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ position }) => {
      this.position = position.body ? position.body : position;
      if (this.position.id) {
        this.createUser.get('name').setValue(this.position.name);
      }
    });
  }

  confirm() {
    this.name.markAsDirty();
    if(this.createUser.valid){
      this.confirmationService.confirm({
        message: 'Anh(chị) có muốn lưu không?',
        accept: () => {
          const data: IPosition = this.createUser.getRawValue();
  
          if (this.position.id) {
            data.id = this.position.id;
            this.positionService.update(data).subscribe(res => {
              if (res) {
                this.router.navigate(['position']);
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
}
