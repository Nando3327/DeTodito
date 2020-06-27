import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { STORE_SERVICES } from './entity';

@NgModule({
  imports: [environment.production ? [] : AkitaNgDevtools.forRoot()],
  providers: [...STORE_SERVICES]
})
export class StoreModule {}
