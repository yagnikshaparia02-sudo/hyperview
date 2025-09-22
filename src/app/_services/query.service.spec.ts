import { TestBed, inject } from "@angular/core/testing";

import { QueryService } from "./query.service";
import { HttpClientModule } from "@angular/common/http";

describe("QueryService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [QueryService],
    });
  });

  it("should be created", inject([QueryService], (service: QueryService) => {
    expect(service).toBeTruthy();
  }));
});
