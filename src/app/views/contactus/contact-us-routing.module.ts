import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactUSComponent } from "./contact-us.component";

const routes: Routes = [
  {
    path: "",
    component: ContactUSComponent,
    data: {
      title: "Contact Us",
      Permission: "contactus",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactUSRoutingModule {}
