export interface Dictionary<T> {
  [Key: string]: T;
}

export interface BagState {
  isLoaded: boolean;
  Data: Dictionary<string>;
}
