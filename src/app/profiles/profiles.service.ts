import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AppService } from '../app.service';
import { catchError, map } from 'rxjs/operators';
import {AuthorizersNames } from '../models/authorizers.model';
import {MethodsNames } from '../models/methods.model';
import { UserStoreService } from '../../store/entity/user';

@Injectable()
export class ProfilesService {

  constructor(private appService: AppService) {
  }

  public getProfiles(params): Observable<any> {
    const paramsSend = {
      headerData: {
        source: AuthorizersNames.profiles,
        method: MethodsNames.getProfiles
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
