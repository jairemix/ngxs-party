import { AdventurerClassState } from './../state/adventurer-class.state';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { PartyState } from '../state/party.state';
import { PartyManagementComponent } from './party-management-page/party-management.component';
import { AdventurerRowComponent } from './adventurer-row/adventurer-row.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdventurerFormComponent } from './adventurer-form/adventurer-form.component';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([
      PartyState,
      AdventurerClassState,
    ]),
    ReactiveFormsModule,
  ],
  declarations: [
    PartyManagementComponent,
    AdventurerRowComponent,
    AdventurerFormComponent,
  ],
  exports: [
    PartyManagementComponent,
  ],
})
export class PartyManagementModule {}
