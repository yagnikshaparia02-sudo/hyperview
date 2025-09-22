import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";
import { BaseComponent } from "src/app/_components/base.component";
import { ManageUserService } from "src/app/_services/manage-user.service";
import { ICreateAdminUser } from "src/app/_types/manage-user";

@Component({
  selector: "app-manage-user-add-edit",
  templateUrl: "./manage-user-add-edit.component.html",
  styleUrls: ["./manage-user-add-edit.component.scss"],
})
export class ManageUserAddEditComponent
  extends BaseComponent
  implements OnInit
{
  constructor(
    public ManageUserService: ManageUserService,
    private route: ActivatedRoute
  ) {
    super();
  }

  roleList: any[] = [];

  model: ICreateAdminUser = {
    Firstname: "",
    Lastname: "",
    EmailAddress: "",
    Username: "",
    Company: "",
    Address1: "",
    Address2: "",
    City: "",
    Country: "",
    PhoneNumber: "",
    LinnworksId: "",
    LinnworksApplicationToken: "",
    LinnworksUserToken: "",
    LinnworksServerUrl: "",
    StripCustomerId: "",
    ForgotPasswordToken: "",
    Password: "",
    isActive: this.statusEnum.active,
    roles: [],
  };
  submitted: boolean = false;
  hidePassword: boolean = true;
  editId = null;

  async ngOnInit() {
    // get id from url
    this.route.params.subscribe((params) => {
      this.editId = params["id"];
    });
    await this.getAllAdminRoleList();
    if (this.editId) {
      this.initForm();
    }
  }

  /**
   * Get All Admin Roles
   */
  async getAllAdminRoleList() {
    this.CommonService.getAllRoleList()
      .pipe(first())
      .subscribe(
        (result) => {
          this.roleList = result.data;
        },
        (error) => {
          return true;
        }
      );
    return true;
  }

  /**
   * Edit Mode then Get Details and binding
   */
  public initForm() {
    this.loader.showLoader();
    this.ManageUserService.getAdminUserById(this.editId)
      .pipe(first())
      .subscribe(
        (result) => {
          this.loader.hideLoader();
          if (result.success) {
            console.log(result.data);
            this.model = {
              Firstname: result.data.firstname,
              Lastname: result.data.lastname,
              EmailAddress: result.data.emailAddress,
              Username: result.data.username,
              Company: result.data.company,
              Address1: result.data.address1,
              Address2: result.data.address2,
              City: result.data.city,
              Country: result.data.country,
              PhoneNumber: result.data.phoneNumber,
              LinnworksId: result.data.linnworksId,
              LinnworksApplicationToken: result.data.linnworksApplicationToken,
              LinnworksUserToken: result.data.linnworksUserToken,
              LinnworksServerUrl: result.data.linnworksServerUrl,
              StripCustomerId: result.data.stripCustomerId,
              ForgotPasswordToken: result.data.forgotPasswordToken,
              Password: "",
              isActive: result.data.isActive
                ? this.statusEnum.active
                : this.statusEnum.inactive,
              roles: result.data.roles.map((role) => role.toString()),
            };
          }
        },
        (error) => {
          this.loader.hideLoader();
        }
      );
  }

  /**
   * On Submit Button Click
   * @param data formData
   */
  public onSubmitForm(form: NgForm) {
    this.submitted = true;
    if (form.invalid) {
      return;
    }
    const formData = {
      Firstname: this.model.Firstname,
      Lastname: this.model.Lastname,
      EmailAddress: this.model.EmailAddress,
      Username: this.model.Username,
      Company: this.model.Company,
      Address1: this.model.Address1,
      Address2: this.model.Address2,
      City: this.model.City,
      Country: this.model.Country,
      PhoneNumber: this.model.PhoneNumber,
      LinnworksId: this.model.LinnworksId,
      LinnworksApplicationToken: this.model.LinnworksApplicationToken,
      LinnworksUserToken: this.model.LinnworksUserToken,
      LinnworksServerUrl: this.model.LinnworksServerUrl,
      StripCustomerId: this.model.StripCustomerId,
      ForgotPasswordToken: this.model.ForgotPasswordToken,
      Password: this.model.Password,
      isActive: this.model.isActive === this.statusEnum.active ? true : false,
      roles: this.model.roles,
      userId: this.editId,
    };
    if (this.editId) {
      this.editAdminUser(formData);
    } else {
      delete formData.userId;
      this.createAdminUser(formData);
    }
  }

  /**
   * Create Api Call
   * @param formData
   */
  public createAdminUser(formData) {
    this.loader.showLoader();
    this.ManageUserService.createNewAdminUser(formData)
      .pipe(first())
      .subscribe(
        (result) => {
          this.loader.hideLoader();
          if (result.success) {
            this.submitted = false;
            this.toastr.success(result.message);
            this.router.navigate(["/manage-user"]);
          } else {
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

  /**
   * Edit Api  Call
   * @param formData
   */
  public editAdminUser(formData) {
    this.loader.showLoader();
    this.ManageUserService.editAdminUser(formData)
      .pipe(first())
      .subscribe(
        (result) => {
          this.loader.hideLoader();
          if (result.success) {
            this.submitted = false;
            this.toastr.success(result.message);
            this.router.navigate(["/manage-user"]);
          } else {
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
