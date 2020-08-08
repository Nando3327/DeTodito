import { NgModule } from '@angular/core';
import { PROFILES_COMPONENTS, ProfilesComponent } from './components';
import { DemoMaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { DataTableModule } from '../data-table';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfilesService } from './profiles.service';

const routes: Route[] = [
  {
    path: '',
    component: ProfilesComponent,
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
  declarations: [...PROFILES_COMPONENTS],
  entryComponents: [...PROFILES_COMPONENTS],
  exports: [...PROFILES_COMPONENTS, RouterModule],
  providers: [ProfilesService]
})
export class ProfilesModule {
}
