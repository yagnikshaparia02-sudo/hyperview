import { IListingRequest } from "./common";

export interface ICreateAdminUser {
  Firstname: string;
  Lastname: string;
  EmailAddress: string;
  Username: string;
  Company: string;
  Address1: string;
  Address2: string;
  City: string;
  Country: string;
  PhoneNumber: string;
  LinnworksId: string;
  LinnworksApplicationToken: string;
  LinnworksUserToken: string;
  LinnworksServerUrl: string;
  StripCustomerId: string;
  ForgotPasswordToken: string;
  Password: string;
  isActive: string | boolean;
  roles: string[];
}

export interface IManageAdminUserList extends IListingRequest {
  Firstname: string | null;
  Lastname: string | null;
  EmailAddress: string | null;
  Company: string | null;
  RoleName: string | null;
  IsActive: boolean | null;
  FromLastLoginAt: string | null;
  ToLastLoginAt: string | null;
  FromCreatedAt: string | null;
  ToCreatedAt: string | null;
  FromUpdatedAt: string | null;
  ToUpdatedAt: string | null;
}
