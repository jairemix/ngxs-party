import { Dictionary } from 'lodash';
import { AdventurerClass } from './../models/adventurer-class/adventurer-class.type';
import { State, Selector, StateContext, Action } from '@ngxs/store';
import { adventurerClasses } from '../models/adventurer-class/adventurer-classes.const';
import { keyBy } from 'lodash-es';

export class AdventurerClassStateModel {
  classes: AdventurerClass[];
}

@State<AdventurerClassStateModel>({
  name: 'adventurerClasses',
  defaults: {
    classes: adventurerClasses,
  },
})
export class AdventurerClassState {
  @Selector()
  static getClasses(state: AdventurerClassStateModel) {
    return state.classes;
  }
  @Selector()
  static getClassDict(state: AdventurerClassStateModel) {
    return keyBy(state.classes, 'id'); // this is memoised
  }
  // only read -> no actions
}
