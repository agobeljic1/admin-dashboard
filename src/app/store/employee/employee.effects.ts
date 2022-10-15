import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
    private router: Router
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

  openLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.openUpsertmployeeModal),
      tap(() =>
        this.dialog.open(UpsertEmployeeModalComponent, {
          width: '450px',
          disableClose: true,
          data: {},
        })
      ),
      map(() => EmployeeActions.openUpsertmployeeModalSuccess())
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
        return this.employeeService.deleteEmployee(employee).pipe(
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
}
