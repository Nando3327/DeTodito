import { NgModule } from '@angular/core';
import { RESET_PASSWORD_COMPONENTS, ResetPasswordComponent } from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { DemoMaterialModule } from '../material.module';
import { DataTableModule } from '../data-table';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { CommonModule } from '@angular/common';
import { ResetPasswordService } from './reset-password.service';
import { Route, RouterModule } from '@angular/router';


const routes: Route[] = [
  {
    path: '',
    component: ResetPasswordComponent,
  },
  { path: '', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    DataTableModule,
    FormlyModule.forChild(),
    FormlyMaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [...RESET_PASSWORD_COMPONENTS],
  entryComponents: [...RESET_PASSWORD_COMPONENTS],
  exports: [...RESET_PASSWORD_COMPONENTS],
  providers: [ResetPasswordService]
})
export class ResetPasswordModule {
}
