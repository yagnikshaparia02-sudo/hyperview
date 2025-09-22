import { ComponentFixture, TestBed } from "@angular/core/testing";
import { InlineSVGModule } from "ng-inline-svg-2";
import { HttpBackend, HttpClient, HttpHandler } from "@angular/common/http";
import { SharedModule } from "../../../../../shared/shared.module";
import { AdvanceTablesWidget7Component } from "./advance-tables-widget7.component";

describe("AdvanceTablesWidget7Component", () => {
  let component: AdvanceTablesWidget7Component;
  let fixture: ComponentFixture<AdvanceTablesWidget7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, InlineSVGModule],
      declarations: [AdvanceTablesWidget7Component],
      providers: [HttpClient, HttpHandler, HttpBackend],
    }).compileComponents();

    fixture = TestBed.createComponent(AdvanceTablesWidget7Component);
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
    const newTab = "Week";
    component.setCurrentTab(newTab);
    expect(component.currentTab).toBe(newTab);
  });
});
