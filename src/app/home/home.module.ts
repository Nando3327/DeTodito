import { NgModule } from '@angular/core';
import { HOME_COMPONENTS, HomeComponent } from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { DemoMaterialModule } from '../material.module';
import { DataTableModule } from '../data-table';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { CommonModule } from '@angular/common';
import { AccordionModule } from '../accordion';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: ''
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
    RouterModule.forChild(routes),
    FormlyModule.forRoot(),
    FormlyMaterialModule,
    AccordionModule
  ],
  declarations: [...HOME_COMPONENTS],
  entryComponents: [...HOME_COMPONENTS],
  exports: [...HOME_COMPONENTS],
  providers: []
})
export class HomeModule {
}
