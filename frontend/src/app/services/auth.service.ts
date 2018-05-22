import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import jwt_decode from 'jwt-decode';


@Injectable()
export class AuthService {

  logged_in = false;
  current_user_id: number;

  private BASE_URL: string = 'http://localhost:8002';
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
    , 'X_NO_JWT_TOKEN': ''
  });
  private token: string;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        let dec = jwt_decode(token);
        this.logged_in = true;
        this.current_user_id = dec.user_id;
        console.log("decoded user:", dec);

      }
      catch (e) {
      }
    }
  }

  login(user): Observable<any> {
    let url: string = `${this.BASE_URL}/sign_in/`;
    return this.http.post(url, JSON.stringify(user), {headers: this.headers})
      .map((response: any) => {
        // let login_successful = false;
        if (!response.token) {
          throw new Error("Invalid username or password");
        }
        let dec = jwt_decode(response.token);
        localStorage.setItem('token', response.token);
        this.current_user_id = dec.id;
        // login_successful = true;
        this.logged_in = true;
        // this.router.navigateByUrl('/status');
        return this.logged_in;
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.logged_in = false;
    this.current_user_id = null;
  }

  register(user): Observable<any> {
    let url: string = `${this.BASE_URL}/register/`;
    return this.http.post(url, JSON.stringify(user), {headers: this.headers})
    // ((response): Response) ??
      .map((response: any) => {
        if (!response.token) {
          throw new Error("Registration failed");
        }
        return this.logged_in;
      })
  }


  ensure_authenticated(token): Observable<any> {
    let url: string = `${this.BASE_URL}/status/`;
    let headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
        , 'X_NO_JWT_TOKEN': ''
        , 'Authorization': `JWT ${token}`
      })
    ;
    return this.http.get(url, {headers: headers});
  }


  get_token(): string {
    return localStorage.getItem('token');
  }
}
