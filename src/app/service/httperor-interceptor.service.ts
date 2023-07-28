import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {
  Observable,
  catchError,
  concatMap,
  of,
  retry,
  retryWhen,
  throwError,
} from 'rxjs';
import * as alertyfy from 'alertifyjs';
import { AlertifyService } from './alertify.service';
import { Injectable, Pipe } from '@angular/core';
import { ErrorCode } from '../enums/enums';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptorService implements HttpInterceptor {
  constructor(private alertify: AlertifyService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('Http Request started');
    return next.handle(req).pipe(
      retryWhen((error) => this.retryRequest(error, 10)),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = this.setError(error);
        console.log(error);
        this.alertify.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
  //Retry Request in case of error
  retryRequest(error: Observable<any>, retryCount: number): Observable<any> {
    return error.pipe(
      concatMap((checkErr: HttpErrorResponse, count: number) => {
        if (count <= retryCount) {
          switch (checkErr.status) {
            case ErrorCode.serverDown:
              return of(checkErr);
            // case ErrorCode.unauthorised:
            //   return of(checkErr);
          }
        }
        return throwError(checkErr);
      })
    );
  }
  setError(error: HttpErrorResponse): string {
    let errorMessage = 'Unknown Error Occured';
    if (error.error instanceof ErrorEvent) {
      //Client side Error
      errorMessage = error.error.message;
    } else {
      //Server side Error
      if(error.status===401){
        return error.statusText;
      }
      if (error.error.errorMessage && error.status !== 0) {
        {errorMessage = error.error.errorMessage;}

        // errorMessage = error.error.erroeMEssage;
      }
      if (!error.error.errorMessage && error.status !== 0) {
        {errorMessage = error.error.errorMessage;}

        // errorMessage = error.error.erroeMEssage;
      }

    }
    return errorMessage;
  }
}
