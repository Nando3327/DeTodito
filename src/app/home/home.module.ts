import { NgModule } from '@angular/core';
import { HOME_COMPONENTS } from './components';


@NgModule({
  imports: [],
  declarations: [...HOME_COMPONENTS],
  entryComponents: [],
  exports: [...HOME_COMPONENTS],
  providers: []
})
export class HomeModule {
}
