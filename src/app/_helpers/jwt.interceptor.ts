import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CONFIG } from "../config/app-config";
import { EncrDecrService } from "../_services/encr-decr.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private EncrDecr: EncrDecrService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const decrypted = localStorage.getItem("currentUser");
    if (decrypted) {
      const currentUser = JSON.parse(
        this.EncrDecr.get(CONFIG.EncrDecrKey, decrypted)
      );
      if (currentUser) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser?.authorizationKey}`,
            // 'language': localStorage.getItem("lan")
          },
        });
      }
    }

    return next.handle(request);
  }
}
