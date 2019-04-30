import { Adventurer } from '../models/adventurer/adventurer.type';

export interface PartyStateModel {
  adventurers: Adventurer[];
  nextID: number;

  // not to be persisted
  loaded?: boolean;
  loadError?: any;
}
