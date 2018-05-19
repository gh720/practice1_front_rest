import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  private BASE_URL: string = 'http://localhost:8002';
  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private token: string;


  constructor(private http: HttpClient) {
  }

  login(user): Observable<any> {
    let url: string = `${this.BASE_URL}/sign_in/`;
    return this.http.post(url, JSON.stringify(user), {headers: this.headers})
      .map((response) => {
        return response;
      });
    //   let json = response.json();
    //   if (json && json.token) {
    //     this.token = json.token;
    //     localStorage.setItem('currentUser', JSON.stringify({username: username, token: json.token}))
    //   }
    // });
  }

  register(user): Observable<any> {
    let url: string = `${this.BASE_URL}/register/`;
    return this.http.post(url, user, {headers: this.headers})
    // ((response): Response) ??
      .map((response) => {
        return response;
      })
  }


  ensure_authenticated(token): Observable<any> {
    let url: string = `${this.BASE_URL}/status/`;
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`
    });
    return this.http.get(url, {headers: headers});
  }

  test(): string {
    return 'working!';
  }

}
