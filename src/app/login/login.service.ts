import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class LoginService {

  constructor(private appService: AppService,
              private http: HttpClient) {
  }

  public login(params): Observable<any> {
    return this.http.post('http://localhost:8001/login', params, {}).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
