import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AppService } from '../app.service';
import { catchError, map } from 'rxjs/operators';
import {AuthorizersNames } from '../models/authorizers.model';
import {MethodsNames } from '../models/methods.model';

@Injectable()
export class LoginService {

  constructor(private appService: AppService) {
  }

  public login(params): Observable<any> {
    const paramsSend = {
      headerData: {
        source: AuthorizersNames.login,
        method: MethodsNames.login
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
        source: AuthorizersNames.login,
        method: MethodsNames.register
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

  public restore(params): Observable<any> {
    const paramsSend = {
      headerData: {
        source: AuthorizersNames.login,
        method: params.method
      },
      detailsData: {
        mail: params.mail
      }
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
