import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Constants} from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private apiURL = Constants.BASE_URL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  // seatopenReport(): Observable<any> {
  //   return this.httpClient.get(this.apiURL + '/seatopenreport/').pipe(
  //     catchError(this.errorHandler)
  //   )
  // }

  seatopenReport(data): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/seatopenreport',JSON.stringify(data), this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }

  seatopenpaginationReport(url,data): Observable<any> {
    return this.httpClient.post<any>(url,JSON.stringify(data), this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }



  // seatblockReport(): Observable<any> {
  //   return this.httpClient.get(this.apiURL + '/seatblockreport').pipe(
  //     catchError(this.errorHandler)
  //   )
  // }

  seatblockReport(data): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/seatblockreport',JSON.stringify(data), this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }

  seatblockpaginationReport(url,data): Observable<any> {
    return this.httpClient.post<any>(url,JSON.stringify(data), this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }

  // extraseatopenReport(): Observable<any> {
  //   return this.httpClient.get(this.apiURL + '/extraseatopenreport').pipe(
  //     catchError(this.errorHandler)
  //   )
  // }


  extraseatopenReport(data): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/extraseatopenreport',JSON.stringify(data), this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }


  extraseatopenpaginationReport(url,data): Observable<any> {
    return this.httpClient.post<any>(url,JSON.stringify(data), this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }



  completeReport(data): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/completereport',JSON.stringify(data), this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }


  completepaginationReport(url,data): Observable<any> {
    return this.httpClient.post<any>(url,JSON.stringify(data), this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }

  // completeReport(): Observable<any> {
  //   return this.httpClient.get(this.apiURL + '/completereport').pipe(
  //     catchError(this.errorHandler)
  //   )
  
 
  // failledtransactionReport(): Observable<any> {
  //   return this.httpClient.get(this.apiURL + '/failledtransactionreport').pipe(
  //     catchError(this.errorHandler)
  //   )
  // }


  failledtransactionReport(data): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/failledtransactionreport',JSON.stringify(data), this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }

  failledtransactionpaginationReport(url,data): Observable<any> {
    return this.httpClient.post<any>(url,JSON.stringify(data), this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }





  // buscancellationReport(): Observable<any> {
  //   return this.httpClient.get(this.apiURL + '/buscancellationreport').pipe(
  //     catchError(this.errorHandler)
  //   )
  // }


  buscancellationReport(data): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/buscancellationreport',JSON.stringify(data), this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }

  buscancellationpaginationReport(url,data): Observable<any> {
    return this.httpClient.post<any>(url,JSON.stringify(data), this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }
  // ownerpaymentReport(): Observable<any> {
  //   return this.httpClient.get(this.apiURL + '/ownerpaymentreport').pipe(
  //     catchError(this.errorHandler)
  //   )
  // }

  ownerpaymentReport(data): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/ownerpaymentreport',JSON.stringify(data), this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }


  ownerpaymentpaginationReport(url,data): Observable<any> {
    return this.httpClient.post<any>(url,JSON.stringify(data), this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }






  // cancelticketReport(): Observable<any> {
  //   return this.httpClient.get(this.apiURL + '/cancelticketreport').pipe(
  //     catchError(this.errorHandler)
  //   )
  // }


  cancelticketReport(data): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/cancelticketreport',JSON.stringify(data), this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }


  cancelticketpaginationReport(url,data): Observable<any> {
    return this.httpClient.post<any>(url,JSON.stringify(data), this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }










  cleartransactionReport(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/cleartransactionreport').pipe(
      catchError(this.errorHandler)
    )
  }

  couponUsedUserReport(data): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/couponuseduserreport',JSON.stringify(data), this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }


  couponUsedUserpaginationReport(url,data): Observable<any> {
    return this.httpClient.post<any>(url,JSON.stringify(data), this.httpOptions).pipe(
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
