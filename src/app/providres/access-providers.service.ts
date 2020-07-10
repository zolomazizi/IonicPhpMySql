import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders , HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout'
@Injectable(
//   {
//   providedIn: 'root'
// }
)
export class AccessProvidersService {
  server: string = 'http://localhost/ionic-api';

  constructor(
    public http: HttpClient
  ) { }

  postData(body , file){
    let headers = new  HttpHeaders({
      'content-type' : 'application/json; charset-utf-8'
    });
    let option ={
      headers : headers
    }
    return this.http.post(this.server + file, JSON.stringify(body), option)
    .timeout(59000)
    .map(res=>res);
  }
}
