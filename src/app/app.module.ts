import { CommonModule } from "@angular/common";
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Injector,
  NgModule,
  NO_ERRORS_SCHEMA,
} from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { InlineSVGModule } from "ng-inline-svg";
// Import 3rd party components
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ModalModule } from "ngx-bootstrap/modal";
import { TabsModule } from "ngx-bootstrap/tabs";
import { ClipboardModule } from "ngx-clipboard";
import { NgxPermissionsModule } from "ngx-permissions";
import { ToastrModule } from "ngx-toastr";
import { AppComponent } from "./app.component";
// Import routing module
import { AppRoutingModule } from "./app.routing";
import { MaterialModules } from "./material.module";
import { CustomErrorStateMatcher } from "./views/common/custom-error-mathcer";
import { MultiLangBreadcrumbComponent } from "./views/common/multi-lang-breadcrumb";
import { Error404Component } from "./views/error/error404/error404.component";
import { Error500Component } from "./views/error/error500/error500.component";
import { AppForgotPassword } from "./views/login/forgot-password.component";
import { LoginComponent } from "./views/login/login.component";
import { ResetPasswordComponent } from "./views/reset-password/reset-password.component";
import { BaseServiceInjector } from "./_components/base.injector";
// Import containers
import { AuthGuard } from "./_guards/auth.guard";
import { ErrorInterceptor } from "./_helpers/error.interceptor";
import { JwtInterceptor } from "./_helpers/jwt.interceptor";
import { AsideMenuComponent } from "./_metronic/layout/components/aside/aside-menu/aside-menu.component";
import { AsideComponent } from "./_metronic/layout/components/aside/aside.component";
import { ContentComponent } from "./_metronic/layout/components/content/content.component";
import { FooterComponent } from "./_metronic/layout/components/footer/footer.component";
import { HeaderMenuComponent } from "./_metronic/layout/components/header/header-menu/header-menu.component";
import { HeaderComponent } from "./_metronic/layout/components/header/header.component";
import { PageTitleComponent } from "./_metronic/layout/components/header/page-title/page-title.component";
import { ScriptsInitComponent } from "./_metronic/layout/components/scripts-init/scripts-init.component";
import { ToolbarComponent } from "./_metronic/layout/components/toolbar/toolbar.component";
import { TopbarComponent } from "./_metronic/layout/components/topbar/topbar.component";
import { LayoutComponent } from "./_metronic/layout/layout.component";
import { ActivityDrawerComponent } from "./_metronic/partials/layout/drawers/activity-drawer/activity-drawer.component";
import { ExploreMainDrawerComponent } from "./_metronic/partials/layout/drawers/explore-main-drawer/explore-main-drawer.component";
import { MessengerDrawerComponent } from "./_metronic/partials/layout/drawers/messenger-drawer/messenger-drawer.component";
import { NotificationsInnerComponent } from "./_metronic/partials/layout/extras/dropdown-inner/notifications-inner/notifications-inner.component";
import { QuickLinksInnerComponent } from "./_metronic/partials/layout/extras/dropdown-inner/quick-links-inner/quick-links-inner.component";
import { SearchResultInnerComponent } from "./_metronic/partials/layout/extras/dropdown-inner/search-result-inner/search-result-inner.component";
import { UserInnerComponent } from "./_metronic/partials/layout/extras/dropdown-inner/user-inner/user-inner.component";
import { InviteUsersModalComponent } from "./_metronic/partials/layout/modals/invite-users-modal/invite-users-modal.component";
import { MainModalComponent } from "./_metronic/partials/layout/modals/main-modal/main-modal.component";
import { UpgradePlanModalComponent } from "./_metronic/partials/layout/modals/upgrade-plan-modal/upgrade-plan-modal.component";
import { SplashScreenComponent } from "./_metronic/partials/layout/splash-screen/splash-screen.component";
import { HttpLoaderFactory, SharedModule } from "./_module/shared.module";

const APP_CONTAINERS = [
  LayoutComponent,
  AsideComponent,
  HeaderComponent,
  ContentComponent,
  FooterComponent,
  ScriptsInitComponent,
  ToolbarComponent,
  AsideMenuComponent,
  TopbarComponent,
  PageTitleComponent,
  HeaderMenuComponent,
  SplashScreenComponent,
  InviteUsersModalComponent,
  MainModalComponent,
  UpgradePlanModalComponent,
  UserInnerComponent,
  SearchResultInnerComponent,
  QuickLinksInnerComponent,
  NotificationsInnerComponent,
  MessengerDrawerComponent,
  ExploreMainDrawerComponent,
  ActivityDrawerComponent,
  MultiLangBreadcrumbComponent,
  AppForgotPassword,
  ResetPasswordComponent,
];
const POPUP_COMPONENT = [];
// const APP_CONTAINERS = [DefaultLayoutComponent];
const CUSTOM_MODULES = [InlineSVGModule, SharedModule, MaterialModules];
const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ...BASE_MODULES,
    HttpClientModule,
    NgxPermissionsModule.forRoot(),
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      closeButton: true,
      preventDuplicates: true,
    }), // ToastrModule added
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ClipboardModule,
    CUSTOM_MODULES,
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    Error404Component,
    Error500Component,
    LoginComponent,
    ...POPUP_COMPONENT,
  ],
  providers: [
    AuthGuard,
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: ErrorStateMatcher, useClass: CustomErrorStateMatcher },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {
  constructor(private injector: Injector) {
    // Create global Service Injector.
    BaseServiceInjector.injector = this.injector;
  }
}
