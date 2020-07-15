import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FolkService } from 'app/core/folk/folk.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-folk-update',
  templateUrl: './folk-update.component.html',
  styleUrls: ['./folk.component.scss']
})
export class FolkUpdateComponent implements OnInit {
  folk: any;
  beginName: any;
  checkFolk: any;
  name = new FormControl('');
  updateFolk = this.fb.group({
    id: [''],
    name: ['', [Validators.required, Validators.pattern('^.{1,255}$')]]
  });
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private folkService: FolkService) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ folk }) => {
      this.folk = folk.body ? folk.body : folk;
      this.updateFolk.controls.id.setValue(this.folk.id);
      this.updateFolk.controls.name.setValue(this.folk.name);
      this.beginName = this.folk.name;
    });
  }

  edit() {
    this.updateFolk.controls.name.setValue(this.updateFolk.controls.name.value.trim());
    if (this.updateFolk.controls.name.value !== this.beginName) {
      if (this.updateFolk.controls.name.value !== this.beginName) {
        this.folkService.findName(this.updateFolk.controls.name.value).subscribe(
          (res: HttpResponse<any>) => {
            this.checkFolk = res.body ? res.body : null;
            this.updateFolk.controls.name.setErrors({ exists: true });
          },
          (error: HttpErrorResponse) => {
            if (this.updateFolk.valid) {
              const data = this.updateFolk.value;
              this.folkService.update(data).subscribe(res => {
                this.router.navigate(['folk/list']);
              });
            }
          }
        );
      }
    } else {
      if (this.updateFolk.valid) {
        const data = this.updateFolk.value;
        this.folkService.update(data).subscribe(res => {
          this.router.navigate(['folk/list']);
        });
      }
    }
  }
}
