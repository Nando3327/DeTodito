import { NgModule } from '@angular/core';
import { CATEGORIES_COMPONENTS } from './components';
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
  declarations: [...CATEGORIES_COMPONENTS],
  entryComponents: [],
  exports: [...CATEGORIES_COMPONENTS],
  providers: []
})
export class CategoriesModule {
}
