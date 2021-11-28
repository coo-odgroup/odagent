import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Constants} from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  private apiURL = Constants.BASE_URL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  bannerDataTable(url,data): Observable<any> {
    
    let APIurl=this.apiURL+"/bannerDataTable";
    if(url!=''){
      APIurl = url;
    }
    return this.httpClient.post<any>(APIurl,JSON.stringify(data), this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }

  all(): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + '/banner',  this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  create(post): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/addBanner', post)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  update(post): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/updateBanner', post)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  delete(id){
    return this.httpClient.delete<any>(this.apiURL + '/banner/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  chngsts(id){
    return this.httpClient.put<any>(this.apiURL + '/changeStatusBanner/' + id, this.httpOptions)
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
