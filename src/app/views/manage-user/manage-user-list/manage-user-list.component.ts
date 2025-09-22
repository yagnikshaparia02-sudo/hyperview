import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Sort } from "@angular/material/sort";
import { first } from "rxjs/operators";
import { CONFIG } from "src/app/config/app-config";
import { isEmptyData } from "src/app/utils/common";
import { ManageUserService } from "src/app/_services/manage-user.service";
import { IListing } from "src/app/_types/common";
import { IManageAdminUserList } from "src/app/_types/manage-user";
import { DeletePopupboxComponent } from "../../common/delete-popupbox/delete-popupbox.component";
import { StatusPopupboxComponent } from "../../common/status-popupbox/status-popupbox.component";
import { BaseComponent } from "./../../../_components/base.component";

@Component({
  selector: "app-manage-user-list",
  templateUrl: "./manage-user-list.component.html",
  styleUrls: ["./manage-user-list.component.scss"],
})
export class ManageUserListComponent extends BaseComponent implements OnInit {
  dataSource = [];
  displayedColumns: string[] = [
    "select",
    "action",
    "firstname",
    "lastname",
    "email",
    "company",
    "role",
    "isActive",
    "lastLoginAt",
    "createdAt",
  ];
  selection = new SelectionModel(true, []);
  loading: boolean = true;
  isFilterOpen: boolean = true;
  roleList: any[] = [];
  actionsDeleteStatus = "";

  filter = {
    firstname: "",
    lastname: "",
    emailAddress: "",
    company: "",
    role: "",
    status: "",
    lastLoginDate: {
      from: "",
      to: "",
    },
    createdAtDate: {
      from: "",
      to: "",
    },
  };

  constructor(
    public manageUserService: ManageUserService,
    public dialog: MatDialog
  ) {
    super();
    const permission = this.checkPermissions(["users.edit", "users.delete"]);
    if (!permission) {
      this.displayedColumns.splice(1, 1);
    }
  }

  async ngOnInit() {
    await this.getAllAdminRoleList();
    this.getAllAdminUserList();
  }

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

  public listingRequestParam() {
    return {
      Firstname: this.filter.firstname,
      Lastname: this.filter.lastname,
      EmailAddress: this.filter.emailAddress,
      Company: this.filter.company,
      RoleName: this.filter.role,
      IsActive: !isEmptyData(this.filter.status)
        ? this.filter.status === this.statusEnum.active
          ? true
          : false
        : "",
      FromLastLoginAt: this.formatDate(this.filter.lastLoginDate.from),
      ToLastLoginAt: this.formatDate(this.filter.lastLoginDate.to),
      FromCreatedAt: this.formatDate(this.filter.createdAtDate.from),
      ToCreatedAt: this.formatDate(this.filter.createdAtDate.to),
      Page: this.pageNumber,
      Size: this.pageSize,
      SortColumn: this.sortParam,
      SortType: this.sortOrder,
    } as IManageAdminUserList;
  }

  public getAllAdminUserList() {
    this.loading = true;
    this.manageUserService
      .getAllAdminUserList(this.listingRequestParam())
      .pipe(first())
      .subscribe(
        (result: IListing) => {
          if (result.success) {
            this.dataSource = result.data;
            this.totalRecords = result.paging.total;
            this.sortParam = result.paging.sortColumn;
            this.sortOrder = result.paging.sortType;

            // Already Selected Item display check if page change
            const itemsToAdd = this.dataSource.filter((item) => {
              const foundItem = this.selection.selected.find(
                (selectedItem) => selectedItem.id === item.id
              );
              if (!foundItem) return;
              // removes item from selection
              this.selection.deselect(foundItem);
              return item;
            });
            itemsToAdd.map((ita) => {
              this.selection.select(ita);
            });
          }
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  /**
   * Server side pagination
   * @param event
   */
  async pageChanged(event) {
    this.pageSize = event.pageSize;
    this.currentPageNumber = event.pageIndex;
    this.pageNumber = await this.pageChangeLogic(event);
    this.rerender(false);
  }

  /**
   * Server side Sorting
   * @param event
   */
  sortData(event: Sort) {
    this.sortParam = event.active;
    this.sortOrder = event.direction;
    this.rerender(true);
  }

  /**
   * Change Limit to display records
   * @param value
   */
  public changeLimit(value) {
    this.rerender(true);
  }
  /**
   * Apply Filter Click button
   */
  applyFilter() {
    this.selection = new SelectionModel(true, []);
    this.rerender(true);
  }

  /**
   * API call and refresh datatable value
   * @param goFirstPage set first page when param value true
   */
  rerender(goFirstPage): void {
    if (goFirstPage) {
      this.pageNumber = 0;
    }
    // this.selection = new SelectionModel(true, []);
    this.getAllAdminUserList();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? "deselect" : "select"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.position + 1
    }`;
  }

  resetFilter() {
    this.filter = {
      firstname: "",
      lastname: "",
      emailAddress: "",
      company: "",
      role: "",
      status: "",
      lastLoginDate: {
        from: "",
        to: "",
      },
      createdAtDate: {
        from: "",
        to: "",
      },
    };
    this.rerender(true);
  }

  /**
   * Perform Action Button Click
   */
  async performAction() {
    let componentName: any = DeletePopupboxComponent;
    let url = CONFIG.deleteAdminUserURL;
    if (
      this.actionsDeleteStatus === this.ActionListName.activate ||
      this.actionsDeleteStatus === this.ActionListName.deactivate
    ) {
      componentName = StatusPopupboxComponent;
      if (this.actionsDeleteStatus === this.ActionListName.activate) {
        url = CONFIG.activeAdminUserURL;
      } else {
        url = CONFIG.inActiveAdminUserURL;
      }
    } else if (this.actionsDeleteStatus === this.ActionListName.action) {
      this.toastr.warning(this.staticMessages.PerformActionWarningMSG);
      return;
    }

    const ids = await this.getIdFromArray(this.selection.selected);

    const dialogRef = this.dialog.open(componentName, {
      data: { apiEndPoint: url, id: ids },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.selection = new SelectionModel(true, []);
      this.actionsDeleteStatus = "";
      this.rerender(true);
    });
  }

  public async getIdFromArray(data) {
    const tempIds = [];
    data.map((ele) => {
      tempIds.push(ele.userId);
    });
    return tempIds;
  }

  singleDelete(id) {
    let componentName: any = DeletePopupboxComponent;
    let url = CONFIG.deleteAdminUserURL;
    const ids = [id];

    const dialogRef = this.dialog.open(componentName, {
      data: { apiEndPoint: url, id: ids },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.selection = new SelectionModel(true, []);
      this.actionsDeleteStatus = "";
      this.rerender(true);
    });
  }
}
