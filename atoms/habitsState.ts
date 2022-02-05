import { atom } from 'recoil';
import { Habit } from '../constants/habit';

// eslint-disable-next-line import/prefer-default-export
export const habitsState = atom<Habit[]>({
  key: 'habitsState',
  default: [],
});
