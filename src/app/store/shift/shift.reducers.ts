import { createReducer, on } from '@ngrx/store';
import { Shift } from 'src/app/model/Shift';
import {
  deleteShift,
  deleteShiftFailure,
  deleteShiftSuccess,
  loadShifts,
  loadShiftsFailure,
  loadShiftsSuccess,
} from './shift.actions';

export interface ShiftsState {
  shifts: Shift[];
  loadingShifts: boolean;
  loadingUpsertShift: boolean;
  loadingDeleteShift: boolean;
}

export const initialState: ShiftsState = {
  shifts: [],
  loadingShifts: false,
  loadingUpsertShift: false,
  loadingDeleteShift: false,
};

export const shiftsReducer = createReducer(
  initialState,
  on(loadShifts, (state: ShiftsState) => ({
    ...state,
    loadingShifts: true,
  })),
  on(loadShiftsSuccess, (state, { shifts }) => ({
    ...state,
    shifts,
    loadingShifts: false,
  })),
  on(loadShiftsFailure, (state) => ({
    ...state,
    loadingShifts: false,
  })),
  on(deleteShift, (state: ShiftsState) => ({
    ...state,
    loadingDeleteShift: true,
  })),
  on(deleteShiftSuccess, (state) => ({
    ...state,
    loadingDeleteShift: false,
  })),
  on(deleteShiftFailure, (state) => ({
    ...state,
    loadingDeleteShift: false,
  }))
);
