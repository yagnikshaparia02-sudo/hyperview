import { ComponentFixture, TestBed } from "@angular/core/testing";
import { InlineSVGModule } from "ng-inline-svg-2";
import { SharedModule } from "../../../../../shared/shared.module";
import { AdvanceTablesWidget2Component } from "./advance-tables-widget2.component";

describe("AdvanceTablesWidget2Component", () => {
  let component: AdvanceTablesWidget2Component;
  let fixture: ComponentFixture<AdvanceTablesWidget2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, InlineSVGModule],
      declarations: [AdvanceTablesWidget2Component],
    }).compileComponents();

    fixture = TestBed.createComponent(AdvanceTablesWidget2Component);
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
