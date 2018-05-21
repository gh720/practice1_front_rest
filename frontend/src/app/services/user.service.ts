import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import {User} from "../models/user";

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
}
