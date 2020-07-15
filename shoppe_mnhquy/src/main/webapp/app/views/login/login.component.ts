import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { JhiEventManager } from 'ng-jhipster';
import { Router } from '@angular/router';
import { LoginService } from 'app/core/login/login.service';
import { StateStorageService } from 'app/core/auth/state-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  authenticationError: boolean;
  loginForm = this.fb.group({
    username: null,
    password: null,
    rememberMe: 'true'
  });

  constructor(
    private loginService: LoginService,
    private eventManager: JhiEventManager,
    private router: Router,
    private stateStorageService: StateStorageService,
    private fb: FormBuilder
  ) {}

  loginSubmit() {
    this.username.markAsDirty();
    this.password.markAsDirty();
    if (this.loginForm.valid) {
      this.loginService
        .login(this.loginForm.getRawValue())
        .then(() => {
          this.authenticationError = false;
          this.router.navigate(['']);
          this.eventManager.broadcast({
            name: 'authenticationSuccess',
            content: 'Sending Authentication Success'
          });
          const redirect = this.stateStorageService.getUrl();
          if (redirect) {
            this.stateStorageService.storeUrl(null);
            this.router.navigate([redirect]);
          }
        })
        .catch(() => {
          this.authenticationError = true;
        });
    }
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe');
  }
}
