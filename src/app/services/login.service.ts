import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  BehaviorSubject,Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Constants} from '../constant/constant';
import { EncryptionService } from '../encrypt.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiURL = Constants.BASE_URL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  private alert = new  BehaviorSubject('');
  constructor(private httpClient: HttpClient,private enc:EncryptionService) { }
  currentalert = this.alert.asObservable();

  setAlert(message: any) {
    this.alert.next(message);
 }
  
  
  checkLogin(post): Observable<any> {
    let requestParam = this.enc.encrypt(JSON.stringify(post));

		let reqData = { 'REQUEST_DATA': requestParam};
    return this.httpClient.post<any>(this.apiURL + '/Login', reqData, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  sendOtp(post): Observable<any> {
    let requestParam = this.enc.encrypt(JSON.stringify(post));

		let reqData = { 'REQUEST_DATA': requestParam};
    return this.httpClient.post<any>(this.apiURL + '/AgentForgetPasswordOtp', reqData, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  verifyOtp(post): Observable<any> {

    let requestParam = this.enc.encrypt(JSON.stringify(post));

		let reqData = { 'REQUEST_DATA': requestParam};

    return this.httpClient.post<any>(this.apiURL + '/AgentVerifyOtp', reqData, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  resetPassword(post): Observable<any> {

    let requestParam = this.enc.encrypt(JSON.stringify(post));

		let reqData = { 'REQUEST_DATA': requestParam};
    
    return this.httpClient.post<any>(this.apiURL + '/AgentResetPassword', reqData, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  
  
  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
