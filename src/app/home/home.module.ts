import { NgModule } from '@angular/core';
import { HOME_COMPONENTS } from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { DemoMaterialModule } from '../material.module';
import { DataTableModule } from '../data-table';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { CategoriesModule } from '../categories';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    DataTableModule,
    CategoriesModule,
    FormlyModule.forRoot(),
    FormlyMaterialModule
  ],
  declarations: [...HOME_COMPONENTS],
  entryComponents: [...HOME_COMPONENTS],
  exports: [...HOME_COMPONENTS],
  providers: []
})
export class HomeModule {
}
