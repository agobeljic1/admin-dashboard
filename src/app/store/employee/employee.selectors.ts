import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { EmployeesState } from './employee.reducers';

export const selectEmployees = (state: AppState) => state.employeesState;

export const selectAllEmployees = createSelector(
  selectEmployees,
  (state: EmployeesState) => state.employees
);

export const selectLoadingEmployees = createSelector(
  selectEmployees,
  (state: EmployeesState) => state.loadingEmployees
);

export const selectLoadingUpsertEmployee = createSelector(
  selectEmployees,
  (state: EmployeesState) => state.loadingUpsertEmployee
);
