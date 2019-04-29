import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { PartyState } from 'src/app/state/party.state';
import { Adventurer } from 'src/app/models/adventurer/adventurer.type';
import { Observable } from 'rxjs';
import { UpdateAdventurer, DeleteAdventurer } from 'src/app/actions/party.actions';

@Component({
  selector: 'app-party-management-page',
  templateUrl: './party-management-page.component.html',
  styleUrls: ['./party-management-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartyManagementPageComponent implements OnInit {

  @Select(PartyState.getAdventurers) adventurers$: Observable<Adventurer[]>;

  constructor(private store: Store) {
    // console.log('adventurers$', this.store.select(state => state.party.adventurers));
  }

  ngOnInit() {
  }

}
