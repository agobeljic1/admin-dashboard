import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Shift } from '../model/Shift';

@Injectable({
  providedIn: 'root',
})
export class ShiftService {
  constructor(private readonly httpClient: HttpClient) {}

  getShifts = (params: { [key: string]: any }) => {
    const httpParams = Object.entries(params).reduce(
      (acc: HttpParams, [key, value]) => {
        if (value) {
          acc = acc.set(key, value);
        }
        return acc;
      },
      new HttpParams()
    );

    return this.httpClient.get<{ shifts: Shift[] }>('/shifts', {
      params: httpParams,
    });
  };

  createShift = (shift) => {
    return this.httpClient.post('/shifts', shift);
  };

  updateShift = (shift) => {
    return this.httpClient.put('/shifts', shift);
  };

  deleteShift = (shiftId) => {
    return this.httpClient.delete(`/shifts/${shiftId}`);
  };
}
