export type DayOfTheWeek = {
  value: number;
  name: string;
};

export const daysOfTheWeek: DayOfTheWeek[] = [
  { value: 0, name: 'Sunday' },
  { value: 1, name: 'Monday' },
  { value: 2, name: 'Tuesday' },
  { value: 3, name: 'Wednesday' },
  { value: 4, name: 'Thursday' },
  { value: 5, name: 'Friday' },
  { value: 6, name: 'Saturday' },
];

export function getDayOfTheWeek(value: number): DayOfTheWeek | undefined {
  const dayName = daysOfTheWeek.find(day => day.value === value);
  return dayName;
}

export function getDayText(dayStreak: number): string {
  if (dayStreak === 1) {
    return `${dayStreak} day`;
  }
  return `${dayStreak} days`;
}
