import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { first } from "rxjs/operators";
import { BaseComponent } from "src/app/_components/base.component";
import { AuthenticationService } from "src/app/_services/authentication.service";
import Validator from "src/app/_validators/common.validator";

interface DialogData {
  ListData: any[];
}

@Component({
  selector: "app-forgot-password",
  template: `
    <div class="forgot-dialog">
      <div class="flex-box" mat-dialog-title>
        <h3 class="text text-primary">Forgot Password</h3>
        <div>
          <i class="fa fa-times" (click)="closeDialog()" aria-hidden="true"></i>
        </div>
      </div>
      <form [formGroup]="forgotPassWordForm" (ngSubmit)="forgotPassword()">
        <mat-dialog-content>
          <div
            [ngClass]="{
              'form-group m-form__group': true,
              'has-danger':
                !forgotPassWordForm.get('forgotPassemail').valid &&
                forgotPassWordForm.get('forgotPassemail').touched
            }"
          >
            <input
              formControlName="forgotPassemail"
              type="text"
              class="form-control"
              id="forgotPassemail"
              placeholder="Email"
            />
            <div
              *ngIf="
                forgotPassWordForm.get('forgotPassemail').errors &&
                (forgotPassWordForm.get('forgotPassemail').dirty ||
                  forgotPassWordForm.get('forgotPassemail').touched)
              "
              class="text-danger"
            >
              <div
                *ngIf="
                  forgotPassWordForm.get('forgotPassemail').errors.required
                "
              >
                Please enter email
              </div>
              <div
                *ngIf="
                  !forgotPassWordForm.get('forgotPassemail').errors.required &&
                  forgotPassWordForm.get('forgotPassemail').errors?.pattern
                "
              >
                Please enter valid email
              </div>
            </div>
          </div>
        </mat-dialog-content>
        <div mat-dialog-actions class="pull-right">
          <button
            type="submit"
            [disabled]="isLoading"
            class="btn btn-primary btn-sm mx-2 pull-right"
          >
            <ng-container *ngIf="isLoading">
              <span class="indicator-progress" [style.display]="'block'">
                {{ 'Please wait }}
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </ng-container>
            <ng-container *ngIf="!isLoading">
              <span class="indicator-label">Yes</span>
            </ng-container>
          </button>
          <button
            type="button"
            class="btn btn-warning btn-sm mx-2 pull-right"
            (click)="closeDialog()"
          >
            No
          </button>
        </div>
      </form>
    </div>
  `,
  styleUrls: [],
})
export class AppForgotPassword extends BaseComponent implements OnInit {
  forgotPassWordForm: FormGroup;
  submitted = false;
  isLoading = false;
  model = {
    email: "",
  };
  constructor(
    public dialogRef: MatDialogRef<AppForgotPassword>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private authService: AuthenticationService
  ) {
    super();
  }
  ngOnInit() {
    this.dialogRef.updateSize("40%");
    this.forgotPassWordForm = new FormGroup({
      forgotPassemail: new FormControl(null, [
        Validators.required,
        Validator.emailValidator,
      ]),
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  forgotPassword() {
    if (this.forgotPassWordForm.invalid) {
      return;
    }
    this.isLoading = true;
    const forgotPassemail = this.forgotPassWordForm.value.forgotPassemail;
    this.authService
      .forgotPassword({ email: forgotPassemail })
      .pipe(first())
      .subscribe(
        (data) => {
          if (data.success) {
            this.isLoading = false;
            this.toastr.success(data.message);
            this.dialogRef.close();
          } else {
            this.errorHandler(
              this.toastr,
              this.translateService,
              data.errors,
              () => {
                this.submitted = false;
              }
            );
          }
        },
        (error) => {
          this.isLoading = false;
        }
      );
  }
}
