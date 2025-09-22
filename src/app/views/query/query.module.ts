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
import { QueryRoutingModule } from "./query-routing.module";
import { QueryComponent } from "./query.component";
import { DBConfig, NgxIndexedDBModule } from "ngx-indexed-db";
import { dbConfig } from "src/app/_helpers/indexedDb";
// const dbConfig: DBConfig = {
//   name: "CustomQueryDb",
//   version: 1,
//   objectStoresMeta: [
//     {
//       store: "linnworks",
//       storeConfig: { keyPath: "id", autoIncrement: true },
//       storeSchema: [
//         {
//           name: "linnworksApplicationToken",
//           keypath: "linnworksApplicationToken",
//           options: { unique: false },
//         },
//         {
//           name: "linnworksId",
//           keypath: "linnworksId",
//           options: { unique: false },
//         },
//         {
//           name: "linnworksServerUrl",
//           keypath: "linnworksServerUrl",
//           options: { unique: false },
//         },
//         {
//           name: "linnworksUserToken",
//           keypath: "linnworksUserToken",
//           options: { unique: false },
//         },
//       ],
//     },
//   ],
// };
@NgModule({
  declarations: [QueryComponent],
  imports: [
    CommonModule,
    QueryRoutingModule,
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
export class QueryModule {}
