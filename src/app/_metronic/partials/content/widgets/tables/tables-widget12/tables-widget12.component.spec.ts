import { ComponentFixture, TestBed } from "@angular/core/testing";
import { InlineSVGModule } from "ng-inline-svg-2";
import { TablesWidget12Component } from "./tables-widget12.component";
import { DashboardService } from "src/app/_services/dashboard.service";
import { LoaderService } from "src/app/_services/loader.service";
import { of } from "rxjs";

class MockDashboardService {
  getAverageOrderSummary() {
    return of({
      success: true,
      data: JSON.stringify([{ Source: "Online" }, { Source: "Retail" }]),
    });
  }
}

class MockLoaderService {
  showLoader() {}
  hideLoader() {}
}

describe("TablesWidget12Component", () => {
  let component: TablesWidget12Component;
  let fixture: ComponentFixture<TablesWidget12Component>;
  let dashboardService: DashboardService;
  let loaderService: LoaderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InlineSVGModule],
      declarations: [TablesWidget12Component],
      providers: [
        { provide: DashboardService, useClass: MockDashboardService },
        { provide: LoaderService, useClass: MockLoaderService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TablesWidget12Component);
    component = fixture.componentInstance;
    dashboardService = TestBed.inject(DashboardService);
    loaderService = TestBed.inject(LoaderService);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize activeTab and averageOrderSummaryList", () => {
    expect(component.activeTab).toBe("kt_table_widget_12_tab_1");
    expect(component.averageOrderSummaryList).toEqual([]);
  });

  it("should fetch average order summary on init", async () => {
    spyOn(loaderService, "showLoader").and.callThrough();
    spyOn(loaderService, "hideLoader").and.callThrough();

    await component.ngOnInit();

    expect(loaderService.showLoader).toHaveBeenCalled();
    expect(loaderService.hideLoader).toHaveBeenCalled();
    expect(component.averageOrderSummaryList.length).toBe(2);
    expect(component.averageOrderSummaryList[0].Source).toBe("Online");
  });
});
