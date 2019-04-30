import { AdventurerClassState } from './state/adventurer-class.state';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { PartyState } from './state/party.state';
import { PartyManagementPageComponent } from './party-management-page/party-management-page.component';
import { AdventurerRowComponent } from './adventurer-row/adventurer-row.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdventurerFormComponent } from './adventurer-form/adventurer-form.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: PartyManagementPageComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([
      PartyState,
      AdventurerClassState,
    ]),
    ReactiveFormsModule,
  ],
  declarations: [
    PartyManagementPageComponent,
    AdventurerRowComponent,
    AdventurerFormComponent,
  ],
  exports: [
  ],
})
export class PartyManagementModule {}
