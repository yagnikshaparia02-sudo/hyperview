import { TestBed, inject } from "@angular/core/testing";

import { ContactUsService } from "./contact-us.service";
import { HttpClientModule } from "@angular/common/http";

describe("ContactUsService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ContactUsService],
    });
  });

  it("should be created", inject(
    [ContactUsService],
    (service: ContactUsService) => {
      expect(service).toBeTruthy();
    }
  ));
});
