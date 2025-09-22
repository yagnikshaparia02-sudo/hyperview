import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { POExportComponent } from "./poexport.component";

const routes: Routes = [
  {
    path: "",
    component: POExportComponent,
    data: {
      title: "POExport",
      Permission: "purchaseorderexport",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class POExportRoutingModule {}
