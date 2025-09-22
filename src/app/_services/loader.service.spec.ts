import { TestBed, inject } from "@angular/core/testing";

import { LoaderService } from "./loader.service";
import { HttpClientModule } from "@angular/common/http";

describe("LoaderService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [LoaderService],
    });
  });

  it("should be created", inject([LoaderService], (service: LoaderService) => {
    expect(service).toBeTruthy();
  }));
});
