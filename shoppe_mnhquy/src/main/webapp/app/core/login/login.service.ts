import { Injectable } from '@angular/core';
import { AccountService } from 'app/core/auth/account.service';
import { AuthServerProvider } from 'app/core/auth/auth-jwt.service';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private accountService: AccountService, private authServerProvider: AuthServerProvider, private router: Router) {}

  login(credentials, callback?) {
    const cb = callback || function() {};

    return new Promise((resolve, reject) => {
      this.authServerProvider.login(credentials).subscribe(
        data => {
          this.accountService.identity(true).subscribe(() => {
            resolve(data);
          });
          return cb();
        },
        err => {
          this.logout();
          reject(err);
          return cb(err);
        }
      );
    });
  }

  logout(navigate?: Boolean) {
    if (this.accountService.isAuthenticated()) {
      this.authServerProvider.logout().subscribe(() => {
        this.accountService.authenticate(null);
        if (navigate) {
          this.router.navigate(['']);
        }
      });
    } else {
      this.accountService.authenticate(null);
      if (navigate) {
        this.router.navigate(['']);
      }
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
}
