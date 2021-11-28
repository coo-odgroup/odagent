import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
   
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Constants} from '../constant/constant';


@Injectable({
  providedIn: 'root'
})

export class OTPService {

  private apiURL = Constants.BASE_URL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  submit_otp(params): Observable<any> {
    //console.log(JSON.stringify(params));
    return this.httpClient.post(this.apiURL + '/VerifyOtp', JSON.stringify(params) ,this.httpOptions)
    .pipe( 
      catchError(this.errorHandler)
    )
  }
  
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error;
    }

    return throwError(errorMessage);
 }
}
