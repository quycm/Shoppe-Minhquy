import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BonusService } from 'app/core/bonus/bonus.service';
import { pageUrl } from 'app/core/model/pageUrl';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-bonus-create',
  templateUrl: './bonus-create.component.html',
  styleUrls: ['./bonus.component.scss']
})
export class BonusCreateComponent implements OnInit {
  checkBonus: any;

  newBonus = this.fb.group({
    name: [null, [Validators.required, Validators.pattern('^.{1,255}$')]],
    note: [null, [Validators.required, Validators.pattern('^.{1,5000}$')]],
    inShift: [null, [Validators.required, Validators.min(0), Validators.max(1440)]],
    outShift: [null, [Validators.required, Validators.min(0), Validators.max(1440)]]
  });

  constructor(private fb: FormBuilder, private bonusService: BonusService, private router: Router) {}

  ngOnInit() {}

  create() {
    this.newBonus.controls.name.markAsDirty();
    this.newBonus.controls.note.markAsDirty();
    this.newBonus.controls.inShift.markAsDirty();
    this.newBonus.controls.outShift.markAsDirty();
    this.newBonus.controls.name.setValue(this.newBonus.controls.name.value.trim());
    this.bonusService.findName(this.newBonus.controls.name.value.trim()).subscribe(
      (res: HttpResponse<any>) => {
        this.checkBonus = res.body ? res.body : null;
        this.newBonus.controls.name.setErrors({ exists: true });
      },
      () => {
        if (this.newBonus.valid) {
          this.bonusService.create(this.newBonus.value).subscribe(() => {
            this.previousState();
            this.newBonus.reset();
          });
        }
      }
    );
  }

  previousState() {
    this.router.navigate([pageUrl.listBonus]);
  }
}
