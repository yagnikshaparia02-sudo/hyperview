import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CONFIG } from '../config/app-config';

@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {
  constructor(private http: HttpClient) {}

  getAllRoleList() {
    return this.http.get<any>(CONFIG.getAllAdminRoleListURL).pipe(
      map((result) => {
        return result;
      })
    );
  }
}
