import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Constants} from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiURL = Constants.BASE_URL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  // readAll(): Observable<any> {
  //   return this.httpClient.get(this.apiURL + '/BusOperator').pipe(
  //     catchError(this.errorHandler)
  //   )
  // }

  
  getAllData(post): Observable<any> {
    return this.httpClient.post<any>(this.apiURL+ '/BusOperatorData', JSON.stringify(post), this.httpOptions)
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
    return this.httpClient.post<any>(this.apiURL + '/BusOperator', JSON.stringify(data), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id, data): Observable<any> {
    return this.httpClient.put<any>(this.apiURL + '/BusOperator/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  delete(id){
    return this.httpClient.delete<any>(this.apiURL + '/BusOperator/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  changepwd(id, data): Observable<any> {
    return this.httpClient.put<any>(this.apiURL + '/changePassword/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  changestatus(id){
    return this.httpClient.put<any>(this.apiURL + '/changeuserStatus/' + id, this.httpOptions)
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
