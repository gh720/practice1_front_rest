import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import {User} from "../models/user";
import {Location} from "../models/location";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private API_URL: string = 'http://localhost:8002';

  constructor(private http: HttpClient) {
  }

  get_users(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/users/`);
  }

  get_user(user_id): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/users/${user_id}/`);
  }

  save(user: User): Observable<any> {
    // console.log("saving user:", user);
    return this.http.put(`${this.API_URL}/users/${user.id}/`, user);
  }


  get_ratio(id: string) {
    return this.http.get<User[]>(`${this.API_URL}/users/${id}/ratio/`);
  }
}
