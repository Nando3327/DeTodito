
import { Injectable } from '@angular/core';
import { BagStore } from './bag.store';
import { BagQuery } from './bag.query';
import { BagState } from './bag.state';

@Injectable({
  providedIn: 'root',
})
export class BagStoreService {

  constructor(
    private businessQuery: BagQuery,
    private businessStore: BagStore
  ) {
  }


  updateBag(business: BagState) {
    this.businessStore.update(business);
  }

  getBag() {
    return this.businessQuery.getValue();
  }

  getBagValue(key: string): any {
    return this.businessQuery.getValue().Data[key];
  }

  removeBagValue(key: string): any {
    // return this.businessStore.update(undefined);
    this.setBagValue(key, undefined);
  }

  setBagValue(key: string, value: any) {
    const bagValue = this.businessQuery.getValue();
    const dataValue =  { ...bagValue.Data };
    dataValue[key] = value;
    this.businessStore.update({ Data: dataValue });
  }

}
