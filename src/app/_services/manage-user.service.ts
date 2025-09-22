import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { CONFIG } from "../config/app-config";
import { ICreateAdminUser, IManageAdminUserList } from "../_types/manage-user";

@Injectable({
  providedIn: "root",
})
export class ManageUserService {
  constructor(private http: HttpClient) {}

  getAllAdminUserList(data: IManageAdminUserList) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("Firstname", data.Firstname);
    queryParams = queryParams.append("Lastname", data.Lastname);
    queryParams = queryParams.append("EmailAddress", data.EmailAddress);
    queryParams = queryParams.append("Company", data.Company);
    queryParams = queryParams.append("IsActive", data.IsActive);
    queryParams = queryParams.append("RoleName", data.RoleName);
    queryParams = queryParams.append("FromLastLoginAt", data.FromLastLoginAt);
    queryParams = queryParams.append("ToLastLoginAt", data.ToLastLoginAt);
    queryParams = queryParams.append("FromCreatedAt", data.FromCreatedAt);
    queryParams = queryParams.append("ToCreatedAt", data.ToCreatedAt);
    queryParams = queryParams.append("Page", data.Page);
    queryParams = queryParams.append("Size", data.Size);
    queryParams = queryParams.append("SortColumn", data.SortColumn);
    queryParams = queryParams.append("SortType", data.SortType);

    return this.http
      .get<any>(CONFIG.getAllAdminUserListURL, { params: queryParams })
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  createNewAdminUser(data: ICreateAdminUser) {
    return this.http.post<any>(CONFIG.createNewAdminUserURL, data).pipe(
      map((result) => {
        return result;
      })
    );
  }

  editAdminUser(data: ICreateAdminUser) {
    return this.http.put<any>(CONFIG.editAdminUserURL, data).pipe(
      map((result) => {
        return result;
      })
    );
  }

  getAdminUserById(id: string) {
    return this.http.get<any>(CONFIG.getAdminUserByIdURL + id).pipe(
      map((result) => {
        return result;
      })
    );
  }

  changePassword(formData: any) {
    return this.http.post<any>(CONFIG.changePasswordURL, formData).pipe(
      map((result) => {
        return result;
      })
    );
  }
}
