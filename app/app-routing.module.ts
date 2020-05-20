import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { WelcomComponent } from './welcom/welcom.component';
import { Formstep2Component } from './formstep2/formstep2.component';
import { SuccessComponent } from './success/success.component';
import { TestComponent } from './test/test.component';


const routes: Routes = [
  {  path: 'welcom', component: WelcomComponent },
  {  path: 'form', component: FormComponent },
  {  path: 'formstep2', component: Formstep2Component },
  {  path: 'success', component: SuccessComponent },
  {  path: 'test', component: TestComponent  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
