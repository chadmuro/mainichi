export type DayOfTheWeek = {
  value: string;
  day: string;
  name: string;
};

export const daysOfTheWeek: DayOfTheWeek[] = [
  { value: '0', day: 'S', name: 'Sunday' },
  { value: '1', day: 'M', name: 'Monday' },
  { value: '2', day: 'T', name: 'Tuesday' },
  { value: '3', day: 'W', name: 'Wednesday' },
  { value: '4', day: 'T', name: 'Thursday' },
  { value: '5', day: 'F', name: 'Friday' },
  { value: '6', day: 'S', name: 'Saturday' },
];

export function getDayOfTheWeek(value: string): DayOfTheWeek | undefined {
  const dayName = daysOfTheWeek.find(day => day.value === value);
  return dayName;
}

export function getDayText(dayStreak: number): string {
  if (dayStreak === 1) {
    return `${dayStreak} day`;
  }
  return `${dayStreak} days`;
}
