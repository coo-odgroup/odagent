import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
   
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Constants} from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private endPoint = Constants.BASE_URL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  create(post): Observable<any> {
    return this.httpClient.post<any>(Constants.BASE_URL+'/coupon', JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  update(id, post): Observable<any> {
    return this.httpClient.put<any>(Constants.BASE_URL+'/coupon/'+id, JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  delete(id){
    return this.httpClient.delete<any>(Constants.BASE_URL+'/coupon/'+id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  couponDataTable(data): Observable<any> {
    return this.httpClient.post<any>(Constants.BASE_URL + '/getData',JSON.stringify(data), this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }
  couponPaginate(url,data): Observable<any> {
    return this.httpClient.post<any>(url,JSON.stringify(data), this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error;
     // `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
