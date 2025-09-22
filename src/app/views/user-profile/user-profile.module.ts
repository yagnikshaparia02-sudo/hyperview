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
import { UserProfileRoutingModule } from "./user-profile-routing.module";
import { UserProfileComponent } from "./user-profile.component";
import { NgxIndexedDBModule } from "ngx-indexed-db";
import { dbConfig } from "src/app/_helpers/indexedDb";

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    SharedModule,
    LoaderModule,
    TableLoaderModule,
    FormsModule,
    NgxPermissionsModule,
    NgxIndexedDBModule.forRoot(dbConfig),
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: CustomErrorStateMatcher },
    MatDatepickerModule,
  ],
})
export class UserProfileModule {}
