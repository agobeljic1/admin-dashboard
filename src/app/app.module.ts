import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ReactiveComponentModule } from '@ngrx/component';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { EmployeeEffects } from './store/employee/employee.effects';
import { reducers } from './store/app.state';
import { HomePageComponent } from './ui/pages/home-page/home-page.component';
import { NotFoundPageComponent } from './ui/pages/not-found-page/not-found-page.component';
import { EmployeesPageComponent } from './ui/pages/employees-page/employees-page.component';
import { EmployeeDetailsPageComponent } from './ui/pages/employee-details-page/employee-details-page.component';
import { HeaderComponent } from './ui/components/header/header.component';
import { ShiftEffects } from './store/shift/shift.effects';
import { AuthEffects } from './store/auth/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NotFoundPageComponent,
    EmployeesPageComponent,
    EmployeeDetailsPageComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    ReactiveComponentModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([EmployeeEffects, ShiftEffects, AuthEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
