import { TestBed, inject } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";

import { POExportService } from "./poexport.service";

describe("POExportService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [POExportService],
    });
  });

  it("should be created", inject(
    [POExportService],
    (service: POExportService) => {
      expect(service).toBeTruthy();
    }
  ));
});
