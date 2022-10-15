import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { AuthActions, AuthSelectors } from 'src/app/store/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  loadingHeader$!: Observable<boolean>;
  loggedUsername$!: Observable<string | null>;

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.loadingHeader$ = this.store.select(AuthSelectors.selectLoadingHeader);
    this.loggedUsername$ = this.store.select(
      AuthSelectors.selectLoggedUsername
    );
  }

  openLogin() {
    this.store.dispatch(AuthActions.openLogin());
  }

  openRegister() {
    this.store.dispatch(AuthActions.openRegister());
  }

  logout() {
    this.store.dispatch(AuthActions.logoutUser());
  }
}
