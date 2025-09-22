import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { CONFIG } from "../config/app-config";

@Injectable({
  providedIn: "root",
})
export class ContactUsService {
  constructor(private http: HttpClient) {}


  sendMail(token, data) {
    return this.http.post<any>(CONFIG.sendcontactusMail + "/" + token, data).pipe(
      map((result) => {
        return result;
      })
    );
  }

}
