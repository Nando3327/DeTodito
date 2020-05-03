// angular
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { HomeComponent } from './home/components';


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
  { path: '', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
