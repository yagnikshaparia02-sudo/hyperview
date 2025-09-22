import { TestBed, ComponentFixture } from "@angular/core/testing";
import { BaseComponent } from "./base.component";
import { Injector } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { LoaderService } from "../_services/loader.service";
import { CommonServiceService } from "../_services/common-service.service";
import { EncrDecrService } from "../_services/encr-decr.service";
import { MultilingualService } from "../_services/multilingual.service";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { BaseServiceInjector } from "./base.injector";
import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from "@angular/common/http";

// Mock Services
class MockToastrService {
  success(message: string) {}
  error(message: string) {}
}

class MockTranslateService {
  get(key: string, params: any) {
    return of(key); // mock observable
  }
}

class MockLoaderService {
  showLoader() {}
  hideLoader() {}
}

describe("BaseComponent", () => {
  let component: BaseComponent;
  let fixture: ComponentFixture<BaseComponent>;
  let injector: Injector;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseComponent],
      providers: [
        { provide: BsModalService, useClass: BsModalService },
        { provide: ToastrService, useClass: MockToastrService },
        { provide: TranslateService, useClass: MockTranslateService },
        { provide: LoaderService, useClass: MockLoaderService },
        { provide: Router, useValue: {} }, // Mock Router if needed
        CommonServiceService,
        EncrDecrService,
        MultilingualService,
        BsModalRef,
        HttpClient,
        HttpHandler,
      ],
    }).compileComponents();

    // Assign the injector after configuring the TestBed
    injector = TestBed.inject(Injector);

    // Assign the mock injector to the static property
    BaseServiceInjector.injector = injector;

    fixture = TestBed.createComponent(BaseComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // Add your specific test cases here
});
