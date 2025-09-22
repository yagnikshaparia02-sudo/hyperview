import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { CONFIG } from "../config/app-config";
import {
  ICreatePermission,
  IManagePermissionList,
  IManageRoleList,
  IRoleCreate,
} from "../_types/role-permission";

@Injectable({
  providedIn: "root",
})
export class RolePermissionService {
  constructor(private http: HttpClient) {}

  getAllRoleList(data: IManageRoleList) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("Name", data.Name);
    queryParams = queryParams.append("FromCreatedAt", data.FromCreatedAt);
    queryParams = queryParams.append("ToCreatedAt", data.ToCreatedAt);
    queryParams = queryParams.append("Page", data.Page);
    queryParams = queryParams.append("Size", data.Size);
    queryParams = queryParams.append("SortColumn", data.SortColumn);
    queryParams = queryParams.append("SortType", data.SortType);

    return this.http
      .get<any>(CONFIG.getAllRoleListURL, { params: queryParams })
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  createRoleDetails(data: IRoleCreate) {
    return this.http.post<any>(CONFIG.createRoleDetailsURL, data).pipe(
      map((result) => {
        return result;
      })
    );
  }

  updateRoleDetails(data: any) {
    return this.http.post<any>(CONFIG.editRoleDetailsURL, data).pipe(
      map((result) => {
        return result;
      })
    );
  }

  getAllPermissionList() {
    return this.http.get<any>(CONFIG.getAllPermissionListURL).pipe(
      map((result) => {
        return result;
      })
    );
  }

  getAllRoleWisePermissionList(id: string) {
    return this.http.get<any>(CONFIG.getAllRoleWisePermissionListURL + id).pipe(
      map((result) => {
        return result;
      })
    );
  }

  getAllRoleListDrp() {
    return this.http.get<any>(CONFIG.getAllRoleListDrp).pipe(
      map((result) => {
        return result;
      })
    );
  }

  updateRoleWisePermission(formData) {
    return this.http
      .put<any>(CONFIG.updateRoleWisePermissionURL, formData)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  getAllListPermissionWithFilter(data: IManagePermissionList) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("Name", data.Name);
    queryParams = queryParams.append("DisplayName", data.DisplayName);
    queryParams = queryParams.append("Page", data.Page);
    queryParams = queryParams.append("Size", data.Size);
    queryParams = queryParams.append("SortColumn", data.SortColumn);
    queryParams = queryParams.append("SortType", data.SortType);

    return this.http
      .get<any>(CONFIG.adminPermissionListURL, { params: queryParams })
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  getAdminPermissionById(id: string) {
    return this.http.get<any>(CONFIG.getAdminPermissionByIdURL + id).pipe(
      map((result) => {
        return result;
      })
    );
  }

  createAdminPermissions(data: ICreatePermission) {
    return this.http.post<any>(CONFIG.createAdminPermissionsURL, data).pipe(
      map((result) => {
        return result;
      })
    );
  }

  editAdminPermissions(data: ICreatePermission) {
    return this.http.put<any>(CONFIG.editAdminPermissionsURL, data).pipe(
      map((result) => {
        return result;
      })
    );
  }
}
