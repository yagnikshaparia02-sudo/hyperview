import { Component, NgModule, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TableLoaderComponent } from './table-loader.component';

@NgModule({
  imports: [MatProgressSpinnerModule],
  declarations: [TableLoaderComponent],
  exports: [TableLoaderComponent],
})
export class TableLoaderModule {
  static forRoot() {
    return {
      NgModule: TableLoaderComponent,
    };
  }
}
