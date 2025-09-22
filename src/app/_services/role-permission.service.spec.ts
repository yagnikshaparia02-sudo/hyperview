import { TestBed, inject } from "@angular/core/testing";

import { RolePermissionService } from "./role-permission.service";
import { HttpClientModule } from "@angular/common/http";

describe("RolePermissionService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [RolePermissionService],
    });
  });

  it("should be created", inject(
    [RolePermissionService],
    (service: RolePermissionService) => {
      expect(service).toBeTruthy();
    }
  ));
});
