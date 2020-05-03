import { NgModule } from '@angular/core';
import { CATEGORIES_COMPONENTS } from './components';
import { DemoMaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { DataTableModule } from '../data-table';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

@NgModule({
  imports: [
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    DataTableModule,
    FormlyModule.forRoot(),
    FormlyMaterialModule,
  ],
  declarations: [...CATEGORIES_COMPONENTS],
  entryComponents: [...CATEGORIES_COMPONENTS],
  exports: [...CATEGORIES_COMPONENTS],
  providers: []
})
export class CategoriesModule {
}
