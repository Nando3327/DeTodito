import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routing';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { LoginModule } from './login';
import { AppService } from './app.service';
import { DialogModule } from './dialog';
import { SpinnerModule } from './spinner';
import { FormsValidatorService } from './services/validator.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, `../assets/i18n/`, '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    LoginModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      isolate: false
    }),
    FormlyModule.forRoot({
      validationMessages: [
        {name: 'required', message: 'Campo obligatorio'},
        {name: 'email', message: 'Email incorrecto'},
        {name: 'invalidDateFormat', message: 'Formato fecha invalido'},
        {name: 'ConfirmPassword', message: 'Contraseñas no coinciden'},
        {name: 'SamePassword', message: 'Contraseña actual no puede ser la anterior'}
      ],
    }),
    FormlyMaterialModule,
    DialogModule,
    SpinnerModule.forRoot({
      type: 'ball-spin',
      size: 'medium',
      bdColor: 'rgba(0, 0, 0, 0.6)',
      color: 'white'
    })
  ],
  exports: [DialogModule],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    AppService, FormsValidatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
