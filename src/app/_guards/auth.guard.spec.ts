import { TestBed } from "@angular/core/testing";
import { Router, RouterStateSnapshot } from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { NgxPermissionsService } from "ngx-permissions";
import { EncrDecrService } from "../_services/encr-decr.service";
import { of } from "rxjs";
import { ActivatedRouteSnapshot } from "@angular/router";

describe("AuthGuard", () => {
  let guard: AuthGuard;
  let router: Router;
  let permissionsService: NgxPermissionsService;
  let encrDecrService: EncrDecrService;

  beforeEach(() => {
    const mockRouter = {
      navigate: jasmine.createSpy("navigate"),
    };

    const mockPermissionsService = {
      loadPermissions: jasmine.createSpy("loadPermissions"),
    };

    const mockEncrDecrService = {
      get: jasmine
        .createSpy("get")
        .and.returnValue('{"permissions":[{"name":"user"}]}'),
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: mockRouter },
        { provide: NgxPermissionsService, useValue: mockPermissionsService },
        { provide: EncrDecrService, useValue: mockEncrDecrService },
      ],
    });

    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
    permissionsService = TestBed.inject(NgxPermissionsService);
    encrDecrService = TestBed.inject(EncrDecrService);
  });

  it("should be created", () => {
    expect(guard).toBeTruthy();
  });

  it("should load permissions and return true if the user has the required permission", () => {
    const route = new ActivatedRouteSnapshot();
    route.data = { permission: "user" }; // Required permission
    const state = { url: "/test" } as RouterStateSnapshot;

    const result = guard.canActivate(route, state);

    expect(result).toBeTrue();
    expect(permissionsService.loadPermissions).toHaveBeenCalledWith(["user"]);
  });

  it("should navigate to 403 if the user does not have the required permission", () => {
    const route = new ActivatedRouteSnapshot();
    route.data = { permission: "admin" }; // Required permission that does not exist
    const state = { url: "/test" } as RouterStateSnapshot;

    const result = guard.canActivate(route, state);

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(["/403"]);
  });

  it("should call canActivateChild and return the result of canActivate", () => {
    const route = new ActivatedRouteSnapshot();
    const state = { url: "/test" } as RouterStateSnapshot;

    spyOn(guard, "canActivate").and.returnValue(true);
    const result = guard.canActivateChild(route, state);

    expect(result).toBeTrue();
    expect(guard.canActivate).toHaveBeenCalledWith(route, state);
  });
});
