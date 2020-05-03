import { NgModule } from '@angular/core';
import { LOGIN_COMPONENTS } from './components';
import { DemoMaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  imports: [DemoMaterialModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule],
  declarations: [...LOGIN_COMPONENTS],
  entryComponents: [],
  exports: [...LOGIN_COMPONENTS],
  providers: []
})
export class LoginModule {
}
