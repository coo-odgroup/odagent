import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Constants} from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  private apiURL = Constants.BASE_URL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getBusScheduleEntryDatesFilter(post):Observable<any> {
    return this.httpClient.post<any>(this.apiURL+ '/getBusScheduleEntryDatesFilter', JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  getAllData(post): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/BusData', JSON.stringify(post), this.httpOptions)
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



  getBusScheduleEntryDates(busId):Observable<any> {
    return this.httpClient.get(this.apiURL+'/getBusScheduleEntryDates/' +busId,this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }
  getSelectedSeat(busId):Observable<any>{
    return this.httpClient.get(this.apiURL+'/busSeatsByBus/' +busId,this.httpOptions).pipe(
      catchError(this.errorHandler)
    ) 
  }
  updateSelectedData(busId,post):Observable<any>{

    return this.httpClient.put<any>(this.apiURL+ '/busSeats/'+busId, JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  updateExtraSeat(busId,post):Observable<any>{

    return this.httpClient.put<any>(this.apiURL+ '/updateBusSeatsExtras/'+busId, JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  readAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/bus').pipe(
      catchError(this.errorHandler)
    )
  }

  all(): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + '/bus',  this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  
  create(post): Observable<any> {
    return this.httpClient.post<any>(this.apiURL+ '/bus', JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  fetchBusContact(id):Observable<any>{
    return this.httpClient.get<any>(this.apiURL+ '/busContactsByBusId/'+id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  fetchBusRoutes(id):Observable<any>{
    return this.httpClient.get<any>(this.apiURL+'/busStoppagebyBusId/'+id,this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
  fetchBusTime(id):Observable<any>{
    return this.httpClient.get<any>(this.apiURL+'/busStoppageTimingbyBusId/'+id,this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
  fetchBusAmenities(id):Observable<any>{
    return this.httpClient.get<any>(this.apiURL+'/busAmenities/'+id,this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
  fetchBusSafety(id):Observable<any>{
    return this.httpClient.get<any>(this.apiURL+'/BusSafety/'+id,this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  updateNewFare(post:any):Observable<any>{
    return this.httpClient.put<any>(this.apiURL+ '/updateNewFare', JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  updateRoutes(id, post): Observable<any> {
    return this.httpClient.put<any>(this.apiURL+ '/busStoppage/'+id, JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  updateContactinfo(id, post): Observable<any> {
    return this.httpClient.put<any>(this.apiURL+ '/busContactInfo/'+id, JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  
  update(id, post): Observable<any> {
    return this.httpClient.put<any>(this.apiURL+ '/bus/'+id, JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  
  chngsts(id){
    return this.httpClient.put<any>(this.apiURL+ '/changeStatusBus/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  delete(id){
    return this.httpClient.delete<any>(this.apiURL+ '/bus/'+id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  findSource(source_id:any,destination_id:any): Observable<any>
  {
    return this.httpClient.get(this.apiURL + '/locationBus/'+source_id+"/"+destination_id).pipe(
      catchError(this.errorHandler)
    );
  }
  getByOperaor(id):Observable<any>{
    return this.httpClient.get<any>(this.apiURL+'/operatorBus/'+id,this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
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
