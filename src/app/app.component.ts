import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { AuthActions } from './store/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'admin-dashboard';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.refreshToken());
  }
}
