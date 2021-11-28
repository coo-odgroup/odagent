import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
   
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Constants} from '../constant/constant';
@Injectable({
  providedIn: 'root'
})
export class SeatlayoutService {

  private apiURL = Constants.BASE_URL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }
  readAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/BusSeatLayout').pipe(
      catchError(this.errorHandler)
    )
  }
  readAllOperator(post): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/BusSeatLayoutOperator', JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getAllData(post): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/BusSeatLayoutData', JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAllaginationData(url,post): Observable<any> {
    return this.httpClient.post<any>(url, JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }



  seatsBus(post){
    return this.httpClient.post<any>(this.apiURL + '/seatsBus',JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
 
  create(post): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/BusSeatLayout', JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  update(id, post): Observable<any> {
    return this.httpClient.put<any>(this.apiURL + '/BusSeatLayout/' + id, JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getByID(id){
    return this.httpClient.get<any>(this.apiURL + '/BusSeatLayoutRecord/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
 
  
  delete(id){
    return this.httpClient.delete<any>(this.apiURL + '/BusSeatLayout/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  chngsts(id){
    return this.httpClient.put<any>(this.apiURL + '/changeStatusBusSeatLayout/' + id, this.httpOptions)
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
