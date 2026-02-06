export type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

export interface Activity {
  id: string;
  title: string;
  description?: string;
  day: DayOfWeek;
  startHour: number; // 0-23
  duration: number; // in hours
  color: string;
}

export interface ActivityFormData {
  title: string;
  description: string;
  day: DayOfWeek;
  startHour: string;
  duration: string;
  color: string;
}

export enum ModalType {
  NONE,
  EDIT_EVENT
}