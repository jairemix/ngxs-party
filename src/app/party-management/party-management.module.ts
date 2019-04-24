import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { PartyState } from '../state/party.state';
import { PartyManagementComponent } from './party-management-page/party-management.component';
import { AdventurerRowComponent } from './adventurer-row/adventurer-row.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([
      PartyState,
    ]),
  ],
  declarations: [
    PartyManagementComponent,
    AdventurerRowComponent,
  ],
  exports: [
    PartyManagementComponent,
  ],
})
export class PartyManagementModule {}
