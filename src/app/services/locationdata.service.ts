import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {  BehaviorSubject, Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Constants} from '../constant/constant';


@Injectable({
  providedIn: 'root'
})
export class LocationdataService {

  private apiURL = Constants.CONSUMER_API_URL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
    
    private source = new  BehaviorSubject('');
    private destination = new  BehaviorSubject('');
    private source_id = new  BehaviorSubject('');
    private destination_id = new  BehaviorSubject('');
    private entdate = new  BehaviorSubject('');
    

  constructor(private httpClient: HttpClient) { 
  }

  currentsource = this.source.asObservable();
  currentdestination = this.destination.asObservable();
  currentsource_id = this.source_id.asObservable();
  currentdestination_id = this.destination_id.asObservable();
  currententdate = this.entdate.asObservable();

    setSource(s: any) {

       this.source.next(s);
    }

    setDestination(d: any) {
      this.destination.next(d);
    }

    setDate(dat: any) {
      this.entdate.next(dat);
    }

  

  all(val :any=''): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + '/getLocation?locationName=' + val,  this.httpOptions)
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
      
      //`Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
