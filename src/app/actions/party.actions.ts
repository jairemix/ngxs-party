import { Adventurer } from '../models/adventurer/adventurer.type';

export class AddAdventurer {
  static readonly type = '[Party] Add Adventurer';
  constructor(public payload: Adventurer) {}
}

export class RemoveAdventurer {
  static readonly type = '[Party] Remove Adventurer';
  constructor(public payload: Adventurer | number) {}
}

