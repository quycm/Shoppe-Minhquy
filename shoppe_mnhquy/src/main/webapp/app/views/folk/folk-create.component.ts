import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FolkService } from 'app/core/folk/folk.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { pageUrl } from 'app/core/model/pageUrl';

@Component({
  selector: 'app-folk-create',
  templateUrl: './folk-create.component.html',
  styleUrls: ['./folk.component.scss']
})
export class FolkCreateComponent implements OnInit {
  fd: any;
  checkFolk: any;
  loading = false;
  newFolk = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^.{1,255}$')]]
  });

  constructor(private fb: FormBuilder, private folkService: FolkService, private router: Router) {}

  ngOnInit() {}

  createNewCustomersType() {
    this.newFolk.controls.name.markAsDirty();
    this.newFolk.controls.name.setValue(this.newFolk.controls.name.value.trim());
    this.folkService.findName(this.newFolk.controls.name.value.trim()).subscribe(
      (res: HttpResponse<any>) => {
        this.checkFolk = res.body ? res.body : null;
        this.newFolk.controls.name.setErrors({ exists: true });
      },
      () => {
        if (this.newFolk.valid) {
          this.folkService.create(this.newFolk.value).subscribe(res => {
            this.previousState();
            this.newFolk.reset();
          });
        }
      }
    );
  }

  previousState() {
    this.router.navigate([pageUrl.listFolk]);
  }
}
