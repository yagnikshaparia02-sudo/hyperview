import { ComponentFixture, TestBed } from "@angular/core/testing";
import { InlineSVGModule } from "ng-inline-svg-2";
import { TablesWidget16Component } from "./tables-widget16.component";
import { DashboardService } from "src/app/_services/dashboard.service";
import { of } from "rxjs";

class MockDashboardService {
  getTotalSalesSource() {
    return of({
      success: true,
      data: JSON.stringify([
        { source: "Online", sales: 200 },
        { source: "Retail", sales: 150 },
      ]),
    });
  }

  getOrdersData() {
    return of({
      success: true,
      data: JSON.stringify([
        { subsource: "Website", sales: 100 },
        { subsource: "Store", sales: 80 },
      ]),
    });
  }
}

describe("TablesWidget16Component", () => {
  let component: TablesWidget16Component;
  let fixture: ComponentFixture<TablesWidget16Component>;
  let dashboardService: DashboardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InlineSVGModule],
      declarations: [TablesWidget16Component],
      providers: [
        { provide: DashboardService, useClass: MockDashboardService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TablesWidget16Component);
    component = fixture.componentInstance;
    dashboardService = TestBed.inject(DashboardService);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize activeTab and sales lists", () => {
    expect(component.activeTab).toBe("kt_table_widget_16_tab_1");
    expect(component.totalSalesList).toBeUndefined();
    expect(component.totalSalesListSubsource).toBeUndefined();
  });

  it("should fetch total sales source data on init", async () => {
    await component.ngOnInit();

    expect(component.totalSalesList.length).toBe(2);
    expect(component.totalSalesList[0].source).toBe("Online");
    expect(component.totalSalesList[1].sales).toBe(150);
  });

  it("should fetch total sales subsource data on init", async () => {
    await component.ngOnInit();

    expect(component.totalSalesListSubsource.length).toBe(2);
    expect(component.totalSalesListSubsource[0].subsource).toBe("Website");
    expect(component.totalSalesListSubsource[1].sales).toBe(80);
  });

  it("should set active tab correctly", () => {
    component.setTab("kt_table_widget_16_tab_2");
    expect(component.activeTab).toBe("kt_table_widget_16_tab_2");
  });

  it("should return active class for active tab", () => {
    expect(component.activeClass("kt_table_widget_16_tab_1")).toBe(
      "show active"
    );
    expect(component.activeClass("kt_table_widget_16_tab_2")).toBe("");
  });
});
