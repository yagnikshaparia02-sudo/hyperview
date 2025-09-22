import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Error404Component } from "./views/error/error404/error404.component";
import { Error500Component } from "./views/error/error500/error500.component";
import { LoginComponent } from "./views/login/login.component";
import { ResetPasswordComponent } from "./views/reset-password/reset-password.component";
import { AuthGuard } from "./_guards/auth.guard";
import { LayoutComponent } from "./_metronic/layout/layout.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "404",
    component: Error404Component,
    data: {
      title: "Page 404",
    },
  },
  {
    path: "500",
    component: Error500Component,
    data: {
      title: "Page 500",
    },
  },
  {
    path: "login",
    component: LoginComponent,
    data: {
      title: "Login Page",
    },
  },
  {
    path: "reset-password/:id",
    component: ResetPasswordComponent,
    data: {
      title: "Reset Password Page",
    },
  },
  {
    path: "",
    component: LayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: "HOME",
    },
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("./views/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "manage-user",
        loadChildren: () =>
          import("./views/manage-user/manage-user.module").then(
            (m) => m.ManageUserModule
          ),
        canActivateChild: [AuthGuard],
      },
      {
        path: "manage-role-permission",
        loadChildren: () =>
          import("./views/role-permission/role-permission.module").then(
            (m) => m.RolePermissionModule
          ),
        canActivateChild: [AuthGuard],
      },
      {
        path: "manage-permissions",
        loadChildren: () =>
          import("./views/manage-permissions/manage-permissions.module").then(
            (m) => m.ManagePermissionsModule
          ),
        canActivateChild: [AuthGuard],
      },
      {
        path: "manage-profile",
        loadChildren: () =>
          import("./views/profile/profile.module").then((m) => m.ProfileModule),
        canActivateChild: [AuthGuard],
      },
      {
        path: "query",
        loadChildren: () =>
          import("./views/query/query.module").then((m) => m.QueryModule),
        canActivateChild: [AuthGuard],
      },
      {
        path: "user-profile",
        loadChildren: () =>
          import("./views/user-profile/user-profile.module").then(
            (m) => m.UserProfileModule
          ),
        canActivateChild: [AuthGuard],
      },
      {
        path: "po-export",
        loadChildren: () =>
          import("./views/poexport/poexport.module").then(
            (m) => m.POExportModule
          ),
        canActivateChild: [AuthGuard],
      },
      {
        path: "exportcsv",
        loadChildren: () =>
          import("./views/export-csv/exportcsv.module").then(
            (m) => m.ExportcsvModule
          ),
        canActivateChild: [AuthGuard],
      },
      {
        path: "po-import",
        loadChildren: () =>
          import("./views/po-import/po-import.module").then(
            (m) => m.POImportModule
          ),
        canActivateChild: [AuthGuard],
      },
      {
        path: "contact-us",
        loadChildren: () =>
          import("./views/contactus/contact-us.module").then(
            (m) => m.ContactUSModule
          ),
        canActivateChild: [AuthGuard],
      },
    ],
  },
  {
    path: "**",
    redirectTo: "404",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
