// core imports
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Router } from "@angular/router";
// third party imports
import { BsModalService } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { BsModalRef } from "ngx-bootstrap/modal";
import { LoaderModule } from "src/app/_metronic/layout/components/loader";
// application imports
import { ProfileComponent } from "./profile.component";
import { Injector, NO_ERRORS_SCHEMA } from "@angular/core";
import { BaseServiceInjector } from "src/app/_components/base.injector";
import { ManageUserService } from "../../_services/manage-user.service";
import { AuthenticationService } from "../../_services/authentication.service";
import { LoaderService } from "../../_services/loader.service";
import { EncrDecrService } from "../../_services/encr-decr.service";
import { CommonServiceService } from "../../_services/common-service.service";
import {
  TranslateService,
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader,
} from "@ngx-translate/core";
import { FormsModule } from "@angular/forms";
import { of } from "rxjs";

class MockInjector {
  get(service: any) {
    switch (service) {
      case BsModalService:
      case LoaderService:
        return {
          showLoader: jasmine.createSpy("showLoader"),
          hideLoader: jasmine.createSpy("hideLoader"),
        };
      case ToastrService:
        return {
          success: jasmine.createSpy("success"),
          error: jasmine.createSpy("error"),
        };
      case Router:
        return { navigate: jasmine.createSpy("navigate") };
      case TranslateService:
        return {
          get: jasmine
            .createSpy("get")
            .and.returnValue(of("TRANSLATED_MESSAGE")),
        };
      case EncrDecrService:
        return { get: jasmine.createSpy("get").and.returnValue("{}") };
      case CommonServiceService:
        return {};
    }
  }
}

describe("ProfileComponent", () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let manageUserService: ManageUserService;
  let authService: AuthenticationService;
  let toastrService: ToastrService;
  let router: Router;
  let injector: Injector;

  beforeEach(async () => {
    const injector = new MockInjector();
    BaseServiceInjector.injector = injector as unknown as Injector;

    const manageUserServiceStub = {
      changePassword: jasmine
        .createSpy("changePassword")
        .and.returnValue(
          of({ success: true, message: "Password changed successfully" })
        ),
    };

    const authServiceStub = {
      getLogginUserDetails: jasmine
        .createSpy("getLogginUserDetails")
        .and.returnValue({
          userId: "123",
        }),
    };

    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [LoaderModule, TranslateModule.forRoot(), FormsModule],
      providers: [
        { provide: ManageUserService, useValue: manageUserServiceStub },
        { provide: AuthenticationService, useValue: authServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    manageUserService = TestBed.inject(ManageUserService);
    authService = TestBed.inject(AuthenticationService);
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });
});
