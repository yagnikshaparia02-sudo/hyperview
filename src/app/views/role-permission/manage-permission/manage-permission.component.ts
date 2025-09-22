import { SelectionModel } from "@angular/cdk/collections";
import { FlatTreeControl } from "@angular/cdk/tree";
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from "@angular/material/tree";
import { first } from "rxjs/operators";
import { CONFIGCONSTANTS } from "src/app/config/app-constants";
import { BaseComponent } from "src/app/_components/base.component";
import { RolePermissionService } from "src/app/_services/role-permission.service";
import { IListing } from "src/app/_types/common";

export class IPermissionItemNode {
  children: IPermissionItemNode[];
  id: string;
  displayName: string;
  parentId: string;
  name: string;
  depth: string;
}

export class IPermissionItemFlatNode {
  id: string;
  displayName: string;
  parentId: string;
  depth: number;
  name: string;
  expandable: boolean;
}

@Component({
  selector: "app-manage-permission",
  templateUrl: "./manage-permission.component.html",
  styleUrls: ["./manage-permission.component.scss"],
})
export class ManagePermissionComponent extends BaseComponent implements OnInit {
  permissionList = [];
  permissionListIds;  
  roleList = [];
  model = {
    roleId: "",
  };
  disableSaveButton = false;
  @Input() commingFromRole = false;
  @Output() selectPermission = new EventEmitter();
  loading: boolean = false;
  @Output() refreshRole = new EventEmitter();
  @Input() reloadPermission = false;

  // Tree Related Details - Start
  dataSource: MatTreeFlatDataSource<any, any>;
  nestedNodeMap = new Map<IPermissionItemNode, IPermissionItemFlatNode>();
  flatNodeMap = new Map<any, any>();
  treeFlattener: MatTreeFlattener<IPermissionItemNode, IPermissionItemFlatNode>;
  getLevel = (node: IPermissionItemFlatNode) => {
    return node.depth;
  };
  isExpandable = (node: IPermissionItemFlatNode) => {
    return node.expandable;
  };
  getChildren = (node: IPermissionItemNode): IPermissionItemNode[] =>
    node.children;
  hasChild = (_: number, _nodeData: IPermissionItemFlatNode) =>
    _nodeData.expandable;
  treeControl: FlatTreeControl<IPermissionItemFlatNode>;
  checklistSelection = new SelectionModel<IPermissionItemFlatNode>(
    true /* multiple */
  );
  // Tree Related Details - End

