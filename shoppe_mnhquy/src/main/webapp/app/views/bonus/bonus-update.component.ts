import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BonusService } from 'app/core/bonus/bonus.service';
import { pageUrl } from 'app/core/model/pageUrl';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-bonus-update',
  templateUrl: './bonus-update.component.html',
  styleUrls: ['./bonus.component.scss']
})
export class BonusUpdateComponent implements OnInit {
  bonus: any;
  beginName: any;
  checkBonus: any;
  updateBonus = this.fb.group({
    id: [null],
    name: [null, [Validators.required, Validators.pattern('^.{1,255}$')]],
    note: [null, [Validators.required, Validators.pattern('^.{1,5000}$')]],
    inShift: [null, [Validators.required, Validators.min(0), Validators.max(1440)]],
    outShift: [null, [Validators.required, Validators.min(0), Validators.max(1440)]]
  });
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private bonusService: BonusService
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ bonus }) => {
      this.bonus = bonus.body ? bonus.body : bonus;
      this.updateBonus.controls.id.setValue(this.bonus.id);
      this.updateBonus.controls.name.setValue(this.bonus.name);
      this.updateBonus.controls.inShift.setValue(this.bonus.inShift);
      this.updateBonus.controls.outShift.setValue(this.bonus.outShift);
      this.updateBonus.controls.note.setValue(this.bonus.note);
      this.beginName = this.bonus.name;
    });
  }

  update() {
    this.updateBonus.controls.name.setValue(this.updateBonus.controls.name.value.trim());
    if (this.updateBonus.controls.name.value !== this.beginName) {
      if (this.updateBonus.controls.name.value !== this.beginName) {
        this.bonusService.findName(this.updateBonus.controls.name.value).subscribe(
          (res: HttpResponse<any>) => {
            this.checkBonus = res.body ? res.body : null;
            this.updateBonus.controls.name.setErrors({ exists: true });
          },
          () => {
            if (this.updateBonus.valid) {
              this.bonusService.update(this.updateBonus.value).subscribe(() => {
                this.updateBonus.reset();
                this.previousState();
              });
            }
          }
        );
      }
    } else {
      if (this.updateBonus.valid) {
        this.bonusService.update(this.updateBonus.value).subscribe(res => {
          this.updateBonus.reset();
          this.previousState();
        });
      }
    }
  }

  previousState() {
    this.router.navigate([pageUrl.listBonus]);
  }
}
