import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AppService } from '../app.service';
import { catchError, map } from 'rxjs/operators';
import {AuthorizersNames } from '../models/authorizers.model';
import {MethodsNames } from '../models/methods.model';
import { UserStoreService } from '../../store/entity/user';

@Injectable()
export class ChangeAliasService {

  constructor(private appService: AppService,
              private storeUser: UserStoreService) {
  }

  public changeAlias(params): Observable<any> {
    params.user = this.storeUser.getUser().key;
    params.alias = this.storeUser.getUser().alias;
    const paramsSend = {
      headerData: {
        source: AuthorizersNames.login,
        method: MethodsNames.changeAlias
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
