import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bonus-detail',
  templateUrl: './bonus-detail.component.html',
  styleUrls: ['./bonus.component.scss']
})
export class BonusDetailComponent implements OnInit {
  bonus: any;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ bonus }) => {
      this.bonus = bonus.body ? bonus.body : bonus;
    });
  }
}
