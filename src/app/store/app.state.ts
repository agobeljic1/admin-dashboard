import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth/auth.reducers';
import { employeesReducer, EmployeesState } from './employee/employee.reducers';
import { shiftsReducer, ShiftState } from './shift/shift.reducers';

export interface AppState {
  employeesState: EmployeesState;
  shiftsState: ShiftState;
  authState: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  employeesState: employeesReducer,
  shiftsState: shiftsReducer,
  authState: authReducer,
};
