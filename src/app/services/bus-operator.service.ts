import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
   
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Constants} from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class BusOperatorService {

  private endPoint = Constants.BASE_URL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getIFSC(code):Observable<any>{
    return this.httpClient.get('https://ifsc.razorpay.com/' +code).pipe(
      catchError(this.errorHandler)
    )
  }
  checkOperatorEmail(data):Observable<any> {
    return this.httpClient.post(Constants.BASE_URL+'/getOperatorEmail' ,JSON.stringify(data),this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }
  checkOperatorPhone(data):Observable<any> {
    return this.httpClient.post(Constants.BASE_URL+'/getOperatorPhone' ,JSON.stringify(data),this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }
  getBusbyOperator(operatorId):Observable<any> {
    
    return this.httpClient.get(Constants.BASE_URL+'/getBusbyOperator/' +operatorId,this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }

  readAll(): Observable<any> {
    return this.httpClient.get(this.endPoint+'/busoperator' ).pipe(
      catchError(this.errorHandler)
    )
  }
  readOne(BusOperatorId): Observable<any> {
    return this.httpClient.get(this.endPoint+'/busoperator/'+BusOperatorId ).pipe(
      catchError(this.errorHandler)
    )
  }

  getAllData(post): Observable<any> {
    return this.httpClient.post<any>(Constants.BASE_URL+ '/BusbyOperatorData', JSON.stringify(post), this.httpOptions)
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


  create(post): Observable<any> {
    return this.httpClient.post<any>(Constants.BASE_URL+'/busoperator', JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  update(id, post): Observable<any> {
    return this.httpClient.put<any>(Constants.BASE_URL+'/busoperator/'+id, JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  delete(id){
    return this.httpClient.delete<any>(Constants.BASE_URL+'/busoperator/'+id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  chngsts(id){
    return this.httpClient.put<any>(Constants.BASE_URL + '/changeStatusBusOperator/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error;
     // `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }

}
