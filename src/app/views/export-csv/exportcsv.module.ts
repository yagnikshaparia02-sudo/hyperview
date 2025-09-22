import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExportCSVComponent } from "./export-csv.component";
import {
  FormControl,
  FormControlName,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { NgxPermissionsModule } from "ngx-permissions";
import { TableLoaderModule } from "src/app/_metronic/layout/components/table-loader";
import { SharedModule } from "src/app/_module/shared.module";
import { LoaderModule } from "src/app/loader";
import { POExportRoutingModule } from "../poexport/poexport-routing.module";
import { ErrorStateMatcher } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { CustomErrorStateMatcher } from "../common/custom-error-mathcer";
import { ExportcsvRoutingModule } from "./exportcsv-routing.module";
import { DBConfig, NgxIndexedDBModule } from "ngx-indexed-db";
import { dbConfig } from "src/app/_helpers/indexedDb";

@NgModule({
  declarations: [ExportCSVComponent],
  imports: [
    CommonModule,
    ExportcsvRoutingModule,
    SharedModule,
    LoaderModule,
    TableLoaderModule,
    FormsModule,
    NgxPermissionsModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    ReactiveFormsModule,
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: CustomErrorStateMatcher },
    MatDatepickerModule,
  ],
})
export class ExportcsvModule {}
