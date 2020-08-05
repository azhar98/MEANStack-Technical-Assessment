import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { Register } from './Register';
import { map } from 'rxjs/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class ApiService {

  baseURL: string = "http://localhost:3000/api/v1";

constructor(private http: AuthHttp,
           private router: Router             
  ) { }

  
  // user register
  userRegistration(register:Register): Observable<any> {
  return this.http.post(`${this.baseURL}/useregister`, register)
  }

  // user register
  userLoginData(register: Register) : Observable<any> {
    return this.http.post(`${this.baseURL}/userlogin`, register).map(res=>{
      console.log(res['_body'])
      localStorage.setItem('access_id',res['_body']);
    })
      
    }
  

}