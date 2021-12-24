import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
   
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import{ Constants } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})

export class FilterService {

  private apiURL = Constants.CONSUMER_API_URL;
  private USER_ID = Constants.USER_ID;

  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getlist(params :any): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + '/Filter?'+ params+'&user_id='+this.USER_ID,this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  errorHandler(error:HttpErrorResponse) {
    let errorMessage :any;
    if(error.error instanceof HttpErrorResponse) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error;
      
      //`Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
