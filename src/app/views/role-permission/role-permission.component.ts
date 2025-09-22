import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../../_components/base.component";

@Component({
  selector: "app-role-permission",
  templateUrl: "./role-permission.component.html",
  styleUrls: ["./role-permission.component.scss"],
})
export class RolePermissionComponent extends BaseComponent implements OnInit {
  reloadPermission = false;
  reloadRole = false;
  constructor() {
    super();
  }

  ngOnInit() {}

  refreshPermission() {
    if (this.reloadPermission) {
      this.reloadPermission = false;
    } else {
      this.reloadPermission = true;
    }
  }

  refreshRoles() {
    if (this.reloadRole) {
      this.reloadRole = false;
    } else {
      this.reloadRole = true;
    }
  }
}
