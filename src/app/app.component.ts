import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './store/app.state';
import { AuthActions, AuthSelectors } from './store/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'admin-dashboard';
  loading$!: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(AuthSelectors.selectLoadingHeader);
    this.store.dispatch(AuthActions.refreshToken());
  }
}
