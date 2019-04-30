import { defaultAdventurers } from '../models/adventurer/default-adventurers';

export const defaultPartyStateModel = {
  adventurers: defaultAdventurers,
  nextID: defaultAdventurers.length + 1,
};
