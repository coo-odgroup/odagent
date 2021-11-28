import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  BehaviorSubject,Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Constants} from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private apiURL = Constants.BASE_URL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  private alert = new  BehaviorSubject('');
  constructor(private httpClient: HttpClient) { }
  
  currentalert = this.alert.asObservable();

  setAlert(message: any) {
    this.alert.next(message);
 }
  
  signup(params :any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/Register', JSON.stringify(params), this.httpOptions)
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
