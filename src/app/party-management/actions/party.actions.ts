import { Adventurer } from '../models/adventurer/adventurer.type';
import { PartyStateModel } from '../state/party-state-model.type';

export class CreateAdventurer {
  static readonly type = '[Party] Add Adventurer';
  constructor(public payload: Adventurer) {}
}

export class DeleteAdventurer {
  static readonly type = '[Party] Remove Adventurer';
  constructor(public payload: Adventurer | number) {}
}

export class UpdateAdventurer {
  static readonly type = '[Party] Update Adventurer';
  constructor(public payload: Adventurer) {}
}

export class LoadParty {
  static readonly type = '[Party] Load Party';
}

export class LoadPartySuccess {
  static readonly type = '[Party] Loaded Party Success';
}

export class LoadPartyError {
  static readonly type = '[Party] Loaded Party Error';
  constructor(public error: any) {}
}

export class PersistParty {
  static readonly type = '[Party] Persist Party';
  constructor() {}
}

export class PersistPartySuccess {
  static readonly type = '[Party] Persist Party Success';
}

export class PersistPartyError {
  static readonly type = '[Party] Persist Party Error';
  constructor(public error: any) {}
}
