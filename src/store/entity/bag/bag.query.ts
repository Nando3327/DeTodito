import { Query } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { BagStore } from './bag.store';
import { BagState } from './bag.state';


@Injectable({ providedIn: 'root' })
export class BagQuery extends Query<BagState> {
  constructor(protected store: BagStore) {
    super(store);
  }
}
