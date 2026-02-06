import { DayOfWeek } from './types';

export const DAYS: DayOfWeek[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const HOURS = Array.from({ length: 24 }, (_, i) => i);

export const PASTEL_COLORS = [
  'bg-blue-200 border-blue-400 text-blue-900',
  'bg-green-200 border-green-400 text-green-900',
  'bg-purple-200 border-purple-400 text-purple-900',
  'bg-amber-200 border-amber-400 text-amber-900',
  'bg-pink-200 border-pink-400 text-pink-900',
  'bg-orange-200 border-orange-400 text-orange-900',
  'bg-teal-200 border-teal-400 text-teal-900',
  'bg-indigo-200 border-indigo-400 text-indigo-900',
];

export const formatHour = (hour: number): string => {
  const h = hour % 12 || 12;
  const ampm = hour < 12 ? 'AM' : 'PM';
  return `${h} ${ampm}`;
};

export const DEFAULT_ACTIVITIES_PROMPT = `
  I need a balanced weekly routine.
  I work from 9am to 5pm Monday to Friday.
  I want to exercise 3 times a week in the evenings.
  I want to read a book on Saturday mornings.
  I need time for grocery shopping on Sunday.
`;
