import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Constants} from '../constant/constant';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WalletbalanceService {

  private apiURL = Constants.BASE_URL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  
  public walletBalance = new BehaviorSubject<number>(0);
  constructor(private httpClient: HttpClient) { }

  setWalletBalance(val : number){
    this.walletBalance.next(val);
  }

  WalletBalance(){
    return this.walletBalance.asObservable();
  }


  getWalletBalance(id): Observable<any> {
    return this.httpClient.get<any>(this.apiURL+ '/agentWalletBalance/'+id, this.httpOptions)
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


