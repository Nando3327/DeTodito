import { NgModule } from '@angular/core';
import { CHANGE_PROFILE_COMPONENTS, ChangeProfileComponent } from './components';
import { DemoMaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { DataTableModule } from '../data-table';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeProfileService } from './change-profile.service';

const routes: Route[] = [
  {
    path: '',
    component: ChangeProfileComponent,
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
    FormlyModule.forChild(),
    FormlyMaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [...CHANGE_PROFILE_COMPONENTS],
  entryComponents: [...CHANGE_PROFILE_COMPONENTS],
  exports: [...CHANGE_PROFILE_COMPONENTS, RouterModule],
  providers: [ChangeProfileService]
})
export class ChangeProfileModule {
}
