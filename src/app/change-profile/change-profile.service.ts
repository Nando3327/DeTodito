import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';
import { AuthorizersNames } from '../models/authorizers.model';
import { MethodsNames } from '../models/methods.model';
import { UserStoreService } from '../../store/entity/user';

@Injectable()
export class ChangeProfileService {

  constructor(private http: HttpClient,
              private storeUser: UserStoreService,
              private appService: AppService) {
  }

  public changeProfile(params): Observable<any> {
    params.user = this.storeUser.getUser().key;
    const paramsSend = {
      headerData: {
        source: AuthorizersNames.login,
        method: MethodsNames.changeProfile
      },
      detailsData: params
    };
    return this.appService.sendRequest(paramsSend).pipe(
      map((res: any) => {
        if (res && res.code === 200) {
          const user = this.storeUser.getUser();
          this.storeUser.updateUser({
            key: user.key,
            alias: user.alias,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            selectedProfile: res.data.profileData.profile,
            profiles: user.profiles,
            profileData: res.data.profileData
          });
          return true;
        }
        return false;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
