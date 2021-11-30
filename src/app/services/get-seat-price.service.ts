import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
   
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import{ Constants } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})

export class GetSeatPriceService {

  private apiURL = Constants.CONSUMER_API_URL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getprice(queryparam:any): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + '/PriceOnSeatsSelection?' +queryparam ,this.httpOptions)
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
    }
    return throwError(errorMessage);
 }
}