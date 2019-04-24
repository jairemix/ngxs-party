import { Adventurer } from './../../models/adventurer/adventurer.type';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-adventurer-row',
  templateUrl: './adventurer-row.component.html',
  styleUrls: ['./adventurer-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdventurerRowComponent implements OnInit {

  @Input() adventurer: Adventurer;

  constructor() { }

  ngOnInit() {
  }

}
