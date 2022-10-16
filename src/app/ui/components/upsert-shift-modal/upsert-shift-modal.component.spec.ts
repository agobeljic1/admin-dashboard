import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertShiftModalComponent } from './upsert-shift-modal.component';

describe('UpsertShiftModalComponent', () => {
  let component: UpsertShiftModalComponent;
  let fixture: ComponentFixture<UpsertShiftModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsertShiftModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertShiftModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
