import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { AuthActions, AuthSelectors } from 'src/app/store/auth';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginModalComponent implements OnInit {
  form!: FormGroup;
  loading$!: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loading$ = this.store.select(AuthSelectors.selectLoadingLogin);
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      username: [undefined, [Validators.required]],
      password: [undefined, [Validators.required, Validators.min(8)]],
    });
  }

  submitLogin() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.store.dispatch(AuthActions.loginUser({ user: this.form.value }));
    }
  }
}
