import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
   
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Constants} from '../constant/constant';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private apiURL = Constants.BASE_URL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  DataTable(url,data): Observable<any> {
    
    let APIurl=this.apiURL+"/odbusChargesData";
    if(url!=''){
      APIurl = url;
    }
    return this.httpClient.post<any>(APIurl,JSON.stringify(data), this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }
  all(): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + '/odbusCharges',  this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  create(post): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/addOdbusCharges',post)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  constructor(private httpClient: HttpClient) { }
  getbyId(id): Observable<any> {
    return this.httpClient.get(this.apiURL + '/odbusCharges/'+id ).pipe(
      catchError(this.errorHandler)
    )
  }
  update(data): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/updateOdbusCharges', data)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  delete(id){
    return this.httpClient.delete<any>(this.apiURL + '/odbusCharges/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  chngsts(id){
    return this.httpClient.put<any>(this.apiURL + '/changeStatus/' + id, this.httpOptions)
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
