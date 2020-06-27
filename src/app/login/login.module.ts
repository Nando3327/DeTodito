import { NgModule } from '@angular/core';
import { LOGIN_COMPONENTS } from './components';
import { DemoMaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { CommonModule } from '@angular/common';
import { SideBarLoginModule } from '../side-bar-login';
import { LoginService } from './login.service';
import { ResetPasswordModule } from '../reset-password';


@NgModule({
  imports: [
    DemoMaterialModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    SideBarLoginModule,
    FormlyModule.forChild(),
    FormlyMaterialModule,
    ResetPasswordModule
  ],
  declarations: [...LOGIN_COMPONENTS],
  entryComponents: [],
  exports: [...LOGIN_COMPONENTS],
  providers: [LoginService]
})
export class LoginModule {
}
