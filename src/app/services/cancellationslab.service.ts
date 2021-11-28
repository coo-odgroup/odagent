import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
   
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Constants} from '../constant/constant';
@Injectable({
  providedIn: 'root'
})
export class CancellationslabService {
  private endPoint = Constants.BASE_URL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  readAll(): Observable<any> {
    return this.httpClient.get<any>(this.endPoint + '/cancellationslabs',  this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  readAllOperator(post): Observable<any> {
    return this.httpClient.post<any>(this.endPoint+ '/cancellationslabsOperator', JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAllData(post): Observable<any> {
    return this.httpClient.post<any>(this.endPoint+ '/cancellationslabData', JSON.stringify(post), this.httpOptions)
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


  getByID(id): Observable<any> {
    return this.httpClient.get<any>(this.endPoint + '/cancellationslab/'+id,  this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  create(post): Observable<any> {
    return this.httpClient.post<any>(this.endPoint + '/cancellationslab', JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  update(id, post): Observable<any> {
    return this.httpClient.put<any>(this.endPoint + '/cancellationslab/' + id, JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  delete(id){
    return this.httpClient.delete<any>(this.endPoint + '/cancellationslab/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  chngsts(id){
    return this.httpClient.put<any>(this.endPoint + '/changeStatusCancellationslab/' + id, this.httpOptions)
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
