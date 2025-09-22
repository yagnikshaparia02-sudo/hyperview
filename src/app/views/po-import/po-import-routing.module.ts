import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { POImportComponent } from "./po-import.component";

const routes: Routes = [
  {
    path: "",
    component: POImportComponent,
    data: {
      title: "Bulk Purchase Orders",
      Permission: "bulkpurchaseordersimport",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class POImportRoutingModule {}
