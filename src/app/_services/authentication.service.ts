import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { CONFIG } from "../config/app-config";
import { EncrDecrService } from "./encr-decr.service";
import { MultilingualService } from "./multilingual.service";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private loggedInStatus = false;

  constructor(
    private http: HttpClient,
    private EncrDecr: EncrDecrService,
    private multilingualService: MultilingualService
  ) {}

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }

  get isLoggedIn() {
    return this.loggedInStatus;
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(CONFIG.userAuthURL, { email: email, password: password })
      .pipe(
        map((user) => {
          // login successful if there's a jwt token in the response
          if (user.data && user.success) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            const encrypted = this.EncrDecr.set(CONFIG.EncrDecrKey, user.data);
            localStorage.setItem("currentUser", encrypted);
          }
          return user;
        })
      );
  }
  loginbytoken(token: string) {
    return this.http
      .post<any>(CONFIG.userbytokenAuthURL, { token: token })
      .pipe(
        map((user) => {
          // login successful if there's a jwt token in the response
          if (user.data && user.success) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            const encrypted = this.EncrDecr.set(CONFIG.EncrDecrKey, user.data);
            localStorage.setItem("currentUser", encrypted);
          }
          return user;
        })
      );
  }

  validateResetPass(token) {
    return this.http.get<any>(CONFIG.validateResetPassURL + token).pipe(
      map((response) => {
        return response;
      })
    );
  }

  resetPass(token: string, password: string, cPassword: string, email: string) {
    return this.http
      .post<any>(CONFIG.resetPassURL + token, {
        password: password,
        confirmPassword: cPassword,
        email: email,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    localStorage.removeItem("fullName");
    localStorage.removeItem("languages");
    // For remove all module sorting, pagination and filter session
    sessionStorage.clear();
  }

  forgotPassword(formData) {
    return this.http.post<any>(CONFIG.forgotPaswordURL, formData).pipe(
      map((result) => {
        return result;
      })
    );
  }

  getLogginUserDetails() {
    const decrypted = localStorage.getItem("currentUser");
    const currentUser = this.EncrDecr.get(CONFIG.EncrDecrKey, decrypted);
    if (currentUser) {
      return JSON.parse(currentUser);
    }
    return null;
  }
}
