import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { HttpClientModule } from '@angular/common/http';
import { WelcomComponent } from './welcom/welcom.component'

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Formstep2Component } from './formstep2/formstep2.component';
import { SuccessComponent } from './success/success.component';
import { TestComponent } from './test/test.component';
import { MangopayKyc } from './mangopay-kyc';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    WelcomComponent,
    Formstep2Component,
    SuccessComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    MangopayKyc,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
