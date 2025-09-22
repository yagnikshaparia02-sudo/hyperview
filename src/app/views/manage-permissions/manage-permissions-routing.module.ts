import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ManagePermissionsAddEditComponent } from "./manage-permissions-add-edit/manage-permissions-add-edit.component";
import { ManagePermissionsListComponent } from "./manage-permissions-list/manage-permissions-list.component";
import { ManagePermissionsComponent } from "./manage-permissions.component";

const routes: Routes = [
  {
    path: "",
    component: ManagePermissionsComponent,
    data: {
      title: "Manage User Permissions",
    },
    children: [
      {
        path: "list",
        component: ManagePermissionsListComponent,
        data: {
          title: "User Permissions List",
          permission: "userPermissions.list",
        },
      },
      {
        path: "create",
        component: ManagePermissionsAddEditComponent,
        data: {
          title: "User Permissions Create",
          permission: "userPermissions.create",
        },
      },
      {
        path: "edit/:id",
        component: ManagePermissionsAddEditComponent,
        data: {
          title: "User Permissions Edit",
          permission: "userPermissions.edit",
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
export class ManagePermissionsRoutingModule {}
