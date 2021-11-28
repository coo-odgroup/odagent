import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Constants} from '../constant/constant';
@Injectable({
  providedIn: 'root'
})
export class BusstoppageService {
  private apiURL = Constants.BASE_URL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getBusByOperator(operatorId): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + '/busStoppageByOperator/' + operatorId, this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }

  getBusByRoutes(sourceId,destinationId): Observable<any> {
    return this.httpClient.get(this.apiURL + '/busStoppagebyRoutes/' + sourceId +'/'+ destinationId, this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }

  
  get(sourceId): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + '/busStoppage/' + sourceId, this.httpOptions).pipe(
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
