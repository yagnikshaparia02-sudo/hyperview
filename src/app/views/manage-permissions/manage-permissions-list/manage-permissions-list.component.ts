import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { first } from "rxjs/operators";
import { CONFIG } from "src/app/config/app-config";
import { BaseComponent } from "src/app/_components/base.component";
import { RolePermissionService } from "src/app/_services/role-permission.service";
import { IListing } from "src/app/_types/common";
import { IManagePermissionList } from "src/app/_types/role-permission";
import { DeletePopupboxComponent } from "../../common/delete-popupbox/delete-popupbox.component";

@Component({
  selector: "app-manage-permissions-list",
  templateUrl: "./manage-permissions-list.component.html",
  styleUrls: ["./manage-permissions-list.component.scss"],
})
export class ManagePermissionsListComponent
  extends BaseComponent
  implements OnInit
{
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  listData = [];
  displayedColumns: string[] = ["select", "action", "displayName", "name"];
  selection = new SelectionModel(true, []);
  loading: boolean = true;
  isFilterOpen: boolean = true;
  actionsDeleteStatus = "";

  filter = {
    Name: "",
    DisplayName: "",
  };
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public RolePermissionService: RolePermissionService,
    public dialog: MatDialog
  ) {
    super();
    const permission = this.checkPermissions([
      "userPermissions.edit",
      "userPermissions.delete",
    ]);
    if (!permission) {
      this.displayedColumns.splice(1, 1);
    }
  }

  ngOnInit(): void {
    this.sortParam = "DisplayName";
    this.getAllListPermissionWithFilter();
    this.actionList = [
      { name: "Action", value: this.ActionListName.action },
      { name: "Delete", value: this.ActionListName.delete },
    ];
  }
  public listingRequestParam() {
    return {
      Name: this.filter.Name,
      DisplayName: this.filter.DisplayName,
      Page: this.pageNumber,
      Size: this.pageSize,
      SortColumn: this.sortParam,
      SortType: this.sortOrder,
    } as IManagePermissionList;
  }

  getAllListPermissionWithFilter() {
    this.RolePermissionService.getAllListPermissionWithFilter(
      this.listingRequestParam()
    )
      .pipe(first())
      .subscribe(
        (result: IListing) => {
          if (result.success) {
            this.dataSource = new MatTableDataSource(result.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.listData = result.data;
            this.totalRecords = result.data.length;
            this.sortParam = result.paging.sortColumn;
            this.sortOrder = result.paging.sortType;
          }
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  /**
   * Client side pagination
   * @param event
   */
  async pageChanged(event) {
    this.pageSize = event.pageSize;
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
    const filterValue = this.filter.DisplayName;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * API call and refresh datatable value
   * @param goFirstPage set first page when param value true
   */
  rerender(goFirstPage): void {
    if (goFirstPage) {
      this.pageNumber = 0;
    }
    this.selection = new SelectionModel(true, []);
    this.getAllListPermissionWithFilter();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.listData?.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.listData);
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
      Name: "",
      DisplayName: "",
    };
    this.applyFilter();
  }

  /**
   * Perform Action Button Click
   */
  async performAction() {
    let componentName: any = DeletePopupboxComponent;
    let url = CONFIG.deleteAdminPermissionURL;
    if (this.actionsDeleteStatus === this.ActionListName.action) {
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
      this.getAllListPermissionWithFilter();
    });
  }

  singleDelete(id) {
    let componentName: any = DeletePopupboxComponent;
    let url = CONFIG.deleteAdminPermissionURL;
    const ids = [id];

    const dialogRef = this.dialog.open(componentName, {
      data: { apiEndPoint: url, id: ids },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.selection = new SelectionModel(true, []);
      this.actionsDeleteStatus = "";
      this.getAllListPermissionWithFilter();
    });
  }
}
