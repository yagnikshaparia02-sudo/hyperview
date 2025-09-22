import { Injector } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { BsModalService } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { CommonServiceService } from "../_services/common-service.service";
import { EncrDecrService } from "../_services/encr-decr.service";
import { LoaderService } from "../_services/loader.service";
import { MultilingualService } from "../_services/multilingual.service";

export class BaseServiceInjector {
  static injector: Injector;
  protected modalService: BsModalService;
  protected loader: LoaderService;
  protected toastr: ToastrService;
  protected router: Router;
  public translateService: TranslateService;
  protected multilingualService: MultilingualService;
  protected EncrDecr: EncrDecrService;
  protected CommonService: CommonServiceService;

  constructor() {
    this.modalService = BaseServiceInjector.injector.get(BsModalService);
    this.loader = BaseServiceInjector.injector.get(LoaderService);
    this.toastr = BaseServiceInjector.injector.get(ToastrService);
    this.router = BaseServiceInjector.injector.get(Router);
    this.translateService = BaseServiceInjector.injector.get(TranslateService);
    this.multilingualService =
      BaseServiceInjector.injector.get(MultilingualService);
    this.EncrDecr = BaseServiceInjector.injector.get(EncrDecrService);
    this.CommonService = BaseServiceInjector.injector.get(CommonServiceService);
  }
}
