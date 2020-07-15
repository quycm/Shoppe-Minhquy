import { AfterViewInit, Component, ElementRef, OnInit, Renderer } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { PasswordResetFinishService } from '../../core/password-reset/password-reset-finish.service';
import { ActivatedRoute } from '@angular/router';
import { LoginModalService } from '../../core/login/login-modal.service';

@Component({
  selector: 'app-password-reset-finish',
  templateUrl: './password-reset-finish.component.html',
  styleUrls: ['./password-reset-finish.component.scss']
})
export class PasswordResetFinishComponent implements OnInit, AfterViewInit {
  doNotMatch: string;
  error: string;
  keyMissing: boolean;
  success: string;
  modalRef: NgbModalRef;
  key: string;

  passwordForm = this.fb.group({
    newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]]
  });

  constructor(
    private passwordResetFinishService: PasswordResetFinishService,
    private loginModalService: LoginModalService,
    private route: ActivatedRoute,
    private elementRef: ElementRef,
    private renderer: Renderer,
    private fb: FormBuilder
  ) {}
  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
      return { invalid: true };
    }
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.key = params['key'];
    });
    this.keyMissing = !this.key;
  }

  ngAfterViewInit() {
    if (this.elementRef.nativeElement.querySelector('#password') != null) {
      this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#password'), 'focus', []);
    }
  }

  finishReset() {
    this.doNotMatch = null;
    this.error = null;
    const password = this.passwordForm.get(['newPassword']).value;
    const confirmPassword = this.passwordForm.get(['confirmPassword']).value;
    if (password !== confirmPassword) {
      this.doNotMatch = 'ERROR';
    } else {
      this.passwordResetFinishService.save({ key: this.key, newPassword: password }).subscribe(
        () => {
          this.success = 'OK';
        },
        () => {
          this.success = null;
          this.error = 'ERROR';
        }
      );
    }
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }
}
