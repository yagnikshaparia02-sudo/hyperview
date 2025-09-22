import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpBackend, HttpClient, HttpHandler } from "@angular/common/http";
import { InlineSVGModule } from "ng-inline-svg-2";
import { BaseTablesWidget6Component } from "./base-tables-widget6.component";
import { SharedModule } from "../../../../../shared/shared.module";

describe("BaseTablesWidget6Component", () => {
  let component: BaseTablesWidget6Component;
  let fixture: ComponentFixture<BaseTablesWidget6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, InlineSVGModule],
      declarations: [BaseTablesWidget6Component],
      providers: [HttpClient, HttpHandler, HttpBackend],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseTablesWidget6Component);
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

  it("should have predefined tabs", () => {
    expect(component.TABS).toEqual(["Month", "Week", "Day"]);
  });
});
