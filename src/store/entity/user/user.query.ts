import { Query } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { UserState } from './user.state';
import { UserStore } from './user.store';


@Injectable({ providedIn: 'root' })
export class UserQuery extends Query<UserState> {
  constructor(protected store: UserStore) {
    super(store);
  }
}
