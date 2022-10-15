import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { AuthActions, AuthSelectors } from 'src/app/store/auth';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterModalComponent implements OnInit {
  form!: FormGroup;
  loading$!: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loading$ = this.store.select(AuthSelectors.selectLoadingRegister);
  }

  private createForm(): void {
    this.form = this.formBuilder.group(
      {
        username: [undefined, [Validators.required]],
        password: [undefined, [Validators.required, Validators.minLength(8)]],
        repeatPassword: [undefined, [Validators.required]],
      },
      {
        validators: this.passwordsMatchingValidator,
      }
    );
  }

  submitRegister() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const { repeatPassword, ...user } = this.form.value;
      this.store.dispatch(AuthActions.registerUser({ user }));
    }
  }

  private passwordsMatchingValidator = (
    formGroup: FormGroup
  ): ValidationErrors | null => {
    const { password, repeatPassword } = formGroup.controls;
    const equalPasswords = password.value === repeatPassword.value;
    const controlHasError = repeatPassword.hasError('confirmedValidator');

    if (!repeatPassword.value || !password.value) return formGroup.errors;

    if (equalPasswords && controlHasError) {
      repeatPassword.setErrors(null);
    }

    if (!equalPasswords && !controlHasError) {
      repeatPassword.setErrors({
        ...(repeatPassword.errors || {}),
        confirmedValidator: true,
      });
    }
    return formGroup.errors;
  };

  get password() {
    return this.form?.get('password');
  }

  get repeatPassword() {
    return this.form?.get('repeatPassword');
  }
}
