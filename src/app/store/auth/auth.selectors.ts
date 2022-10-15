import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { AuthState } from './auth.reducers';

export const selectAuth = (state: AppState) => state.authState;
export const selectLoggedUsername = createSelector(
  selectAuth,
  (state: AuthState) => state.loggedUsername
);

export const selectToken = createSelector(
  selectAuth,
  (state: AuthState) => state.token
);

export const selectLoadingLogin = createSelector(
  selectAuth,
  (state: AuthState) => state.loadingLogin
);

export const selectLoadingRegister = createSelector(
  selectAuth,
  (state: AuthState) => state.loadingRegister
);

export const selectLoadingHeader = createSelector(
  selectAuth,
  (state: AuthState) => state.loadingRefreshToken || state.loadingProfile
);
