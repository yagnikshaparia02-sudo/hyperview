import { IListingRequest } from "./common";

export interface ICreateQuery {
  userId: string;
  firstname: string;
  lastname: string;
  company: string;
  emailAddress: string;
  userWiseEmails: [];
}
