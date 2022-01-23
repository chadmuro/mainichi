import { Color } from "./colorSelect";

export type Habit = {
  id: string;
  dayStreak: number;
  emoji: string;
  name: string;
  color: Color;
  dates: string[];
};
