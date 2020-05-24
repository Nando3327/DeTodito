import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class AppService {

  constructor(private http: HttpClient) {
  }

  public sendRequest(params): Observable<any> {
    return this.http.post(environment.linkerUrl, params, {}).pipe(
      map((res: any) => {
        if (res && res.code === 200) {
          return res.data;
        }
        throw throwError(res.message);
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

}
