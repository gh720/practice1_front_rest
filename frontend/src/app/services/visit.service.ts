import {Injectable} from '@angular/core';
import {Visit} from "../models/visit";
import {Observable} from "rxjs/Rx";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  private API_URL: string = 'http://localhost:8002';

  constructor(private http: HttpClient) {
  }

  get_visits(): Observable<Visit[]> {
    return this.http.get<Visit[]>(`${this.API_URL}/visits/with_names/`);
    //   .map(
    //   data=>{
    //     for (var visit of data) {
    //       visit.rating=visit.ratio;
    //     }
    //     return data;
    //   }
    // );
  }

  add_visit(visit: Visit): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.post(`${this.API_URL}/locations/${visit.location}/visit/`
      , JSON.stringify({ratio: visit.ratio})
      , {headers: headers}
    );
  }
}
