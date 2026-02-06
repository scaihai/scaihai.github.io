import React from 'react';
import { Activity, DayOfWeek } from '../types';
import { DAYS, HOURS, formatHour } from '../constants';

interface CalendarProps {
  activities: Activity[];
  onSlotClick: (day: DayOfWeek, hour: number) => void;
  onActivityClick: (activity: Activity) => void;
}

const Calendar: React.FC<CalendarProps> = ({ activities, onSlotClick, onActivityClick }) => {
  
  // Helper to map days to grid columns (Mon=2, Tue=3, ..., Sun=8) because Col 1 is time
  const getDayColumn = (day: DayOfWeek) => DAYS.indexOf(day) + 2;
  
  // Helper to map hours to grid rows (0=2, 1=3, ..., 23=25) because Row 1 is Header
  const getHourRow = (hour: number) => hour + 2;

  return (
    <div className="flex-1 h-full bg-white relative overflow-hidden">
      <div className="grid h-full w-full min-w-[800px]" style={{
        gridTemplateColumns: '60px repeat(7, 1fr)',
        gridTemplateRows: '32px repeat(24, 1fr)' // 32px header, rest distributed evenly
      }}>
        
        {/* Header Row */}
        <div className="bg-slate-50 border-b border-slate-200 col-start-1 row-start-1"></div>
        {DAYS.map((day, index) => (
          <div 
            key={day} 
            className="bg-slate-50 border-b border-slate-200 border-l border-slate-200 flex items-center justify-center font-semibold text-xs text-slate-600 uppercase tracking-wide"
            style={{ gridColumnStart: index + 2 }}
          >
            {day}
          </div>
        ))}

        {/* Time Labels Column */}
        {HOURS.map((hour) => (
          <div 
            key={`time-${hour}`} 
            className="bg-white border-r border-slate-200 border-b border-slate-100 flex items-start justify-center text-[10px] leading-3 text-slate-400 font-medium pt-1"
            style={{ gridRowStart: getHourRow(hour) }}
          >
            {formatHour(hour)}
          </div>
        ))}

        {/* Grid Cells (The interactive background) */}
        {DAYS.map((day, dayIndex) => (
          HOURS.map((hour) => (
            <div
              key={`${day}-${hour}`}
              className="border-b border-r border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
              style={{
                gridColumnStart: dayIndex + 2,
                gridRowStart: getHourRow(hour)
              }}
              onClick={() => onSlotClick(day, hour)}
            >
            </div>
          ))
        ))}

        {/* Activities Layer */}
        {activities.map((activity) => {
          const isShort = activity.duration <= 1;
          return (
            <div
              key={activity.id}
              className={`m-px rounded text-xs shadow-sm border overflow-hidden cursor-pointer hover:shadow-md transition-shadow z-10 flex flex-col ${activity.color} ${isShort ? 'justify-center px-1' : 'p-1'}`}
              style={{
                gridColumnStart: getDayColumn(activity.day),
                gridColumnEnd: 'span 1',
                gridRowStart: getHourRow(activity.startHour),
                gridRowEnd: `span ${activity.duration}`
              }}
              onClick={(e) => {
                e.stopPropagation();
                onActivityClick(activity);
              }}
            >
              <div className="font-semibold truncate leading-tight w-full">{activity.title}</div>
              
              {!isShort && activity.description && (
                <div className="text-[10px] opacity-75 line-clamp-1 leading-tight mt-0.5">{activity.description}</div>
              )}
              
              {!isShort && (
                <div className="mt-auto text-[10px] font-medium opacity-75 leading-none pt-0.5">
                  {formatHour(activity.startHour)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;