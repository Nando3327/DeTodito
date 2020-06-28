import { NgModule } from '@angular/core';
import { CHANGE_ALIAS_COMPONENTS, ChangeAliasComponent } from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { DemoMaterialModule } from '../material.module';
import { DataTableModule } from '../data-table';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { CommonModule } from '@angular/common';
import { ChangeAliasService } from './change-alias.service';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: '',
    component: ChangeAliasComponent,
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
  declarations: [...CHANGE_ALIAS_COMPONENTS],
  entryComponents: [...CHANGE_ALIAS_COMPONENTS],
  exports: [...CHANGE_ALIAS_COMPONENTS],
  providers: [ChangeAliasService]
})
export class ChangeAliasModule {
}
