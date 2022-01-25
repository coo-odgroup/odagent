import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Constants} from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiURL = Constants.BASE_URL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  dashboard(post:any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL+ '/agentdashboarddata', JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  // toproute(): Observable<any> {
  //   return this.httpClient.get(this.apiURL + '/toproutedata').pipe(
  //     catchError(this.errorHandler)
  //   )
  // }

  toproute(data:any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL+ '/toproutedata', JSON.stringify(data), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  operatordata(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/operatordata').pipe(
      catchError(this.errorHandler)
    )
  }

  ticketstaticsdata(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/ticketstaticsdata').pipe(
      catchError(this.errorHandler)
    )
  }

  
  bookingbydevicedata(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/bookingbydevicedata').pipe(
      catchError(this.errorHandler)
    )
  }
 
  pnrstaticsdata(data:any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL+ '/pnrstaticsdata', JSON.stringify(data), this.httpOptions)
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
