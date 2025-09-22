import { TestBed, inject } from "@angular/core/testing";

import { ManageUserService } from "./manage-user.service";
import { HttpClientModule } from "@angular/common/http";

describe("ManageUserService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ManageUserService],
    });
  });

  it("should be created", inject(
    [ManageUserService],
    (service: ManageUserService) => {
      expect(service).toBeTruthy();
    }
  ));
});
