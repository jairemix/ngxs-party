import { AdventurerClassState } from '../state/adventurer-class.state';
import { CreateAdventurer } from '../actions/party.actions';
import { Store, Select } from '@ngxs/store';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { mapValues } from 'lodash-es';
import { Dictionary } from 'src/app/utils/dictionary.type';
import { Adventurer } from 'src/app/party-management/models/adventurer/adventurer.type';
import { AdventurerClass } from 'src/app/party-management/models/adventurer-class/adventurer-class.type';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface AdventurerFormData {
  name: string;
  level: number;
  class: string;
}

@Component({
  selector: 'app-adventurer-form',
  templateUrl: './adventurer-form.component.html',
  styleUrls: ['./adventurer-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdventurerFormComponent implements OnInit {

  formGroup: FormGroup;
  formControls: Dictionary<AbstractControl>;
  defaults: AdventurerFormData;

  @Input() adventurerClasses: AdventurerClass[];
  @Output() shouldSubmit = new EventEmitter<Adventurer>();

  ngOnInit() {
    const defaultClass = this.adventurerClasses[0] ? this.adventurerClasses[0].id : '';
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      class: new FormControl(defaultClass, [Validators.required]),
      level: new FormControl(1, [Validators.required]),
    });
    this.formControls = this.formGroup.controls;
    this.defaults = mapValues(this.formControls, 'value') as any;
  }

  submit() {
    if (!this.formGroup.valid) {
      alert('invalid');
      return;
    }
    const data = this.formGroup.value as AdventurerFormData;
    this.shouldSubmit.emit({
      id: null,
      name: data.name,
      level: data.level,
      classes: [data.class],
    });
    this.clear();
  }

  clear() {
    this.formGroup.reset();
    this.formGroup.setValue(this.defaults);
  }

}
