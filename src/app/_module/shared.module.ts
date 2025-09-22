import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MaterialModules } from '../material.module';
import { BadgeCustomLabelComponent } from '../views/common/badge-custom-label.component';
import { CustomShowMoreTable } from '../views/common/custom-show-more-table.component';
import { DeletePopupboxComponent } from '../views/common/delete-popupbox/delete-popupbox.component';
import { AppShowMoreComponent } from '../views/common/show-more-data.component';
import { StatusPopupboxComponent } from '../views/common/status-popupbox/status-popupbox.component';
import { BaseComponent } from '../_components/base.component';
import { InvalidFormScrollNGFormDirective } from '../_directives/invalid-form-scroll-ngform.directive';
import { MultiRadioValidationDirective } from '../_directives/multi-radio-validation.directive';
import { NumberOnlyDirective } from '../_directives/number-only.directive';
import { StylePaginatorDirective } from '../_directives/style-paginator.directive';
import { MyMissingTranslationHandler } from '../_helpers/translator';
import { LoaderModule } from '../_metronic/layout/components/loader';
import { CustomDate } from '../_pipe/customDate.pipe';

@NgModule({
  declarations: [
    BaseComponent,
    CustomDate,
    NumberOnlyDirective,
    InvalidFormScrollNGFormDirective,
    MultiRadioValidationDirective,
    StylePaginatorDirective,
    BadgeCustomLabelComponent,
    DeletePopupboxComponent,
    StatusPopupboxComponent,
    AppShowMoreComponent,
    CustomShowMoreTable,
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild({
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler },
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    LoaderModule,
    MaterialModules,
    NgxPermissionsModule,
  ],
  exports: [
    CustomDate,
    TranslatePipe,
    NumberOnlyDirective,
    InvalidFormScrollNGFormDirective,
    MultiRadioValidationDirective,
    StylePaginatorDirective,
    CommonModule,
    FormsModule,
    MaterialModules,
    BadgeCustomLabelComponent,
    DeletePopupboxComponent,
    StatusPopupboxComponent,
    AppShowMoreComponent,
    CustomShowMoreTable,
  ],
})
export class SharedModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
