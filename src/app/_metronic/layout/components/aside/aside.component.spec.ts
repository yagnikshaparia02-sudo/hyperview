import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { AsideComponent } from "./aside.component";
import { of } from "rxjs";
import { Injector } from "@angular/core";
import { NavigationEnd } from "@angular/router";
import { BaseServiceInjector } from "src/app/_components/base.injector";
import { BsModalService } from "ngx-bootstrap/modal";
import { LoaderService } from "src/app/_services/loader.service";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { CommonServiceService } from "src/app/_services/common-service.service";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { NgxPermissionsModule } from "ngx-permissions";

// Mock Services
class MockLoaderService {
  showLoader() {}
  hideLoader() {}
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

describe("AsideComponent", () => {
  let component: AsideComponent;
  let fixture: ComponentFixture<AsideComponent>;
  let injector: Injector;

  beforeEach(() => {
    const routerMock = {
      events: of(new NavigationEnd(1, "/", "/")),
    };

    TestBed.configureTestingModule({
      imports: [AsideComponent, NgxPermissionsModule.forRoot()], // Import the standalone component here
      providers: [
        { provide: BsModalService, useClass: BsModalService },
        { provide: LoaderService, useClass: MockLoaderService },
        { provide: ToastrService, useClass: MockToastrService },
        { provide: TranslateService, useClass: MockTranslateService },
        { provide: Router, useValue: routerMock },
        CommonServiceService,
        HttpClient,
        HttpHandler,
      ],
    }).compileComponents();

    // Assign the injector after configuring the TestBed
    injector = TestBed.inject(Injector);

    // Assign the mock injector to the static property
    BaseServiceInjector.injector = injector;

    fixture = TestBed.createComponent(AsideComponent);
    component = fixture.componentInstance;
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });
});
