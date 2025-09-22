import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpBackend, HttpClient, HttpHandler } from "@angular/common/http";
import { SharedModule } from "../../../../../shared/shared.module";
import { InlineSVGModule } from "ng-inline-svg-2";
import { BaseTablesWidget1Component } from "./base-tables-widget1.component";

describe("BaseTablesWidget1Component", () => {
  let component: BaseTablesWidget1Component;
  let fixture: ComponentFixture<BaseTablesWidget1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, InlineSVGModule],
      declarations: [BaseTablesWidget1Component],
      providers: [HttpClient, HttpHandler, HttpBackend],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseTablesWidget1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with currentTab set to "Day"', () => {
    expect(component.currentTab).toBe("Day");
  });

  it("should set currentTab to the specified tab", () => {
    const newTab = "Month";
    component.setCurrentTab(newTab);
    expect(component.currentTab).toBe(newTab);
  });

  it('should initialize progressWidth with default value "min-w-200px" if not provided', () => {
    component.ngOnInit();
    expect(component.progressWidth).toBe("min-w-200px");
  });

  it("should set progressWidth to the provided input value", () => {
    component.progressWidth = "custom-width";
    component.ngOnInit();
    expect(component.progressWidth).toBe("custom-width");
  });
});
