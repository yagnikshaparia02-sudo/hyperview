import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { CONFIG } from "../config/app-config";

@Injectable({
  providedIn: "root",
})
export class POImportService {
  constructor(private http: HttpClient) {}

  // Create bulk purchase orders
  createBulkPurchaseOrders(token, userId, data) {
    return this.http
      .post<any>(
        CONFIG.createBulkPurchaseOrders + "/" + token + "/" + userId,
        data
      )
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  // Get csv columns with required columns
  getCsvColumnsWithRequiredColumns(data) {
    return this.http
      .post<any>(CONFIG.getCsvColumnsWithRequiredColumns, data)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
}
