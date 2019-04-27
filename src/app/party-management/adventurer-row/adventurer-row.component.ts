import { UpdateAdventurer, DeleteAdventurer } from './../../actions/party.actions';
import { AdventurerClassState } from './../../state/adventurer-class.state';
import { AdventurerClass } from './../../models/adventurer-class/adventurer-class.type';
import { Adventurer } from './../../models/adventurer/adventurer.type';
import { Component, ChangeDetectionStrategy, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Store } from '@ngxs/store';
import { Dictionary } from 'src/app/utils/dictionary.type';
import { map, reduce } from 'lodash-es';

@Component({
  selector: 'app-adventurer-row',
  templateUrl: './adventurer-row.component.html',
  styleUrls: ['./adventurer-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdventurerRowComponent implements OnChanges {

  @Input() adventurer: Adventurer;
  private classDict: Dictionary<AdventurerClass>;

  // derived values
  classes: AdventurerClass[];
  classString: string;
  health: number;

  constructor(private store: Store) {
    this.classDict = store.selectSnapshot(AdventurerClassState.getClassDict);
  }

  ngOnChanges({ adventurer }: SimpleChanges) {
    const current = adventurer.currentValue as Adventurer;
    const prev = adventurer.previousValue as Adventurer;

    if (current.classes !== (prev && prev.classes)) { // assumes immutability
      this.classes = map(current.classes, id => this.classDict[id]);
      this.classString = map(this.classes, 'title').join(' | ');
    }

    this.calcStats();
  }

  private calcStats() {
    // average the health for all classes and round the result
    const level = this.adventurer.level;
    this.health = Math.round(reduce(this.classes, (total, adventurerClass) => {
      return total + adventurerClass.calculateHealth(level);
    }, 0) / this.classes.length);
  }

  levelUp() {
    this.store.dispatch(new UpdateAdventurer({
      ...this.adventurer,
      level: this.adventurer.level + 1,
    }));
  }

  deleteAdventurer() {
    this.store.dispatch(new DeleteAdventurer(this.adventurer));
  }

}
