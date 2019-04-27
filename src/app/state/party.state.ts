import { CreateAdventurer, DeleteAdventurer, UpdateAdventurer } from './../actions/party.actions';
import { State, Selector, StateContext, Action } from '@ngxs/store';
import { Adventurer } from '../models/adventurer/adventurer.type';
import { filter, findIndex } from 'lodash-es';
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

  @Action(CreateAdventurer)
  create(context: StateContext<PartyStateModel>, action: CreateAdventurer) {
    const state = context.getState();

    const adventurer = {
      ...action.payload,
      id: state.adventurers.length + 1,
    };

    context.patchState({
      adventurers: [
        ...state.adventurers,
        adventurer,
      ],
    });
  }

  @Action(DeleteAdventurer)
  delete(context: StateContext<PartyStateModel>, action: DeleteAdventurer) {
    const state = context.getState();
    const payload = action.payload;
    const adventurerID = (typeof payload === 'number') ? payload : payload.id;
    context.patchState({
      adventurers: filter(state.adventurers, a => a.id !== adventurerID),
    });
  }

  @Action(UpdateAdventurer)
  update(context: StateContext<PartyStateModel>, action: UpdateAdventurer) {
    const state = context.getState();
    const payload = action.payload;
    const adventurerID = payload.id;
    const index = findIndex(state.adventurers, a => a.id === adventurerID);
    const newAdventurers = [ ...state.adventurers ];
    newAdventurers[index] = payload;
    context.patchState({
      adventurers: newAdventurers,
    });
  }
}

