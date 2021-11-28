import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {Constants} from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class SpecialsliderService {
  private apiURL = Constants.BASE_URL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  sliderDataTable(url,data): Observable<any> {
    
    let APIurl=this.apiURL+"/sliderDataTable";
    if(url!=''){
      APIurl = url;
    }
    return this.httpClient.post<any>(APIurl,JSON.stringify(data), this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }

  all(): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + '/slider',  this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  // create(post): Observable<any> {
  //   return this.httpClient.post<any>(this.apiURL + '/slider', JSON.stringify(post), this.httpOptions)
  //   .pipe(
  //     catchError(this.errorHandler)
  //   )
  // }
  create(post): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/slider',post)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  update(post): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/sliderUpdate',post)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  // update(id, post): Observable<any> {
  //   return this.httpClient.put<any>(this.apiURL + '/slider/' + id, JSON.stringify(post), this.httpOptions)
  //   .pipe(
  //     catchError(this.errorHandler)
  //   )
  // }
  delete(id){
    return this.httpClient.delete<any>(this.apiURL + '/slider/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  chngsts(id){
    return this.httpClient.put<any>(this.apiURL + '/changeStatusSlider/' + id, this.httpOptions)
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
