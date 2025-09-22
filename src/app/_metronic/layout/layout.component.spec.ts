import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LayoutComponent } from "./layout.component";
import { LayoutService } from "./core/layout.service";
import { LayoutInitService } from "./core/layout-init.service";
import { ElementRef } from "@angular/core";
import { of } from "rxjs";

class MockLayoutService {
  getProp(key: string) {
    return true; // mock return value
  }

  getStringCSSClasses(key: string) {
    return "mock-css-class"; // mock return value
  }

  getHTMLAttributes(key: string) {
    return { "data-test": "value" }; // mock return value
  }
}

class MockLayoutInitService {
  init() {
    // mock implementation
  }
}

describe("LayoutComponent", () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let layoutService: LayoutService;
  let initService: LayoutInitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutComponent],
      providers: [
        { provide: LayoutService, useClass: MockLayoutService },
        { provide: LayoutInitService, useClass: MockLayoutInitService },
      ],
    });

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    layoutService = TestBed.inject(LayoutService);
    initService = TestBed.inject(LayoutInitService);

    // Mock the ViewChild references
    component.ktAside = new ElementRef(document.createElement("div"));
    component.ktHeaderMobile = new ElementRef(document.createElement("div"));
    component.ktHeader = new ElementRef(document.createElement("div"));
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize properties correctly on ngOnInit", () => {
    spyOn(layoutService, "getProp").and.callThrough();
    spyOn(layoutService, "getStringCSSClasses").and.callThrough();
    spyOn(layoutService, "getHTMLAttributes").and.callThrough();

    component.ngOnInit();

    expect(layoutService.getProp).toHaveBeenCalledWith("aside.display");
    expect(layoutService.getProp).toHaveBeenCalledWith("toolbar.display");
    expect(layoutService.getStringCSSClasses).toHaveBeenCalledWith(
      "contentContainer"
    );
    expect(layoutService.getStringCSSClasses).toHaveBeenCalledWith("aside");
    expect(layoutService.getStringCSSClasses).toHaveBeenCalledWith("header");
    expect(layoutService.getHTMLAttributes).toHaveBeenCalledWith("headerMenu");

    expect(component.asideDisplay).toBe(true);
    expect(component.toolbarDisplay).toBe(true);
    expect(component.contentContainerClasses).toBe("mock-css-class");
    expect(component.asideCSSClasses).toBe("mock-css-class");
    expect(component.headerCSSClasses).toBe("mock-css-class");
    expect(component.headerHTMLAttributes).toEqual({ "data-test": "value" });
  });
});
