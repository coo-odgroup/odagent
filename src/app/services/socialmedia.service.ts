import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Constants} from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class SocialmediaService {

  private apiURL = Constants.BASE_URL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  // readAll(): Observable<any> {
  //   return this.httpClient.get(this.apiURL + '/socialmedia').pipe(
  //     catchError(this.errorHandler)
  //   )
  // }
  // update(post): Observable<any> {
  //   return this.httpClient.put<any>(this.apiURL + '/socialmedia/', JSON.stringify(post), this.httpOptions)
  //   .pipe(
  //     catchError(this.errorHandler)
  //   )
  // }

 
  getAllData(post): Observable<any> {
    return this.httpClient.post<any>(this.apiURL+ '/socialmediaData', JSON.stringify(post), this.httpOptions)
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


  create(data): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/socialmedia', JSON.stringify(data), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id, data): Observable<any> {
    return this.httpClient.put<any>(this.apiURL + '/socialmedia/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  delete(id){
    return this.httpClient.delete<any>(this.apiURL + '/socialmedia/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  chngsts(id){
    return this.httpClient.put<any>(this.apiURL + '/changeStatussocialmedia/' + id, this.httpOptions)
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
