import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { first } from "rxjs/operators";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { CONFIGCONSTANTS } from "./../../config/app-constants";
import { isEmptyData } from "./../../utils/common";
import { BaseComponent } from "./../../_components/base.component";
import { AppForgotPassword } from "./forgot-password.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent extends BaseComponent implements OnInit, OnDestroy {
  // KeenThemes mock, change it to:
  defaultAuth: any = {
    email: "",
    password: "",
  };
  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading: boolean = false;
  siteLogo = CONFIGCONSTANTS.siteLogo;
  submitted = false;
  token: string;
  // private fields
  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {
    super();
    this.translate.use("en");
    // redirect to home if already logged in
    // if (this.authService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams["returnUrl".toString()] || "/";
    if (!isEmptyData(this.returnUrl) && this.returnUrl != "/") {
      let tokenRegex = /token=([^&]*)/;
      let tokenMatch = this.returnUrl.match(tokenRegex);
      if (tokenMatch && tokenMatch.length > 1) {
        this.token = tokenMatch[1];
      }
    } else {
      this.token = this.route.snapshot.queryParams["token".toString()];
    }
    if (!isEmptyData(this.token)) {
      this.loginbytoken(this.token);
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [
        this.defaultAuth.email,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      password: [
        this.defaultAuth.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  submit() {
    this.hasError = false;
    this.isLoading = true;
    this.submitted = true;
    this.authService
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe((user) => {
        this.isLoading = false;
        this.submitted = false;
        if (user.success) {
          this.toastr.success("You have successfully login");
          if (isEmptyData(this.returnUrl) || this.returnUrl === "/") {
            this.router.navigate(["/dashboard"]);
          } else {
            this.router.navigate([this.returnUrl]);
          }
        } else {
          this.hasError = true;
          this.toastr.error(user.message);
        }
      });
  }

  loginbytoken(token) {
    this.hasError = false;
    this.isLoading = true;
    this.submitted = true;
    this.authService
      .loginbytoken(token)
      .pipe(first())
      .subscribe(
        (user) => {
          this.isLoading = false;
          this.submitted = false;
          if (user.success) {
            this.toastr.success("You have successfully login");
            if (isEmptyData(this.returnUrl) || this.returnUrl === "/") {
              if (!isEmptyData(this.token)) {
                localStorage.setItem("logintoken", this.token);
                this.router.navigate(["/dashboard"]);
              } else {
                this.router.navigate([this.returnUrl]);
              }
            } else {
              localStorage.setItem("logintoken", this.token);
              this.router.navigateByUrl(this.returnUrl);
            }
          } else {
            this.hasError = true;
            this.isLoading = false;
            this.toastr.error(user.message);
          }
        },
        (error) => {
          this.loader.hideLoader();
          this.toastr.error("Invalid token");
        }
      );
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  openDialogForgotPass() {
    const dialogRef = this.dialog.open(AppForgotPassword, {
      data: {},
    });
  }
}
