import { NgModule } from '@angular/core';
import { HOME_COMPONENTS } from './components';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { DemoMaterialModule } from '../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    DemoMaterialModule],
  declarations: [...HOME_COMPONENTS],
  entryComponents: [...HOME_COMPONENTS],
  exports: [...HOME_COMPONENTS],
  providers: []
})
export class HomeModule {
}
