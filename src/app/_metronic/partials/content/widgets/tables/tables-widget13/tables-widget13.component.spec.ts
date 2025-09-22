import { ComponentFixture, TestBed } from "@angular/core/testing";
import { InlineSVGModule } from "ng-inline-svg-2";
import { TablesWidget13Component } from "./tables-widget13.component";
import { DashboardService } from "src/app/_services/dashboard.service";
import { of } from "rxjs";

class MockDashboardService {
  getSevenDaysData() {
    return of({
      success: true,
      data: JSON.stringify([
        { day: "Monday", value: 100 },
        { day: "Tuesday", value: 120 },
      ]),
    });
  }
}

describe("TablesWidget13Component", () => {
  let component: TablesWidget13Component;
  let fixture: ComponentFixture<TablesWidget13Component>;
  let dashboardService: DashboardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InlineSVGModule],
      declarations: [TablesWidget13Component],
      providers: [
        { provide: DashboardService, useClass: MockDashboardService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TablesWidget13Component);
    component = fixture.componentInstance;
    dashboardService = TestBed.inject(DashboardService);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize activeTab and sevenDaysList", () => {
    expect(component.activeTab).toBe("kt_table_widget_13_tab_1");
    expect(component.sevenDaysList).toBeUndefined();
  });

  it("should fetch seven days data on init", async () => {
    await component.ngOnInit();

    expect(component.sevenDaysList.length).toBe(2);
    expect(component.sevenDaysList[0].day).toBe("Monday");
    expect(component.sevenDaysList[1].value).toBe(120);
  });

  it("should set active tab correctly", () => {
    component.setTab("kt_table_widget_13_tab_2");
    expect(component.activeTab).toBe("kt_table_widget_13_tab_2");
  });

  it("should return active class for active tab", () => {
    expect(component.activeClass("kt_table_widget_13_tab_1")).toBe(
      "show active"
    );
    expect(component.activeClass("kt_table_widget_13_tab_2")).toBe("");
  });
});
