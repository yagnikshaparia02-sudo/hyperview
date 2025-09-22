import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { LoaderModule } from "src/app/_metronic/layout/components/loader";
import { SharedModule } from "../../_module/shared.module";
import { CustomErrorStateMatcher } from "../common/custom-error-mathcer";
// Profile Routing
import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileComponent } from "./profile.component";

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    LoaderModule,
    SharedModule,
  ],
  declarations: [ProfileComponent],
  providers: [
    { provide: ErrorStateMatcher, useClass: CustomErrorStateMatcher },
    MatDatepickerModule,
  ],
})
export class ProfileModule {}
