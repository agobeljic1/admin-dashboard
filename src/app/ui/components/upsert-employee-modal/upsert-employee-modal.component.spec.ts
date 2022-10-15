import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertEmployeeModalComponent } from './upsert-employee-modal.component';

describe('UpsertEmployeeModalComponent', () => {
  let component: UpsertEmployeeModalComponent;
  let fixture: ComponentFixture<UpsertEmployeeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsertEmployeeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertEmployeeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
