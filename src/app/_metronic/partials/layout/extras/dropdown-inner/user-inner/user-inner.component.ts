import { Component, HostBinding, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { CONFIG } from "src/app/config/app-config";
import { CONFIGCONSTANTS } from "src/app/config/app-constants";
import { BaseComponent } from "src/app/_components/base.component";
import { TranslationService } from "src/app/_module/i18n";
import { AuthenticationService } from "src/app/_services/authentication.service";

@Component({
  selector: "app-user-inner",
  templateUrl: "./user-inner.component.html",
})
export class UserInnerComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  @HostBinding("class")
  class = `menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px`;
  @HostBinding("attr.data-kt-menu") dataKtMenu = "true";

  user$: Observable<any>;
  private unsubscribe: Subscription[] = [];
  siteLogo = CONFIGCONSTANTS.siteLogo;
  userDetails = {
    name: "",
    email: "",
    image: "",
  };

  constructor(
    private auth: AuthenticationService,
    private translationService: TranslationService
  ) {
    super();
  }

  ngOnInit() {
    const decrypted = localStorage.getItem("currentUser");
    if (decrypted) {
      const currentUser = JSON.parse(
        this.EncrDecr.get(CONFIG.EncrDecrKey, decrypted)
      );
      this.userDetails = {
        name: currentUser.name,
        email: currentUser.email,
        image: currentUser?.image ?? this.siteLogo,
      };
    }
  }

  logout() {
    this.auth.logout();
    document.location.reload();
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
