import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { CONFIG } from "../config/app-config";
import { IDashboardProps } from "./../_types/dashboard";
import { AuthenticationService } from "src/app/_services/authentication.service";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  authorizedByToken(token: any, userId: any) {
    token = token || "00000000-0000-0000-0000-000000000000";

    return this.http
      .get<any>(CONFIG.getAuthorizedByToken + "/" + token + "/" + userId)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  getAllStatistics() {
    return this.http.get<IDashboardProps>(CONFIG.getDashboardStatistics).pipe(
      map((result) => {
        return result;
      })
    );
  }
  getTopProducts() {
    return this.http.get<any>(CONFIG.getTopProducts).pipe(
      map((result) => {
        return result;
      })
    );
  }
  getTotalSalesCount() {
    return this.http.get<any>(CONFIG.getTotalSalesCount).pipe(
      map((result) => {
        return result;
      })
    );
  }
  getAverageOrderValueCount() {
    return this.http.get<any>(CONFIG.getAverageOrderValueCount).pipe(
      map((result) => {
        return result;
      })
    );
  }
  getTotalOrders() {
    return this.http.get<any>(CONFIG.getTotalOrders).pipe(
      map((result) => {
        return result;
      })
    );
  }
  getTotalSalesSource() {
    this.user = this.auth.getLogginUserDetails();

    return this.http
      .get<any>(CONFIG.getTotalSalesSource + "/" + this.user.userId)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
  getAverageOrderValue() {
    return this.http.get<any>(CONFIG.getAverageOrderValue).pipe(
      map((result) => {
        return result;
      })
    );
  }
  getSevenDaysData() {
    this.user = this.auth.getLogginUserDetails();
    return this.http
      .get<any>(CONFIG.getSevenDaysData + "/" + this.user.userId)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
  getOrdersData() {
    this.user = this.auth.getLogginUserDetails();
    return this.http
      .get<any>(CONFIG.getOrdersData + "/" + this.user.userId)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
  user: any;
  getAverageOrderSummary() {
    this.user = this.auth.getLogginUserDetails();

    return this.http
      .get<any>(CONFIG.getAverageOrderSummary + "/" + this.user.userId)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
  getTotalSalesChart() {
    this.user = this.auth.getLogginUserDetails();

    return this.http
      .get<any>(CONFIG.getTotalSalesChart + "/" + this.user.userId)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
}
