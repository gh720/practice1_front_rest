import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class token_http_client_c {

  constructor(private http: HttpClient) {
  }

  add_token_header(headers: HttpHeaders) {
    let token = localStorage.getItem('token');
    if (token) {
      headers.append('Authorization', 'JWT ' + token);
    }
    return headers;
  }

  get<T>(url:string) {
    let headers = this.add_token_header(new HttpHeaders());
    return this.http.get<T>(url, {headers: headers});
  }

  post<T>(url:string, data:any) {
    let headers = this.add_token_header(new HttpHeaders());
    return this.http.post<T>(url, data, {headers: headers});
  }

}
