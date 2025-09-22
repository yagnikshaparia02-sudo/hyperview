import { IListingRequest } from './common';

export interface ICreateQuery {
  name: string;
  isActive: string | boolean;
  isFree: string | boolean;
  queryText: string;
  queryFilterId: string[];
}

export interface IManageQueryList extends IListingRequest {
  Name: string | null;
  IsFree: boolean | null;
  IsActive: boolean | null;
  FromCreatedAt: string | null;
  ToCreatedAt: string | null;
  FromUpdatedAt: string | null;
  ToUpdatedAt: string | null;
}
