import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folk-detail',
  templateUrl: './folk-detail.component.html',
  styleUrls: ['./folk.component.scss']
})
export class FolkDetailComponent implements OnInit {
  folk: any;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ folk }) => {
      this.folk = folk.body ? folk.body : folk;
    });
  }
}
