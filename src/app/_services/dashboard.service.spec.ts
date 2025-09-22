import { TestBed, inject } from "@angular/core/testing";

import { DashboardService } from "./dashboard.service";
import { HttpClientModule } from "@angular/common/http";

describe("DashboardService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [DashboardService],
    });
  });

  it("should be created", inject(
    [DashboardService],
    (service: DashboardService) => {
      expect(service).toBeTruthy();
    }
  ));
});
