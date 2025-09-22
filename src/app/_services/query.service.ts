import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { CONFIG } from "../config/app-config";

@Injectable({
  providedIn: "root",
})
export class QueryService {
  constructor(private http: HttpClient) {}

  authorizedByToken(token: any, userId: any) {
    token = token || "00000000-0000-0000-0000-000000000000";
    userId = userId || "00000000-0000-0000-0000-000000000000";
    return this.http
      .get<any>(CONFIG.getAuthorizedByToken + "/" + token + "/" + userId)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
  getQueries(token, userId: any) {
    token = token || "00000000-0000-0000-0000-000000000000";
    userId = userId || "00000000-0000-0000-0000-000000000000";
    return this.http
      .get<any>(CONFIG.getQueries + "/" + token + "/" + userId)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
  getQueryFilter(queryId: any, userId: any, token: any) {
    token = token || "00000000-0000-0000-0000-000000000000";
    userId = userId || "00000000-0000-0000-0000-000000000000";
    return this.http
      .get<any>(
        CONFIG.getQueryFilter + "/" + queryId + "/" + token + "/" + userId
      )
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  getQueryResult(token: any, userId: any, data: any) {
    token = token || "00000000-0000-0000-0000-000000000000";
    userId = userId || "00000000-0000-0000-0000-000000000000";

    console.log(CONFIG.getQueryResult + "/" + token + "/" + userId, data);
    return this.http
      .post<any>(CONFIG.getQueryResult + "/" + token + "/" + userId, data)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
  sendQueryResultMail(token: any, userId: any, data: any) {
    token = token || "00000000-0000-0000-0000-000000000000";
    userId = userId || "00000000-0000-0000-0000-000000000000";
    return this.http
      .post<any>(CONFIG.sendQueryResultMail + "/" + token + "/" + userId, data)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
}
