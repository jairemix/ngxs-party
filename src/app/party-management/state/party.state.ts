import * as fromActions from '../actions/party.actions';
import { State, Selector, StateContext, Action } from '@ngxs/store';
import { filter, findIndex, omit } from 'lodash-es';
import { PartyService } from '../services/party.service';
import { map as mapRx, catchError, tap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { PartyStateModel } from './party-state-model.type';
import { defaultPartyStateModel } from './default-party-state-model';

@State<PartyStateModel>({
  name: 'party',
  defaults: {
    adventurers: [],
    nextID: 1,
    loaded: false,
  },
})
export class PartyState {

  constructor(
    private readonly partyService: PartyService,
  ) {}

  @Selector()
  static getAdventurers(state: PartyStateModel) {
    return state.adventurers;
  }

  /**
   * Override the whole state with what `partyService` returns.
   * If `partyService` returns null or throws an error, uses the default `PartyStateModel`
   */
  @Action(fromActions.LoadParty)
  loadParty(context: StateContext<PartyStateModel>, action: fromActions.LoadParty) {
    // override everything with what service returns
    return this.partyService.getParty().pipe(
      mapRx((partyStateModel) => {
        return partyStateModel || defaultPartyStateModel;
      }),
      catchError((e) => {
        return of(defaultPartyStateModel);
      }),
       tap((partyStateModel) => {
        context.patchState(partyStateModel);
        context.dispatch(new fromActions.LoadPartySuccess());
      }),
    );
  }

  @Action(fromActions.LoadPartySuccess)
  loadPartySuccess(context: StateContext<PartyStateModel>, action: fromActions.LoadPartySuccess) {
    context.patchState({
      loaded: true,
      loadError: void(0),
    });
  }

  @Action(fromActions.LoadPartySuccess)
  loadPartyError(context: StateContext<PartyStateModel>, action: fromActions.LoadPartyError) {
    context.patchState({
      loadError: action.error,
    });
  }

  @Action(fromActions.PersistParty)
  persistParty(context: StateContext<PartyStateModel>, action: fromActions.PersistParty) {
    const model = omit(context.getState(), 'loaded', 'loadError');
    return this.partyService.setParty(model).pipe(
      tap(() => {
        context.dispatch(new fromActions.PersistPartySuccess());
      }),
      catchError((e) => {
        context.dispatch(new fromActions.PersistPartyError(e));
        return throwError(e);
      }),
    );
  }

  @Action(fromActions.CreateAdventurer)
  createAdventurer(context: StateContext<PartyStateModel>, action: fromActions.CreateAdventurer) {
    const state = context.getState();

    const adventurer = {
      ...action.payload,
      id: state.nextID,
    };

    context.patchState({
      adventurers: [
        ...state.adventurers,
        adventurer,
      ],
      nextID: state.nextID + 1,
    });
    return context.dispatch(new fromActions.PersistParty());
  }

  @Action(fromActions.DeleteAdventurer)
  deleteAdventurer(context: StateContext<PartyStateModel>, action: fromActions.DeleteAdventurer) {
    const state = context.getState();
    const payload = action.payload;
    const adventurerID = (typeof payload === 'number') ? payload : payload.id;
    context.patchState({
      adventurers: filter(state.adventurers, a => a.id !== adventurerID),
    });
    return context.dispatch(new fromActions.PersistParty());
  }

  @Action(fromActions.UpdateAdventurer)
  updateAdventurer(context: StateContext<PartyStateModel>, action: fromActions.UpdateAdventurer) {
    const state = context.getState();
    const payload = action.payload;
    const adventurerID = payload.id;
    const index = findIndex(state.adventurers, a => a.id === adventurerID);
    const newAdventurers = [ ...state.adventurers ];
    newAdventurers[index] = payload;
    context.patchState({
      adventurers: newAdventurers,
    });
    return context.dispatch(new fromActions.PersistParty());
  }
}

