import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
   
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import{ Constants } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})

export class ListingService {

  private apiURL = Constants.CONSUMER_API_URL;
  private USER_ID = Constants.USER_ID;


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getlist(src:any,dest:any,dt:any): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + '/v1/busListing?source='+src+'&destination='+dest+'&entry_date='+dt+'&user_id='+this.USER_ID,this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getBusFacilities(id: any): Observable<any> {
    let reqData = { 'id': id };
    return this.httpClient.post<any>(this.apiURL + '/v1/busfacilities', reqData, this.httpOptions)
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