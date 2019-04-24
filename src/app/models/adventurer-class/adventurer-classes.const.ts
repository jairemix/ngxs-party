import { AdventurerClass } from './adventurer-class.type';

export const AdventurerClasses: AdventurerClass[] = [
  {
    title: 'priest',
    calculateHealth: l => 40 + l * 10,
  },
  {
    title: 'druid',
    calculateHealth: l => 41 + l * 11,
  },
  {
    title: 'wizard',
    calculateHealth: l => 38 + l * 8,
  },
  {
    title: 'fighter',
    calculateHealth: l => 50 + l * 15,
  },
];
