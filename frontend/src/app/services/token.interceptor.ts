import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class token_interceptor_c {
  constructor(public auth: AuthService, private router: Router) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('interceptor...');
    let headers = request.headers;
    let has = headers.has('X_NO_JWT_TOKEN');
    if (has) {
      // console.log('skipping...');
      headers = headers.delete('X_NO_JWT_TOKEN');
    }
    else {
      let token = this.auth.get_token();
      if (token) {
        // console.log('adding JWT token...');
        headers = headers.append('Authorization', `JWT ${token}`)
      }
    }
    request = request.clone({headers});
    // console.log('headers:', request.headers);
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401 || err.status === 403) {
          this.auth.logout();
          console.log("token expired:", err);
          this.router.navigate(['/login']);
          return Observable.of(err.message);
        }
        return Observable.throw(err);
      }
    });
  }

}
