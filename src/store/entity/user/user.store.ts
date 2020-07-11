import { UserState } from './user.state';
import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export function createInitialUserState(): UserState {
  return {
    key: '',
    alias: '',
    name: '',
    lastName: '',
    email: '',
    profiles: [],
    profileData: {}
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user', resettable: true })
export class UserStore extends Store<UserState> {
  constructor() {
    super(createInitialUserState());
  }
}
