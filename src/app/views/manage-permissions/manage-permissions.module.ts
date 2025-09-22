import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { NgxPermissionsModule } from "ngx-permissions";
import { LoaderModule } from "src/app/_metronic/layout/components/loader";
import { TableLoaderModule } from "src/app/_metronic/layout/components/table-loader";
import { SharedModule } from "src/app/_module/shared.module";
import { CustomErrorStateMatcher } from "../common/custom-error-mathcer";
import { ManagePermissionsAddEditComponent } from "./manage-permissions-add-edit/manage-permissions-add-edit.component";
import { ManagePermissionsListComponent } from "./manage-permissions-list/manage-permissions-list.component";
import { ManagePermissionsRoutingModule } from "./manage-permissions-routing.module";
import { ManagePermissionsComponent } from "./manage-permissions.component";

@NgModule({
  declarations: [
    ManagePermissionsComponent,
    ManagePermissionsListComponent,
    ManagePermissionsAddEditComponent,
  ],
  imports: [
    CommonModule,
    ManagePermissionsRoutingModule,
    SharedModule,
    LoaderModule,
    TableLoaderModule,
    FormsModule,
    NgxPermissionsModule,
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: CustomErrorStateMatcher },
  ],
})
export class ManagePermissionsModule {}
