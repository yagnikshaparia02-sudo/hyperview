import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { NgxPermissionsService } from "ngx-permissions";
import { Observable } from "rxjs";
import { CONFIG } from "../config/app-config";
import { EncrDecrService } from "../_services/encr-decr.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private permissionsService: NgxPermissionsService,
    private EncrDecr: EncrDecrService,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const decrypted = localStorage.getItem("currentUser");
    const currentUser = this.EncrDecr.get(CONFIG.EncrDecrKey, decrypted);
    if (!currentUser) {
      // not logged in so redirect to login page with the return url
      this.router.navigate(["/login"], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }
    const currentUserJSON = JSON.parse(
      this.EncrDecr.get(CONFIG.EncrDecrKey, decrypted)
    );
    const currentUserPermissions = currentUserJSON?.permissions;
    const permissionList = [];
    currentUserPermissions.forEach((element) => {
      permissionList.push(element.name);
    });
    const routePermission = next.data.permission || null;
    // const index = currentUserPermissions.findIndex((ele) => ele.name);
    this.permissionsService.loadPermissions(permissionList);
    if (
      routePermission == null ||
      permissionList.indexOf(routePermission) !== -1
    ) {
      return true;
    } else {
      this.router.navigate(["/403"]);
      return false;
    }
  }

  /*
   * Authentication check for child routes, In case we want to protect only child route.
   */
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
