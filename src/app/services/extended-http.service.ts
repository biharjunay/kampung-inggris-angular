import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "./auth.service";
import { AlertService } from "./alert.service";

@Injectable()
export class ExtendedHttpInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService, private _alertService: AlertService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    }

    if (this._authService.isAuthenticated()) headers['Authorization'] = `Bearer ${this._authService.getToken()}`
    if (req.body instanceof FormData) delete headers['Content-Type']

    req = req.clone({
      setHeaders: headers
    })

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        switch (err.status) {
          case 401:
            this._alertService.error('Unauthorized')
            this._authService.logout()
            break
          case 500:
            this._alertService.error('Server Error')
            break;
          default:
            this._alertService.error(err.error.message || (err.error.error && Object.values(err.error.error).join('\n')))
        }
        console.error(err)
        return throwError(() => err)
      })
    )
  }
}
