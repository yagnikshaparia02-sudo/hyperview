import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { CONFIG } from "../config/app-config";

@Injectable({
  providedIn: "root",
})
export class UserProfileService {
  constructor(private http: HttpClient) {}

  getUserProfile(token, userId) {
    token = token || "00000000-0000-0000-0000-000000000000";
    userId = userId || "00000000-0000-0000-0000-000000000000";

    return this.http
      .get<any>(CONFIG.getUserProfileURL + "/" + token + "/" + userId)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  UpdateUserProfile(token, data) {
    console.log(CONFIG.getQueryResult + "/" + token, data);
    return this.http
      .post<any>(CONFIG.updateUserProfileURL + "/" + token, data)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
}
