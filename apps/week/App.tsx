import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import EventModal from './components/EventModal';
import Button from './components/Button';
import { Activity, DayOfWeek, ModalType } from './types';

const App: React.FC = () => {
  // Use lazy initialization to read from localStorage immediately.
  // This prevents the 'save' effect from overwriting existing data with an empty array on the first render.
  const [activities, setActivities] = useState<Activity[]>(() => {
    try {
      const saved = localStorage.getItem('weekflow_activities');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse saved activities");
      return [];
    }
  });

  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  
  // Default values for new events
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Mon');
  const [selectedHour, setSelectedHour] = useState<number>(9);

  // Save to local storage whenever activities change
  useEffect(() => {
    localStorage.setItem('weekflow_activities', JSON.stringify(activities));
  }, [activities]);

  const handleSlotClick = (day: DayOfWeek, hour: number) => {
    setSelectedDay(day);
    setSelectedHour(hour);
    setSelectedActivity(null);
    setModalType(ModalType.EDIT_EVENT);
  };

  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity);
    setModalType(ModalType.EDIT_EVENT);
  };

  const handleSaveActivity = (activity: Activity) => {
    if (selectedActivity) {
      // Edit existing
      setActivities(prev => prev.map(a => a.id === activity.id ? activity : a));
    } else {
      // Create new
      setActivities(prev => [...prev, activity]);
    }
  };

  const handleDeleteActivity = (id: string) => {
    setActivities(prev => prev.filter(a => a.id !== id));
  };

  const clearSchedule = () => {
    if (window.confirm("Are you sure you want to clear the entire schedule?")) {
      setActivities([]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm z-30">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-indigo-200 shadow-lg">
            W
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">WeekFlow</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" onClick={clearSchedule} disabled={activities.length === 0}>
            Clear
          </Button>
          <Button onClick={() => {
            setSelectedActivity(null);
            setSelectedDay('Mon');
            setSelectedHour(9);
            setModalType(ModalType.EDIT_EVENT);
          }}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            Add Activity
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col relative">
        <Calendar 
          activities={activities} 
          onSlotClick={handleSlotClick}
          onActivityClick={handleActivityClick}
        />
      </main>

      {/* Modals */}
      <EventModal
        isOpen={modalType === ModalType.EDIT_EVENT}
        onClose={() => setModalType(ModalType.NONE)}
        onSave={handleSaveActivity}
        onDelete={handleDeleteActivity}
        initialData={selectedActivity}
        defaultDay={selectedDay}
        defaultHour={selectedHour}
      />
    </div>
  );
};

export default App;