import { Adventurer } from '../models/adventurer/adventurer.type';

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
