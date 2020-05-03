import { NgModule } from '@angular/core';
import { CATEGORIES_COMPONENTS, CategoriesComponent } from './components';
import { DemoMaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { DataTableModule } from '../data-table';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Route[] = [
  {
    path: '',
    component: CategoriesComponent,
  },
  { path: '', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    DataTableModule,
    FormlyModule.forRoot(),
    FormlyMaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [...CATEGORIES_COMPONENTS],
  entryComponents: [...CATEGORIES_COMPONENTS],
  exports: [...CATEGORIES_COMPONENTS, RouterModule],
  providers: []
})
export class CategoriesModule {
}
