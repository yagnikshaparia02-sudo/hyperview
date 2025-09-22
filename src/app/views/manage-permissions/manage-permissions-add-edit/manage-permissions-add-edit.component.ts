import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";
import { BaseComponent } from "src/app/_components/base.component";
import { RolePermissionService } from "src/app/_services/role-permission.service";
import { IListing } from "src/app/_types/common";
import { ICreatePermission } from "src/app/_types/role-permission";

@Component({
  selector: "app-manage-permissions-add-edit",
  templateUrl: "./manage-permissions-add-edit.component.html",
  styleUrls: ["./manage-permissions-add-edit.component.scss"],
})
export class ManagePermissionsAddEditComponent
  extends BaseComponent
  implements OnInit
{
  constructor(
    private route: ActivatedRoute,
    public RolePermissionService: RolePermissionService
  ) {
    super();
  }

  permissionList: any[] = [];

  model: ICreatePermission = {
    id: "",
    name: "",
    displayName: "",
    left: "",
    right: "",
    depth: "",
    isParentSelected: false,
    parentId: "",
    children: [],
  };
  submitted: boolean = false;
  hidePassword: boolean = true;
  editId = null;

  async ngOnInit() {
    // get id from url
    this.route.params.subscribe((params) => {
      this.editId = params["id"];
    });
    await this.getAllPermissionList();
    if (this.editId) {
      this.initForm();
    }
  }

  async getAllPermissionList() {
    this.RolePermissionService.getAllPermissionList()
      .pipe(first())
      .subscribe(
        async (result: IListing) => {
          if (result.success) {
            this.permissionList = result.data;
          }
        },
        (error) => {}
      );
  }

  initForm() {
    this.loader.showLoader();
    this.RolePermissionService.getAdminPermissionById(this.editId)
      .pipe(first())
      .subscribe(
        (result) => {
          this.loader.hideLoader();
          if (result.success) {
            const data = result.data;
            this.model = {
              id: data.id,
              name: data.name,
              displayName: data.displayName,
              left: data.left,
              right: data.right,
              depth: data.depth,
              isParentSelected: data.isParentSelected,
              parentId: data.parentId,
              children: [],
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
      id: this.model.id,
      name: this.model.name,
      displayName: this.model.displayName,
      left: this.isEmpty(this.model.left) ? 0 : this.model.left,
      right: this.isEmpty(this.model.right) ? 0 : this.model.right,
      depth: this.isEmpty(this.model.depth) ? 0 : this.model.depth,
      isParentSelected: this.model.isParentSelected,
      parentId: this.model.parentId == "" ? null : this.model.parentId,
      children: [],
    };
    if (this.editId) {
      this.editAdminPermissions(formData);
    } else {
      delete formData.id;
      this.createAdminPermissions(formData);
    }
  }

  /**
   * Create Api Call
   * @param formData
   */
  public createAdminPermissions(formData) {
    this.loader.showLoader();
    this.RolePermissionService.createAdminPermissions(formData)
      .pipe(first())
      .subscribe(
        (result) => {
          this.loader.hideLoader();
          if (result.success) {
            this.submitted = false;
            this.toastr.success(result.message);
            this.router.navigate(["/manage-permissions"]);
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

  /**
   * Edit Api  Call
   * @param formData
   */
  public editAdminPermissions(formData) {
    this.loader.showLoader();
    this.RolePermissionService.editAdminPermissions(formData)
      .pipe(first())
      .subscribe(
        (result) => {
          this.loader.hideLoader();
          if (result.success) {
            this.submitted = false;
            this.toastr.success(result.message);
            this.router.navigate(["/manage-permissions"]);
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
