import { TestBed, inject } from "@angular/core/testing";

import { UserProfileService } from "./user-profile.service";
import { HttpClientModule } from "@angular/common/http";

describe("UserProfileService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [UserProfileService],
    });
  });

  it("should be created", inject(
    [UserProfileService],
    (service: UserProfileService) => {
      expect(service).toBeTruthy();
    }
  ));
});
