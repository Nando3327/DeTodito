import { NgModule } from '@angular/core';
import { SIDE_BAR_LOGIN_COMPONENTS } from './components';
import { DemoMaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    DemoMaterialModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyMaterialModule],
  declarations: [...SIDE_BAR_LOGIN_COMPONENTS],
  entryComponents: [],
  exports: [...SIDE_BAR_LOGIN_COMPONENTS],
  providers: []
})
export class SideBarLoginModule {
}
