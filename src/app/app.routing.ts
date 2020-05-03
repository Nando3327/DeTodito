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
    ]
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
