import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RolePermissionComponent } from "./role-permission.component";

const routes: Routes = [
  {
    path: "",
    component: RolePermissionComponent,
    data: {
      title: "Manage Role Permissions",
    },
    children: [
      {
        path: "list",
        component: RolePermissionComponent,
        data: {
          title: "Role Permissions",
          permission: "userRoles.list",
        },
      },
      { path: "", redirectTo: "list", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolePermissionRoutingModule {}
