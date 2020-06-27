import { UserStoreService } from './user';
import { BagStoreService } from './bag';

export const STORE_SERVICES: any[] = [
  UserStoreService,
  BagStoreService,
];

export * from './user';
export * from './bag';
