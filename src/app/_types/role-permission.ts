import { IListingRequest } from './common';

export interface IManageRoleList extends IListingRequest {
  Name: string | null;
  FromCreatedAt: string | null;
  ToCreatedAt: string | null;
  FromUpdatedAt: string | null;
  ToUpdatedAt: string | null;
}

export interface IRoleCreate {
  name: string;
  permissions: string[];
}

export interface IManagePermissionList extends IListingRequest {
  Name: string;
  DisplayName: string;
}

export interface ICreatePermission {
  id: string | null;
  name: string;
  displayName: string;
  left: number | string;
  right: number | string;
  depth: number | string;
  isParentSelected: boolean;
  parentId: string | null;
  children: string[] | [];
}
