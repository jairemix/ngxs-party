import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Select } from '@ngxs/store';
import { PartyState } from 'src/app/state/party.state';
import { Adventurer } from 'src/app/models/adventurer/adventurer.type';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-party-management',
  templateUrl: './party-management.component.html',
  styleUrls: ['./party-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartyManagementComponent implements OnInit {

  @Select(PartyState.getAdventurers) adventurers$: Observable<Adventurer[]>;

  constructor() { }

  ngOnInit() {
  }

}
