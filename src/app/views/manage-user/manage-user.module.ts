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
import { ManageUserAddEditComponent } from "./manage-user-add-edit/manage-user-add-edit.component";
import { ManageUserListComponent } from "./manage-user-list/manage-user-list.component";
import { ManageUserRoutingModule } from "./manage-user-routing.module";
import { ManageUserComponent } from "./manage-user.component";

@NgModule({
  declarations: [
    ManageUserComponent,
    ManageUserListComponent,
    ManageUserAddEditComponent,
  ],
  imports: [
    CommonModule,
    ManageUserRoutingModule,
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
export class ManageUserModule {}
