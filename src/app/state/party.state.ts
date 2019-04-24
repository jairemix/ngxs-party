import { AddAdventurer, RemoveAdventurer } from './../actions/party.actions';
import { State, Selector, StateContext, Action } from '@ngxs/store';
import { Adventurer } from '../models/adventurer/adventurer.type';
import { filter } from 'lodash-es';
import { defaultAdventurers } from '../models/adventurer/default-adventurers';

export class PartyStateModel {
  adventurers: Adventurer[];
}

@State<PartyStateModel>({
  name: 'party',
  defaults: {
    adventurers: defaultAdventurers,
  },
})
export class PartyState {
  @Selector()
  static getAdventurers(state: PartyStateModel) {
    return state.adventurers;
  }

  @Action(AddAdventurer)
  add(context: StateContext<PartyStateModel>, action: AddAdventurer) {
    const state = context.getState();
    context.patchState({
      adventurers: [
        ...state.adventurers,
        action.payload,
      ],
    });
  }

  @Action(RemoveAdventurer)
  remove(context: StateContext<PartyStateModel>, action: RemoveAdventurer) {
    const state = context.getState();
    const payload = action.payload;
    const adventurerID = (typeof payload === 'number') ? payload : payload.id;
    context.patchState({
      adventurers: filter(state.adventurers, a => a.id !== adventurerID),
    });
  }
}

