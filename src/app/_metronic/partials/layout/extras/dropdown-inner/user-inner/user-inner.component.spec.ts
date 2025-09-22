import { ComponentFixture, TestBed } from "@angular/core/testing";
import { UserInnerComponent } from "./user-inner.component";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { TranslationService } from "src/app/_module/i18n";
import { BaseComponent } from "src/app/_components/base.component";
import { of } from "rxjs";
import { Injector } from "@angular/core";
import { BaseServiceInjector } from "src/app/_components/base.injector";
import { BsModalService } from "ngx-bootstrap/modal";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";

class MockAuthenticationService {
  logout() {}
}

class MockTranslationService {
  setLanguage(lang: string) {}
}

class MockToastrService {
  success(message: string) {}
  error(message: string) {}
}

class MockTranslateService {
  get(key: string, params: any) {
    return of(key); // mock observable
  }
}

describe("UserInnerComponent", () => {
  let component: UserInnerComponent;
  let fixture: ComponentFixture<UserInnerComponent>;
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserInnerComponent],
      providers: [
        { provide: BsModalService, useClass: BsModalService },
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: TranslationService, useClass: MockTranslationService },
        { provide: BaseComponent, useValue: {} },
        { provide: ToastrService, useClass: MockToastrService },
        { provide: TranslateService, useClass: MockTranslateService },
        HttpClient,
        HttpHandler,
      ],
    }).compileComponents();

    // Assign the injector after configuring the TestBed
    injector = TestBed.inject(Injector);
    // Assign the mock injector to the static property
    BaseServiceInjector.injector = injector;

    fixture = TestBed.createComponent(UserInnerComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.destroy(); // Ensure proper cleanup of the fixture after each test
  });
});
