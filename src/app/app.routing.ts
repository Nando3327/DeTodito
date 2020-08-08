// angular
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { HomeComponent } from './home/components';
import { LoginComponent } from './login/components';

const routes: Route[] = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./categories/categories.module').then(m => m.CategoriesModule)
      },
      {
        path: 'changeAlias',
        loadChildren: () =>
          import('./change-alias/change-alias.module').then(m => m.ChangeAliasModule)
      },
      {
        path: 'resetPassword',
        loadChildren: () =>
          import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule)
      },
      {
        path: 'changeProfile',
        loadChildren: () =>
          import('./change-profile/change-profile.module').then(m => m.ChangeProfileModule)
      },
      {
        path: 'profiles',
        loadChildren: () =>
          import('./profiles/profiles.module').then(m => m.ProfilesModule)
      }
    ],
  },
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
