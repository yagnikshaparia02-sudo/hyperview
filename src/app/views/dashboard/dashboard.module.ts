import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { WidgetsModule } from "../../_metronic/partials";
import { LoaderModule } from "src/app/_metronic/layout/components/loader";
import { DBConfig, NgxIndexedDBModule } from "ngx-indexed-db";
import { dbConfig } from "src/app/_helpers/indexedDb";
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: DashboardComponent,
      },
    ]),
    WidgetsModule,
    //ModalsModule,
    LoaderModule,
    NgxIndexedDBModule.forRoot(dbConfig),
  ],
})
export class DashboardModule {}
