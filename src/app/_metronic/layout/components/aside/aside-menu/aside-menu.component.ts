import { Component, OnInit } from "@angular/core";
import { environment } from "../../../../../../environments/environment";
import { BaseComponent } from "../../../../../_components/base.component";
@Component({
  selector: "app-aside-menu",
  templateUrl: "./aside-menu.component.html",
  styleUrls: ["./aside-menu.component.scss"],
})
export class AsideMenuComponent extends BaseComponent implements OnInit {
  appAngularVersion: string = environment.appVersion;
  // appPreviewChangelogUrl: string = environment.appPreviewChangelogUrl;

  constructor() {
    super();
  }

  ngOnInit(): void {}
  redirect(page: string) {
    this.router.navigate([page], {
      queryParams: { ...this.router.parseUrl(this.router.url).queryParams },
    });
  }
}
