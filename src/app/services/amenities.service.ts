import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {Constants} from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class AmenitiesService {
  private apiURL = Constants.BASE_URL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  all(): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + '/Amenities',  this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getAllData(post): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/AmenitiesData', JSON.stringify(post), this.httpOptions)
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

  // create(post): Observable<any> {
  //   return this.httpClient.post<any>(this.apiURL + '/Amenities', JSON.stringify(post), this.httpOptions)
  //   .pipe(
  //     catchError(this.errorHandler)
  //   )
  // }

  create(post): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/Amenities',post)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  update(post): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/AmenitiesUpdate',post)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  // update(id, post): Observable<any> {
  //   return this.httpClient.put<any>(this.apiURL + '/Amenities/' + id, JSON.stringify(post), this.httpOptions)
  //   .pipe(
  //     catchError(this.errorHandler)
  //   )
  // }
  delete(id){
    return this.httpClient.delete<any>(this.apiURL + '/Amenities/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  chngsts(id, post): Observable<any> {
    // console.log("hello");
    return this.httpClient.put<any>(this.apiURL + '/changeStatusAmenities/' + id,JSON.stringify(post), this.httpOptions)
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
