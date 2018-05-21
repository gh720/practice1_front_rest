import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {Location} from "../models/location";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Visit} from "../models/visit";


@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private API_URL: string = 'http://localhost:8002';

  constructor(private http: HttpClient) {
  }

  get_locations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.API_URL}/locations/`);
  }

  add_location(location: Location): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.post(`${this.API_URL}/locations/`
      , JSON.stringify(location)
      , {headers: headers}
    );
  }

  get_users() {

  }

  get_ratio(id:string) {
    return this.http.get<Location[]>(`${this.API_URL}/locations/${id}/ratio/`);
  }
}