  constructor(private RolePermissionservice: RolePermissionService) {
    super();
    // Tree Related Details - Start
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<IPermissionItemFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    // Tree Related Details - End
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.reloadPermission.currentValue) {
      this.rerender();
    }
  }

  rerender() {
    this.getAllRoleList();
    this.getAllRolePermissionList();
    this.model.roleId = "";
  }

  async ngOnInit() {
    this.getAllRoleList();
    this.getAllRolePermissionList();
    this.refreshRole.emit();
  }

  getAllRoleList() {
    this.RolePermissionservice.getAllRoleListDrp()
      .pipe(first())
      .subscribe(
        (result) => {
          if (result.success) {
            this.roleList = result.data;
          }
        },
        (error) => {}
      );
  }

  refreshData() {
    this.getAllRoleList();
    this.getAllRolePermissionList();
  }

  async selectRoleChange(id) {
    if (this.isEmpty(id)) {
      this.disableSaveButton = true;
      return;
    }
    this.loading = true;
    this.RolePermissionservice.getAllRoleWisePermissionList(id)
      .pipe(first())
      .subscribe(async (result) => {
        this.loading = false;
        if (result.success) {
          this.checklistSelection = new SelectionModel<IPermissionItemFlatNode>(
            true /* multiple */
          );
          const selectedNodes = [];
          this.permissionListIds = result.data.permissionIds;
          if (result.data.permissionIds.length > 0) {
            result.data.permissionIds.forEach((ele) => {
              const index = this.treeControl.dataNodes.findIndex(
                (resp) => resp.id === ele
              );
              if (index !== -1) {
                selectedNodes.push(this.treeControl.dataNodes[index]);
              }
            });
          }
          await selectedNodes.map(async (ele) => {
            if (!this.checklistSelection.isSelected(ele)) {
              this.checklistSelection.toggle(ele);
            }
            // else {
            //   this.checklistSelection.toggle(ele);
            // }
            await this.treeControl.expand(ele);
          });
        }
      });
  }

  getAllRolePermissionList() {
    // this.loading = true
    this.RolePermissionservice.getAllPermissionList()
      .pipe(first())
      .subscribe(
        async (result: IListing) => {
          this.loading = false;
            if (result.success) {
            this.permissionList = await this.listToTree(result.data);
            this.totalRecords = result.paging.total;
            this.sortParam = result.paging.sortColumn;
            this.sortOrder = result.paging.sortType;

            this.dataSource = new MatTreeFlatDataSource(
              this.treeControl,
              this.treeFlattener
            );
            this.dataSource.data = this.permissionList;
          }
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  async submitBtnClick() {
    if (this.model.roleId) {
      this.loading = true;
      const index = this.roleList.findIndex(
        (ele) => ele.id === this.model.roleId
      );
      const tempPermissionIds = [];
      const data = await this.checklistSelection.selected.map((ele) => {
        tempPermissionIds.push(ele.id);
      });
      const formData = {
        id: this.model.roleId,
        name: index !== -1 ? this.roleList[index].name : null,
        allPermissions: await this.listToTree(this.checklistSelection.selected),
        permissionIds: tempPermissionIds,
      };
      this.updateRoleWisePermission(formData);
    } else {
      this.toastr.warning("Please select appropriate role.");
      return true;
    }
  }

  updateRoleWisePermission(formData) {
    this.loading = true;
    this.RolePermissionservice.updateRoleWisePermission(formData)
      .pipe(first())
      .subscribe((result) => {
        this.loading = false;
        if (result.success) {
          this.toastr.success(result.message);
          this.refreshRole.emit();
        } else {
          this.errorHandler(
            this.toastr,
            this.translateService,
            result.errors,
            () => {}
          );
        }
      });
  }

  /**
   * Tree Related Things - Start
   */
  // Transformer to convert nested node to flat node. Record the nodes in maps for later use.
  transformer = (node: IPermissionItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.id === node.id
        ? existingNode
        : new IPermissionItemFlatNode();
    flatNode.id = node.id;
    flatNode.displayName = node.displayName;
    flatNode.parentId = node.parentId;
    flatNode.depth = level;
    flatNode.name = node.name;
    flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  todoLeafItemSelectionToggle(node: IPermissionItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  async checkAllParentsSelection(
    node: IPermissionItemFlatNode,
    dataBinding = false
  ) {
    let parent: IPermissionItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent, dataBinding);
      parent = this.getParentNode(parent);
    }
    return true;
  }

  /* Get the parent node of a node */
  getParentNode(node: IPermissionItemFlatNode): IPermissionItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  async todoItemSelectionToggle(
    node: IPermissionItemFlatNode,
    dataBinding = false
  ) {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    if (dataBinding) {
      await this.checklistSelection.select(...descendants);
    } else {
      this.checklistSelection.isSelected(node)
        ? this.checklistSelection.select(...descendants)
        : this.checklistSelection.deselect(...descendants);
    }

    // Force update for the parent
    descendants.forEach(
      async (child) => await this.checklistSelection.isSelected(child)
    );
    this.checkAllParentsSelection(node, dataBinding);
    if (this.commingFromRole) {
      const tempPermissionIds = [];
      this.checklistSelection.selected.map(async (ele) => {
        await tempPermissionIds.push(ele.id);
      });
      this.selectPermission.emit(tempPermissionIds);
    }
    return true;
  }

  /** Check root node checked state and change it accordingly */
  async checkRootNodeSelection(
    node: IPermissionItemFlatNode,
    dataBinding = false
  ) {
    const nodeSelected = await this.checklistSelection.isSelected(node);
    const descendants = await this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(async (child) => {
        return await this.checklistSelection.isSelected(child);
      });
    if (!dataBinding) {
      if (nodeSelected && !descAllSelected) {
        await this.checklistSelection.deselect(node);
      } else if (!nodeSelected && descAllSelected) {
        await this.checklistSelection.select(node);
      }
    }
    if (this.commingFromRole) {
      const tempPermissionIds = [];
      this.checklistSelection.selected.map(async (ele) => {
        await tempPermissionIds.push(ele.id);
      });
      this.selectPermission.emit(tempPermissionIds);
    }
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: IPermissionItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some((child) =>
      this.checklistSelection.isSelected(child)
    );
    return result && !this.descendantsAllSelected(node);
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: IPermissionItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every((child) => {
        return this.checklistSelection.isSelected(child);
      });
    return descAllSelected;
  }

  /**
   * Our Custom Logic for making required format to data
   */
  async listToTree(list: any) {
    let map = {};
    let node = null;
    let roots = [];
    let i = 0;
    let removeUnUsedNode = [];

    for (i = 0; i < list.length; i += 1) {
      map[list[i].id] = i; // initialize the map
      list[i].children = []; // initialize the children
    }

    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parentId !== "0") {
        // if you have dangling branches check that map[node.parentId] exists
        if (list[map[node.parentId]]) {
          list[map[node.parentId]].children.push(node);
        }
      } else {
        roots.push(node);
      }
    }

    // Remove Un Used Nodes
    list.forEach((element) => {
      if (element.parentId !== CONFIGCONSTANTS.permissionParentId) {
        removeUnUsedNode.push(element);
      }
    });
    removeUnUsedNode.forEach((ele) => {
      const index = list.findIndex((le) => le.id === ele.id);
      if (index !== -1) {
        list.splice(index, 1);
      }
    });
    return list;
  }
  /**
   * Tree Related Things - End
   */
}
