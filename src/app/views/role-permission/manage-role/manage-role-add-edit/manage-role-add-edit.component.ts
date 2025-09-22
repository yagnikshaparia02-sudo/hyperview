import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { first } from "rxjs/operators";
import { BaseComponent } from "src/app/_components/base.component";
import { RolePermissionService } from "src/app/_services/role-permission.service";
import { IRoleCreate } from "src/app/_types/role-permission";
import { ManagePermissionComponent } from "../../manage-permission/manage-permission.component";

interface IDialogRolePermissionPopup {
  editId: string;
}

@Component({
  selector: "app-manage-role-add-edit",
  templateUrl: "./manage-role-add-edit.component.html",
  styleUrls: ["./manage-role-add-edit.component.scss"],
})
export class ManageRoleAddEditComponent
  extends BaseComponent
  implements OnInit {
  @ViewChild(ManagePermissionComponent) mp: ManagePermissionComponent;
  submitted: boolean = false;
  model: IRoleCreate = {
    name: "",
    permissions: [],
  };

  modelDdl = {
    roleId: "",
  };
  selectedRoleId: string = "";


  roleList = [];

  isLoading = false;
  constructor(
    public dialogRef: MatDialogRef<ManageRoleAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogRolePermissionPopup,
    public rolePermissionService: RolePermissionService
  ) {
    super();
  }
  ngOnInit() {
    this.dialogRef.updateSize("50%");
    this.getAllRoleList();
  }

  getAllRoleList() {
    this.rolePermissionService.getAllRoleListDrp()
      .pipe(first())
      .subscribe(
        (result) => {
          if (result.success) {
            this.roleList = result.data;
          }
        },
        (error) => { }
      );
  }

  selectedPermissions(data) {
    this.model.permissions = data;
  }

  onSubmitForm(form: NgForm) {
    this.submitted = true;
    if (form.invalid) {
      return;
    }
    if (this.model.permissions.length <= 0) {
      this.toastr.error("Please select at least one permission");
      return;
    }
    this.isLoading = true;
    const formData = {
      name: this.model.name,
      permissions: this.model.permissions,
      id: this.data.editId,
    };
    if (this.data.editId) {
      this.updateRoleDetails(formData);
    } else {
      delete formData.id;
      this.createRoleDetails(formData);
    }
  }

  createRoleDetails(formData) {
    this.rolePermissionService
      .createRoleDetails(formData)
      .pipe(first())
      .subscribe(
        (result) => {
          this.isLoading = false;
          if (result.success) {
            this.submitted = false;
            this.toastr.success(result.message);
            this.dialogRef.close(true);
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
          this.isLoading = false;
          this.toastr.error(error.message);
        }
      );
  }

  updateRoleDetails(formData) {
    this.rolePermissionService
      .updateRoleDetails(formData)
      .pipe(first())
      .subscribe(
        (result) => {
          this.loader.hideLoader();
          if (result.success) {
            this.submitted = false;
            this.toastr.success(result.message);
            this.dialogRef.close(true);
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

  async selectRoleChange1(id) {

    this.selectedRoleId = id;

    if (id === '') {
      this.mp.getAllRolePermissionList();
      return;
    }
    await this.mp.selectRoleChange(id);
    setTimeout(() => {
      this.model.permissions = this.mp.permissionListIds;
      console.log(this.model.permissions);
    }, 3000);

  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
