import { ComponentFixture, TestBed } from "@angular/core/testing";
import { InlineSVGModule } from "ng-inline-svg-2";
import { HttpBackend, HttpClient, HttpHandler } from "@angular/common/http";
import { BaseTablesWidget2Component } from "./base-tables-widget2.component";
import { SharedModule } from "../../../../../shared/shared.module";

describe("BaseTablesWidget2Component", () => {
  let component: BaseTablesWidget2Component;
  let fixture: ComponentFixture<BaseTablesWidget2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, InlineSVGModule],
      declarations: [BaseTablesWidget2Component],
      providers: [HttpClient, HttpHandler, HttpBackend],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseTablesWidget2Component);
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
});
