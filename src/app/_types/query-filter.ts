import { IListingRequest } from './common';

export interface ICreateQueryFilter {
  name: string;
  queryParameterName: string;
  type: string;
  defaultValue:string | boolean,
  defaultValueForBoolean: boolean,
  isActive: string | boolean;
  queryText: string;
}

export interface IManageQueryFilterList extends IListingRequest {
  Name: string | null;
  QueryParameterName: string | null;
  Type: string | null;
  IsActive: boolean | null;
  QueryText: string | null;
  FromCreatedAt: string | null;
  ToCreatedAt: string | null;
  FromUpdatedAt: string | null;
  ToUpdatedAt: string | null;
}
