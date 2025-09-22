import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { first } from "rxjs/operators";
import { BaseComponent } from "src/app/_components/base.component";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { ManageUserService } from "src/app/_services/manage-user.service";
import { CommonRegx } from "../../_validators/common.validator";

@Component({
  templateUrl: "./profile.component.html",
})
export class ProfileComponent extends BaseComponent implements OnInit {
  showPass = false;
  showConfPass = false;
  showCurrPass = false;
  submitted = false;
  id: string = "";

  public CommonRegx = CommonRegx;
  model = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  constructor(
    public ManageUserService: ManageUserService,
    public authentcationService: AuthenticationService
  ) {
    super();
  }

  ngOnInit() {
    const userDetails = this.authentcationService.getLogginUserDetails();
    this.id = userDetails?.userId;
  }

  changePassword(form: NgForm) {
    this.submitted = true;
    if (form.invalid) {
      return;
    }
    const formData = {
      currentPassword: this.model.currentPassword,
      newPassword: this.model.newPassword,
      confirmPassword: this.model.confirmPassword,
      id: this.id,
    };
    this.loader.showLoader();
    this.ManageUserService.changePassword(formData)
      .pipe(first())
      .subscribe(
        (result) => {
          this.loader.hideLoader();
          if (result.success) {
            this.submitted = false;
            this.toastr.success(result.message);
            this.model = {
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            };
            this.router.navigate(["/dashboard"]);
          } else {
            this.toastr.error(result.message);
            this.errorHandler(
              this.toastr,
              this.translateService,
              result.errors,
              () => {
                this.submitted = false;
              }
            );
          }
        },
        (error) => {
          this.loader.hideLoader();
          this.toastr.error(error.message);
        }
      );
  }
}
