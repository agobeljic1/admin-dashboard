import { createReducer, on } from '@ngrx/store';
import {
  loginUser,
  loginUserSuccess,
  loginUserFailure,
  logoutUser,
  refreshToken,
  refreshTokenFailure,
  refreshTokenSuccess,
  updateToken,
  logoutUserSuccess,
  registerUser,
  registerUserSuccess,
  registerUserFailure,
  fetchProfile,
  fetchProfileFailure,
  fetchProfileSuccess,
} from './auth.actions';

export interface AuthState {
  loggedUsername: string | null;
  token: string | null;
  loadingLogin: boolean;
  loadingRegister: boolean;
  loadingRefreshToken: boolean;
  loadingProfile: boolean;
}

export const initialState: AuthState = {
  loggedUsername: null,
  token: null,
  loadingLogin: false,
  loadingRegister: false,
  loadingRefreshToken: true,
  loadingProfile: false,
};

export const authReducer = createReducer(
  initialState,
  on(loginUser, (state) => ({
    ...state,
    loadingLogin: true,
  })),
  on(loginUserSuccess, (state, { token, loggedUsername }) => ({
    ...state,
    token,
    loadingLogin: false,
    loggedUsername,
  })),
  on(loginUserFailure, (state) => ({
    ...state,
    loadingLogin: false,
  })),
  on(registerUser, (state) => ({
    ...state,
    loadingRegister: true,
  })),
  on(registerUserSuccess, (state) => ({
    ...state,
    loadingRegister: false,
  })),
  on(registerUserFailure, (state) => ({
    ...state,
    loadingRegister: false,
  })),
  on(logoutUser, (state) => ({
    ...state,
    loggedUsername: null,
    token: null,
  })),
  on(logoutUserSuccess, (state) => ({
    ...state,
  })),
  on(refreshToken, (state) => ({
    ...state,
    loadingRefreshToken: true,
  })),
  on(refreshTokenSuccess, (state, { token }) => ({
    ...state,
    token,
    loadingRefreshToken: false,
  })),
  on(refreshTokenFailure, (state) => ({
    ...state,
    loadingRefreshToken: false,
  })),
  on(updateToken, (state, { token }) => ({
    ...state,
    token,
  })),
  on(fetchProfile, (state) => ({
    ...state,
    loadingProfile: true,
  })),
  on(fetchProfileSuccess, (state, { username }) => ({
    ...state,
    loggedUsername: username,
    loadingProfile: false,
  })),
  on(fetchProfileFailure, (state) => ({
    ...state,
    loadingProfile: false,
  }))
);
