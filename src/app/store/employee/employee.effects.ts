import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { EmployeeService } from 'src/app/service/employee.service';
import { UpsertEmployeeModalComponent } from 'src/app/ui/components/upsert-employee-modal/upsert-employee-modal.component';
import { EmployeeActions } from '.';

@Injectable()
export class EmployeeEffects {
  constructor(
    private actions$: Actions,
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  employees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadEmployees),
      switchMap(() => {
        return this.employeeService.getEmployees().pipe(
          map(({ employees }) => {
            return EmployeeActions.loadEmployeesSuccess({
              employees,
            });
          }),
          catchError(() => of(EmployeeActions.loadEmployeesFailure()))
        );
      })
    )
  );

  employeeById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadEmployeeByIdFromRoute),
      switchMap(({ employeeId }) => {
        return this.employeeService.getEmployeeById(employeeId).pipe(
          map(({ employee }) => {
            return EmployeeActions.loadEmployeeByIdFromRouteSuccess({
              employee,
            });
          }),
          catchError(() =>
            of(
              EmployeeActions.loadEmployeeByIdFromRouteFailure({
                message: 'Failed to load employee',
              })
            )
          )
        );
      })
    )
  );

  openUpsertEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.openUpsertEmployeeModal),
      tap(({ employee }) =>
        this.dialog.open(UpsertEmployeeModalComponent, {
          width: '450px',
          disableClose: true,
          data: {
            employee,
          },
        })
      ),
      map(() => EmployeeActions.openUpsertEmployeeModalSuccess())
    )
  );

  createEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.createEmployee),
      switchMap(({ employee }) => {
        return this.employeeService.createEmployee(employee).pipe(
          map(() => {
            return EmployeeActions.createEmployeeSuccess({
              message: 'Successfully created employee',
            });
          }),
          catchError(() => {
            return of(
              EmployeeActions.createEmployeeFailure({
                message: 'Failed to create employee',
              })
            );
          })
        );
      })
    )
  );

  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.updateEmployee),
      switchMap(({ employee }) => {
        return this.employeeService.updateEmployee(employee).pipe(
          map(() => {
            return EmployeeActions.updateEmployeeSuccess({
              message: 'Successfully updated employee',
              employeeId: employee.id,
            });
          }),
          catchError(() => {
            return of(
              EmployeeActions.updateEmployeeFailure({
                message: 'Failed to update employee',
              })
            );
          })
        );
      })
    )
  );

  deleteEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.deleteEmployee),
      switchMap(({ employee }) => {
        return this.employeeService.deleteEmployee(employee.id).pipe(
          map(() => {
            return EmployeeActions.deleteEmployeeSuccess({
              message: 'Successfully deleted employee',
            });
          }),
          catchError(() => {
            return of(
              EmployeeActions.deleteEmployeeFailure({
                message: 'Failed to delete employee',
              })
            );
          })
        );
      })
    )
  );

  refetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.createEmployeeSuccess),
      map(() => {
        return EmployeeActions.loadEmployees();
      })
    )
  );

  redirectToEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.deleteEmployeeSuccess),
      tap(() => this.router.navigateByUrl('employees')),
      map(() => EmployeeActions.redirectToEmployeesSuccess())
    )
  );

  closeAllDialogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        EmployeeActions.createEmployeeSuccess,
        EmployeeActions.updateEmployeeSuccess
      ),
      tap(() => this.dialog.closeAll()),
      map(() => EmployeeActions.closeAllDialogsSuccess())
    )
  );

  openEmployeeDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.openEmployeeDetails),
      tap(({ employeeId }) => this.router.navigate(['employees', employeeId])),
      map(() => EmployeeActions.closeAllDialogsSuccess())
    )
  );

  refetchEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.updateEmployeeSuccess),
      map(({ employeeId }) => {
        return EmployeeActions.loadEmployeeByIdFromRoute({
          employeeId,
        });
      })
    )
  );

  showMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        EmployeeActions.loadEmployeeByIdFromRouteFailure,
        EmployeeActions.createEmployeeSuccess,
        EmployeeActions.createEmployeeFailure,
        EmployeeActions.updateEmployeeSuccess,
        EmployeeActions.updateEmployeeFailure,
        EmployeeActions.deleteEmployeeSuccess,
        EmployeeActions.deleteEmployeeFailure
      ),
      tap(({ message }) => this.snackBar.open(message, '', { duration: 3000 })),
      map(() => EmployeeActions.showMessageSuccess())
    )
  );
}
