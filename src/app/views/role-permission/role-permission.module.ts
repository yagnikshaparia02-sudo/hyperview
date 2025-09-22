import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { NgxPermissionsModule } from "ngx-permissions";
import { LoaderModule } from "src/app/_metronic/layout/components/loader";
import { TableLoaderModule } from "src/app/_metronic/layout/components/table-loader";
import { SharedModule } from "src/app/_module/shared.module";
import { CustomErrorStateMatcher } from "../common/custom-error-mathcer";
import { ManagePermissionComponent } from "./manage-permission/manage-permission.component";
import { ManageRoleAddEditComponent } from "./manage-role/manage-role-add-edit/manage-role-add-edit.component";
import { ManageRoleComponent } from "./manage-role/manage-role-list/manage-role.component";
import { RolePermissionRoutingModule } from "./role-permission-routing.module";
import { RolePermissionComponent } from "./role-permission.component";

@NgModule({
  declarations: [
    RolePermissionComponent,
    ManageRoleComponent,
    ManagePermissionComponent,
    ManageRoleAddEditComponent,
  ],
  imports: [
    CommonModule,
    RolePermissionRoutingModule,
    SharedModule,
    LoaderModule,
    TableLoaderModule,
    FormsModule,
    NgxPermissionsModule,
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: CustomErrorStateMatcher },
    MatDatepickerModule,
  ],
})
export class RolePermissionModule {}
