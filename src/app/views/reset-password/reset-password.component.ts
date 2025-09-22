import { Component, OnInit } from "@angular/core";
import { FormGroup, NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { first } from "rxjs/operators";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { BaseComponent } from "../../_components/base.component";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
})
export class ResetPasswordComponent extends BaseComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token = "";
  model: any = {};
  isDisplayForm: Boolean = true;
  showPass = false;
  showConfPass = false;
  isLoading = false;
  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {
    super();
    this.translate.use("en");
    this.route.params.subscribe((params) => {
      this.token = params["id"];
    });
  }

  ngOnInit() {
    this.model.conf_pass_match = "";
    this.validateResetPass();
  }

  validateResetPass() {
    this.authenticationService
      .validateResetPass(this.token)
      .pipe(first())
      .subscribe(
        async (result: any) => {
          if (result) {
          } else {
            this.errorHandler(
              this.toastr,
              this.translateService,
              result.errors,
              () => {}
            );
          }
        },
        (error: any) => {
          this.errorHandler(this.toastr, this.translateService, error);
        }
      );
  }

  onSubmit(frm: NgForm) {
    // stop here if form is invalid
    if (frm.invalid) {
      return;
    }
    this.isLoading = true;
    this.authenticationService
      .resetPass(
        this.token,
        this.model.password,
        this.model.cpassword,
        this.model.email
      )
      .pipe(first())
      .subscribe(
        (data) => {
          this.isLoading = false;
          if (data.success) {
            this.router.navigate(["login"]);
            this.toastr.success(data.message);
            frm.resetForm();
          } else {
            this.errorHandler(
              this.toastr,
              this.translateService,
              data.errors,
              () => {}
            );
          }
        },
        (error) => {
          this.errorHandler(
            this.toastr,
            this.translateService,
            error.errors,
            () => {}
          );
        }
      );
  }
}
