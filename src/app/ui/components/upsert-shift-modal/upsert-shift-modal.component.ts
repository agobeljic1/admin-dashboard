import {
  Component,
  Inject,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Shift } from 'src/app/model/Shift';
import { AppState } from 'src/app/store/app.state';
import { ShiftActions, ShiftSelectors } from 'src/app/store/shift';

@Component({
  selector: 'app-upsert-shift-modal',
  templateUrl: './upsert-shift-modal.component.html',
  styleUrls: ['./upsert-shift-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpsertShiftModalComponent implements OnInit {
  form!: FormGroup;
  loading$!: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA)
    public data: { employeeId: string; shift: Shift | null }
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.populateForm();
    console.log(this.data);
    this.loading$ = this.store.select(ShiftSelectors.selectLoadingUpsertShift);
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      clockIn: [undefined, [Validators.required]],
      clockOut: [undefined, [Validators.required]],
      description: [undefined, [Validators.required]],
    });
  }

  private populateForm(): void {
    if (!this.data.shift) {
      return;
    }
    const { id, employeeId, ...formValues } = this.data.shift;
    this.form.setValue(formValues);
  }

  submitUpsertShift() {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }
    const shiftPayload = {
      employeeId: this.data.employeeId,
      ...this.form.value,
    };
    const editMode = !!this.data.shift;

    if (editMode) {
      shiftPayload.id = this.data.shift?.id;
    }

    const upsertAction = editMode
      ? ShiftActions.updateShift
      : ShiftActions.createShift;

    this.store.dispatch(upsertAction({ shift: shiftPayload }));
  }
}
