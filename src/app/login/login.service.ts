import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AppService } from '../app.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class LoginService {

  constructor(private appService: AppService) {
  }

  public login(params): Observable<any> {
    const paramsSend = {
      headerData: {
        source: 'LOGIN',
        method: 'LOGIN'
      },
      detailsData: params
    };
    return this.appService.sendRequest(paramsSend).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public register(params): Observable<any> {
    const paramsSend = {
      headerData: {
        source: 'LOGIN',
        method: 'REGISTER'
      },
      detailsData: params
    };
    return this.appService.sendRequest(paramsSend).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
