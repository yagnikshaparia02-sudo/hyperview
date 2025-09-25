export interface IListing {
  clearForm: boolean;
  data: any[];
  error: any;
  id: string;
  isRedirect: boolean;
  message: string;
  messageType: string | number;
  paging: IPaging;
  redirect: string | null;
  success: boolean;
}

interface IPaging {
  lastPage: string | number;
  page: string | number;
  sortColumn: string;
  sortType: string;
  total: string | number;
}

export interface IListingRequest {
  Page: string | null | number;
  Size: string | null | number;
  SortColumn: string | null;
  SortType: string | null;
}
