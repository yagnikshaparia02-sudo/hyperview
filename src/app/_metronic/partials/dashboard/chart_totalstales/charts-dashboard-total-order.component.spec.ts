import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ChartsDashboardTotalSalesComponent } from "./charts-dashboard-total-order.component";
import { DashboardService } from "src/app/_services/dashboard.service";
import userDetails from "../../../../../assets/responseData.json";
import { of } from "rxjs";

describe("ChartsDashboardTotalSalesComponent", () => {
  let component: ChartsDashboardTotalSalesComponent;
  let fixture: ComponentFixture<ChartsDashboardTotalSalesComponent>;
  let mockDashboardService: DashboardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartsDashboardTotalSalesComponent],
      imports: [HttpClientTestingModule],
      providers: [DashboardService],
    }).compileComponents();

    // Inject DashboardService
    mockDashboardService = TestBed.inject(DashboardService);

    // Mock the getTotalSalesChart method
    spyOn(mockDashboardService, "getTotalSalesChart").and.returnValue(
      of({
        data: userDetails.data,
        userId: userDetails.id,
      })
    );

    fixture = TestBed.createComponent(ChartsDashboardTotalSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
