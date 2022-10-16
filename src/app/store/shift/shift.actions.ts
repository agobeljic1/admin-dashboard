import { createAction, props } from '@ngrx/store';
import { Employee } from 'src/app/model/Employee';
import { Shift } from 'src/app/model/Shift';

export const loadShifts = createAction(
  '[Shift Page] Load Employee Shifts',
  props<{ employeeId: string }>()
);

export const loadShiftsSuccess = createAction(
  '[Shift API] Employee Shifts Load Success',
  props<{ shifts: Shift[] }>()
);

export const loadShiftsFailure = createAction(
  '[Shift API] Employee Shifts Load Failure',
  props<{ message: string }>()
);

export const openUpsertShiftModal = createAction(
  '[Upsert Shift Modal] Open Upsert Shift Modal',
  props<{ employee: Employee; shift: Shift | null }>()
);

export const openUpsertShiftModalSuccess = createAction(
  '[Upsert Shift Modal] Open Upsert Shift Success'
);

export const closeUpsertShiftModal = createAction(
  '[Upsert Shift Modal] Close Upsert Shift Modal'
);

export const createShift = createAction(
  '[Upsert Shift Modal] Create Shift',
  props<{ shift: Shift }>()
);

export const createShiftSuccess = createAction(
  '[Shift API] Create Shift Success',
  props<{ employeeId: string; message: string }>()
);

export const createShiftFailure = createAction(
  '[Shift API] Create Shift Failure',
  props<{ message: string }>()
);

export const updateShift = createAction(
  '[Upsert Shift Modal] Update Shift',
  props<{ shift: Shift }>()
);

export const updateShiftSuccess = createAction(
  '[Shift API] Update Shift Success',
  props<{ employeeId: string; message: string; shiftId: string }>()
);

export const updateShiftFailure = createAction(
  '[Shift API] Update Shift Failure',
  props<{ message: string }>()
);

export const deleteShift = createAction(
  '[Shift Modal] Delete Shift',
  props<{ shift: Shift }>()
);

export const deleteShiftSuccess = createAction(
  '[Shift Modal] Delete Shift Success',
  props<{ employeeId: string; message: string }>()
);

export const deleteShiftFailure = createAction(
  '[Shift Modal] Delete Shift Failure',
  props<{ message: string }>()
);

export const closeAllDialogsSuccess = createAction(
  '[Shift Dialogs] Close All Dialogs Success'
);
