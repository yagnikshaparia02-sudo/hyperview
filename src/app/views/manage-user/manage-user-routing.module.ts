import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ManageUserAddEditComponent } from "./manage-user-add-edit/manage-user-add-edit.component";
import { ManageUserListComponent } from "./manage-user-list/manage-user-list.component";
import { ManageUserComponent } from "./manage-user.component";

const routes: Routes = [
  {
    path: "",
    component: ManageUserComponent,
    data: {
      title: "Manage User",
    },
    children: [
      {
        path: "list",
        component: ManageUserListComponent,
        data: {
          title: "User List",
          permission: "users.list",
        },
      },
      {
        path: "create",
        component: ManageUserAddEditComponent,
        data: {
          title: "User Create",
          permission: "users.create",
        },
      },
      {
        path: "edit/:id",
        component: ManageUserAddEditComponent,
        data: {
          title: "User Edit",
          permission: "users.edit",
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
export class ManageUserRoutingModule {}
