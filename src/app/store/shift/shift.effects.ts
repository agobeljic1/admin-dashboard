import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ShiftService } from 'src/app/service/shift.service';
import { UpsertShiftModalComponent } from 'src/app/ui/components/upsert-shift-modal/upsert-shift-modal.component';
import { ShiftActions } from '.';
import { EmployeeActions } from '../employee';

@Injectable()
export class ShiftEffects {
  constructor(
    private actions$: Actions,
    private shiftService: ShiftService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  shifts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShiftActions.loadShifts),
      switchMap(({ employeeId }) => {
        return this.shiftService.getShifts({ employeeId }).pipe(
          map(({ shifts }) => {
            return ShiftActions.loadShiftsSuccess({
              shifts,
            });
          }),
          catchError(() =>
            of(
              ShiftActions.loadShiftsFailure({
                message: 'Failed to load shifts',
              })
            )
          )
        );
      })
    )
  );

  openUpsertShift$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShiftActions.openUpsertShiftModal),
      tap(({ shift, employee }) =>
        this.dialog.open(UpsertShiftModalComponent, {
          width: '450px',
          disableClose: true,
          data: {
            shift,
            employeeId: employee.id,
          },
        })
      ),
      map(() => ShiftActions.openUpsertShiftModalSuccess())
    )
  );

  createShift$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShiftActions.createShift),
      switchMap(({ shift }) => {
        return this.shiftService.createShift(shift).pipe(
          map(() => {
            return ShiftActions.createShiftSuccess({
              employeeId: shift.employeeId,
              message: 'Successfully created shift',
            });
          }),
          catchError(() => {
            return of(
              ShiftActions.createShiftFailure({
                message: 'Failed to create shift',
              })
            );
          })
        );
      })
    )
  );

  updateShift$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShiftActions.updateShift),
      switchMap(({ shift }) => {
        return this.shiftService.updateShift(shift).pipe(
          map(() => {
            return ShiftActions.updateShiftSuccess({
              message: 'Successfully updated shift',
              employeeId: shift.employeeId,
              shiftId: shift.id,
            });
          }),
          catchError(() => {
            return of(
              ShiftActions.updateShiftFailure({
                message: 'Failed to update shift',
              })
            );
          })
        );
      })
    )
  );

  deleteShift$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShiftActions.deleteShift),
      switchMap(({ shift }) => {
        return this.shiftService.deleteShift(shift.id).pipe(
          map(() => {
            return ShiftActions.deleteShiftSuccess({
              employeeId: shift.employeeId,
              message: 'Successfully deleted shift',
            });
          }),
          catchError(() => {
            return of(
              ShiftActions.deleteShiftFailure({
                message: 'Failed to delete shift',
              })
            );
          })
        );
      })
    )
  );

  refetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ShiftActions.createShiftSuccess,
        ShiftActions.deleteShiftSuccess,
        ShiftActions.updateShiftSuccess
      ),
      map(({ employeeId }) => {
        return ShiftActions.loadShifts({ employeeId });
      })
    )
  );

  closeAllDialogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShiftActions.createShiftSuccess, ShiftActions.updateShiftSuccess),
      tap(() => this.dialog.closeAll()),
      map(() => ShiftActions.closeAllDialogsSuccess())
    )
  );

  showMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ShiftActions.loadShiftsFailure,
        ShiftActions.createShiftSuccess,
        ShiftActions.createShiftFailure,
        ShiftActions.updateShiftSuccess,
        ShiftActions.updateShiftFailure,
        ShiftActions.deleteShiftSuccess,
        ShiftActions.deleteShiftFailure
      ),
      tap(({ message }) => this.snackBar.open(message, '', { duration: 3000 })),
      map(() => EmployeeActions.showMessageSuccess())
    )
  );
}
