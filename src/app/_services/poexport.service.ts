import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { CONFIG } from "../config/app-config";

@Injectable({
  providedIn: "root",
})
export class POExportService {
  constructor(private http: HttpClient) {}


  getPOStatusResult() {
    return this.http.get<any>(CONFIG.getPOStatusResult).pipe(
      map((result) => {
        return result;
      })
    );
  }

  getPOExportResult(token, data) {
    return this.http.post<any>(CONFIG.getPOExportResult + "/" + token, data).pipe(
      map((result) => {
        return result;
      })
    );
  }
  getPODetailsResult(token, poId) {
    return this.http.get<any>(CONFIG.getPODetailsResult + "/" + token+"/"+ poId).pipe(
      map((result) => {
        return result;
      })
    );
  }
}
