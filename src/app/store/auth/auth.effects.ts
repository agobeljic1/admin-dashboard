import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { LoginModalComponent } from 'src/app/ui/components/login-modal/login-modal.component';
import { RegisterModalComponent } from 'src/app/ui/components/register-modal/register-modal.component';
import { AuthActions } from '.';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  openLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.openLogin),
      tap(() =>
        this.dialog.open(LoginModalComponent, {
          width: '450px',
          disableClose: true,
          data: {},
        })
      ),
      map(() => AuthActions.openLoginSuccess())
    )
  );

  openRegister$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.openRegister),
      tap(() =>
        this.dialog.open(RegisterModalComponent, {
          width: '450px',
          disableClose: true,
          data: {},
        })
      ),
      map(() => AuthActions.openRegisterSuccess())
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginUser),
      switchMap(({ user }) => {
        return this.authService.login(user).pipe(
          map((response: any) => {
            return AuthActions.loginUserSuccess({
              token: response.accessToken,
              loggedUsername: user.username,
              message: 'Successfully logged in',
            });
          }),
          catchError(() =>
            of(AuthActions.loginUserFailure({ message: 'Failed to login' }))
          )
        );
      })
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerUser),
      switchMap(({ user }) => {
        return this.authService.register(user).pipe(
          map(() => {
            return AuthActions.registerUserSuccess({
              message: 'Successfully registered',
            });
          }),
          catchError(() =>
            of(
              AuthActions.registerUserFailure({ message: 'Failed to register' })
            )
          )
        );
      })
    )
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      switchMap(() => {
        return this.authService.refreshToken().pipe(
          map((response: any) => {
            return AuthActions.refreshTokenSuccess({
              token: response.accessToken,
            });
          }),
          catchError(() => of(AuthActions.refreshTokenFailure()))
        );
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutUser),
      switchMap(() => this.authService.logout()),
      map(() =>
        AuthActions.logoutUserSuccess({ message: 'Successfully logged out' })
      )
    )
  );

  fetchProfileAfterRefresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshTokenSuccess),
      map(() => AuthActions.fetchProfile())
    )
  );

  fetchProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.fetchProfile),
      switchMap(() => {
        return this.authService.me().pipe(
          map(({ user }: any) => {
            return AuthActions.fetchProfileSuccess({ username: user.username });
          }),
          catchError(() => of(AuthActions.fetchProfileFailure()))
        );
      })
    )
  );

  redirectToHome$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutUserSuccess, AuthActions.refreshTokenFailure),
      tap(() => this.router.navigateByUrl('')),
      map(() => AuthActions.redirectToHomeSuccess())
    )
  );

  showMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AuthActions.loginUserSuccess,
        AuthActions.loginUserFailure,
        AuthActions.registerUserSuccess,
        AuthActions.registerUserFailure,
        AuthActions.logoutUserSuccess
      ),
      tap(({ message }) => this.snackBar.open(message)),
      map(() => AuthActions.showMessageSuccess())
    )
  );

  closeAllDialogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginUserSuccess, AuthActions.registerUserSuccess),
      tap(() => this.dialog.closeAll()),
      map(() => AuthActions.closeAllDialogsSuccess())
    )
  );
}
