import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { BagState } from './bag.state';

export function createInitialBagState(): BagState {
  return {
    isLoaded: false,
    Data: {}
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'bag' })
export class BagStore extends Store<BagState> {
  constructor() {
    super(createInitialBagState());
  }
}
