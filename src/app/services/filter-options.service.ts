import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import{ Constants } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class FilterOptionsService {

  private apiURL = Constants.CONSUMER_API_URL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }


  getoptions(srcId :any,destId : any,busIDs: any): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + '/FilterOptions?sourceID=' + srcId + '&destinationID=' +destId+ '&' +busIDs,  this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error:HttpErrorResponse) {
    let errorMessage :any;
    if(error.error instanceof HttpErrorResponse) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error;
    }
    return throwError(errorMessage);
 }
}