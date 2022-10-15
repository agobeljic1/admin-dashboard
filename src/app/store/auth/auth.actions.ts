import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/model/User';

export const loginUser = createAction(
  '[Login Modal] Login User',
  props<{ user: User }>()
);

export const loginUserSuccess = createAction(
  '[Login API] User Login Success',
  props<{ token: string; message: string; loggedUsername: string }>()
);

export const loginUserFailure = createAction(
  '[Login API] User Login Failure',
  props<{ message: string }>()
);

export const registerUser = createAction(
  '[Register Modal] Register User',
  props<{ user: User }>()
);

export const registerUserSuccess = createAction(
  '[Register API] User Register Success',
  props<{ message: string }>()
);

export const registerUserFailure = createAction(
  '[Register API] User Register Failure',
  props<{ message: string }>()
);

export const logoutUser = createAction('[User API] Logout User');

export const logoutUserSuccess = createAction(
  '[User API] Logout User Success',
  props<{ message: string }>()
);

export const refreshToken = createAction('[User API] Refresh Token');

export const refreshTokenSuccess = createAction(
  '[User API] Refresh Token Success',
  props<{ token: string }>()
);

export const refreshTokenFailure = createAction(
  '[User API] Refresh Token Failure'
);

export const updateToken = createAction(
  '[User API] Update Token',
  props<{ token: string }>()
);

export const openLogin = createAction('[Login Modal] Open Login Modal');

export const closeLogin = createAction('[Login Modal] Close Login Modal');

export const openLoginSuccess = createAction(
  '[Login Modal] Open Login Modal Success'
);

export const openRegister = createAction(
  '[Register Modal] Open Register Modal'
);

export const closeRegister = createAction('[Login Modal] Close Register Modal');

export const openRegisterSuccess = createAction(
  '[Register Modal] Open Register Modal Success'
);

export const redirectToHomeSuccess = createAction(
  '[Routing] Redirect To Home Success'
);

export const showMessageSuccess = createAction(
  '[Auth API] Show Message Success'
);

export const closeAllDialogsSuccess = createAction(
  '[Auth API] Close All Dialogs Success'
);

export const fetchProfile = createAction('[Auth API] Fetch Profile');

export const fetchProfileSuccess = createAction(
  '[Auth API] Fetch Profile Success',
  props<{ username: string }>()
);

export const fetchProfileFailure = createAction(
  '[Auth API] Fetch Profile Failure'
);
