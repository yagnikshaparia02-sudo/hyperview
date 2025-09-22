import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CONFIG } from "../config/app-config";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ExportcsvService {
  constructor(private http: HttpClient) {}

  postCsvOrderNo(token, data) {
    return this.http.post<any>(CONFIG.postExportCSV + "/" + token, data).pipe(
      map((result) => {
        return result;
      })
    );
  }
}
