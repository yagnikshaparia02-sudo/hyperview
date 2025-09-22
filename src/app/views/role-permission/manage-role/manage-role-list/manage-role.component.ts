import { SelectionModel } from "@angular/cdk/collections";
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Sort } from "@angular/material/sort";
import { first } from "rxjs/operators";
import { CONFIG } from "src/app/config/app-config";
import { DeletePopupboxComponent } from "src/app/views/common/delete-popupbox/delete-popupbox.component";
import { BaseComponent } from "src/app/_components/base.component";
import { RolePermissionService } from "src/app/_services/role-permission.service";
import { IListing } from "src/app/_types/common";
import { IManageRoleList } from "src/app/_types/role-permission";
import { ManageRoleAddEditComponent } from "../manage-role-add-edit/manage-role-add-edit.component";

@Component({
  selector: "app-manage-role",
  templateUrl: "./manage-role.component.html",
  styleUrls: ["./manage-role.component.scss"],
})
export class ManageRoleComponent extends BaseComponent implements OnInit {
  dataSource = [];
  displayedColumns: string[] = ["select", "actions", "name", "permissions"];
  selection = new SelectionModel(true, []);
  loading: boolean = true;
  isFilterOpen: boolean = true;
  roleList: any[] = [];
  actionsDeleteStatus = "";
  @Output() refreshPermission = new EventEmitter();
  @Input() reloadRole = false;

  filter = {
    name: "",
    createdAtDate: {
      from: "",
      to: "",
    },
  };

  constructor(
    public dialog: MatDialog,
    private rolePermissionService: RolePermissionService
  ) {
    super();
    const permission = this.checkPermissions(["userRoles.delete"]);
    if (!permission) {
      this.displayedColumns.splice(1, 1);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.reloadRole.currentValue) {
      this.rerender(true);
      this.refreshPermission.emit();
    }
  }

  ngOnInit() {
    this.sortParam = "name";
    this.getAllRoleList();
    this.actionList = [
      { name: "Action", value: this.ActionListName.action },
      { name: "Delete", value: this.ActionListName.delete },
    ];
  }

  public listingRequestParam() {
    return {
      Name: this.filter.name,
      FromCreatedAt: this.formatDate(this.filter.createdAtDate.from),
      ToCreatedAt: this.formatDate(this.filter.createdAtDate.to),
      Page: this.pageNumber,
      Size: this.pageSize,
      SortColumn: this.sortParam,
      SortType: this.sortOrder,
    } as IManageRoleList;
  }

  public getAllRoleList() {
    this.loading = true;
    this.rolePermissionService
      .getAllRoleList(this.listingRequestParam())
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
    this.getAllRoleList();
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
      name: "",
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
  async performAction(singleDeleteId = null) {
    let componentName: any = DeletePopupboxComponent;
    let url = CONFIG.deleteAdminRoleURL;
    if (this.actionsDeleteStatus === this.ActionListName.action) {
      this.toastr.warning(this.staticMessages.PerformActionWarningMSG);
      return;
    }
    let ids = [];
    if (singleDeleteId) {
      ids = [singleDeleteId];
    } else {
      ids = await this.getIdFromArray(this.selection.selected);
    }

    const dialogRef = this.dialog.open(componentName, {
      data: { apiEndPoint: url, id: ids },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.selection = new SelectionModel(true, []);
      this.actionsDeleteStatus = "";
      this.rerender(true);
    });
  }

  /**
   * Add New Role Popup
   */
  addNewRolePopup() {
    const ids = null;
    const dialogRef = this.dialog.open(ManageRoleAddEditComponent, {
      data: { editId: ids },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selection = new SelectionModel(true, []);
        this.actionsDeleteStatus = "";
        this.rerender(true);
        this.refreshPermission.emit();
      }
    });
  }
}
