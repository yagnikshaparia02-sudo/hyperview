import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ExportCSVComponent } from "./export-csv.component";

const routes: Routes = [
  {
    path: "",
    component: ExportCSVComponent,
    data: {
      title: "exportcsv",
      Permission: "exportcsvpermission",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExportcsvRoutingModule {}
