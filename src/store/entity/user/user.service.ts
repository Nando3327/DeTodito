import { UserQuery } from './user.query';
import { UserStore } from './user.store';
import { UserState } from './user.state';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {

  constructor(
    private userQuery: UserQuery,
    private userStore: UserStore
  ) {
  }

  updateUser(user: UserState) {
    this.userStore.update(user);
  }

  getUser() {
    return this.userQuery.getValue();
  }
}
