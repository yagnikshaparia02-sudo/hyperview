import { TestBed, inject } from "@angular/core/testing";

import { ExportcsvService } from "./exportcsv.service";
import { HttpClientModule } from "@angular/common/http";

describe("ExportcsvService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ExportcsvService],
    });
  });

  it("should be created", inject(
    [ExportcsvService],
    (service: ExportcsvService) => {
      expect(service).toBeTruthy();
    }
  ));
});
