import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { isEmptyData } from "../utils/common";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService,
    private route: ActivatedRoute
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401 || err.status === 408 || err.status === 417) {
          // auto logout if 401 response returned from api
          this.translate
            .get("SESSION_EXPIRED")
            .subscribe((msg) => this.toastr.error(msg));

          var token = this.route.snapshot.queryParams["token".toString()];
          if (isEmptyData(token)) {
            this.router.navigate(["login"]);
          } else {
            this.router.navigate(["login?token=" + token]);
          }
        }
        const error = err.error || err.statusText;
        return throwError(error);
      })
    );
  }
}
