import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../core/auth/account.service';
import { Account } from '../../core/user/account.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit() {
    this.accountService.identity().subscribe((account: Account) => {
      if (account) {
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['login']);
      }
    });
  }
}
