import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Constants} from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class UserreviewService {
  private apiURL = Constants.BASE_URL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  readAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/review').pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id){
    return this.httpClient.delete<any>(this.apiURL + '/review/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  chngsts(id){
    return this.httpClient.put<any>(this.apiURL + '/review/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  UserReviewData(data): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/review',JSON.stringify(data), this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }

  UserReviewpaginationData(url,data): Observable<any> {
    return this.httpClient.post<any>(url,JSON.stringify(data), this.httpOptions).pipe(
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
