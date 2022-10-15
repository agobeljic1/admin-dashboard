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
import { AppState } from 'src/app/store/app.state';
import { EmployeeActions, EmployeeSelectors } from 'src/app/store/employee';

@Component({
  selector: 'app-upsert-employee-modal',
  templateUrl: './upsert-employee-modal.component.html',
  styleUrls: ['./upsert-employee-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpsertEmployeeModalComponent implements OnInit {
  form!: FormGroup;
  loading$!: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.populateForm();

    this.loading$ = this.store.select(
      EmployeeSelectors.selectLoadingUpsertEmployee
    );
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      name: [undefined, [Validators.required]],
      address: [undefined, [Validators.required]],
      birthDate: [undefined, [Validators.required]],
    });
  }

  private populateForm(): void {
    if (!this.data.user) {
      return;
    }
    const { id, displayName, ...formValues } = this.data.employee;
    this.form.setValue(formValues);
  }

  submitUpsertEmployee() {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }
    const editMode = !!this.data.employee;

    if (editMode) {
      this.store.dispatch(
        EmployeeActions.updateEmployee({
          employee: {
            id: this.data.employee.id,
            ...this.form.value,
          },
        })
      );
    } else {
      this.store.dispatch(
        EmployeeActions.createEmployee({
          employee: this.form.value,
        })
      );
    }
  }
}
