import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class RestError {
  constructor() {
  }

  get_error_string(error): string {
    let out='';
    console.log("error:", error);
    let keys = Object.keys(error.error).sort();
    for (let key of keys) {
      out+=error.error[key];
    }
    return out;
  }

}
