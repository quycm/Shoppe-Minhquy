import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { LoginService } from 'app/core/login/login.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  account: Account;
  public navItems = [];
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  constructor(
    private accountService: AccountService,
    private loginService: LoginService,
    private router: Router,
    private eventManager: JhiEventManager,
    @Inject(DOCUMENT) _document?: any
  ) {
    this.account = new Account(true, [], '', '', '', '', '', '');
    this.changes = new MutationObserver(() => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  ngOnInit(): void {
    this.accountService.identity(true).subscribe(account => {
      this.account = account;
      this.navItems = navItems
        .filter(value => value.authorities == null || this.accountService.hasAnyAuthority(value.authorities))
        .map(menu => {
          if (menu.children != null) {
            menu.children = menu.children.filter(value2 => {
              return value2.authorities == null || this.accountService.hasAnyAuthority(value2.authorities);
            });
          }
          return menu;
        });
    });
  }

  registerAuthenticationSuccess() {
    this.eventManager.subscribe('authenticationSuccess', () => {
      this.accountService.identity().subscribe(account => {
        this.account = account;
        this.navItems = navItems
          .filter(value => value.authorities == null || this.accountService.hasAnyAuthority(value.authorities))
          .map(menu => {
            if (menu.children != null) {
              menu.children = menu.children.filter(value2 => {
                return value2.authorities == null || this.accountService.hasAnyAuthority(value2.authorities);
              });
            }
            return menu;
          });
      });
    });
  }

  getImageUrl() {
    return this.isAuthenticated() ? this.accountService.getImageUrl() : null;
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  logout() {
    this.loginService.logout(true);
    this.router.navigate(['/login']);
  }
}
