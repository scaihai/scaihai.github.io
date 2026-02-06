import React, { useState, useEffect } from 'react';
import { Activity, ActivityFormData, DayOfWeek } from '../types';
import { DAYS, PASTEL_COLORS, formatHour } from '../constants';
import Button from './Button';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (activity: Activity) => void;
  onDelete: (id: string) => void;
  initialData?: Activity | null;
  defaultDay?: DayOfWeek;
  defaultHour?: number;
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialData,
  defaultDay = 'Mon',
  defaultHour = 9
}) => {
  const [formData, setFormData] = useState<ActivityFormData>({
    title: '',
    description: '',
    day: defaultDay,
    startHour: defaultHour.toString(),
    duration: '1',
    color: PASTEL_COLORS[0]
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description || '',
        day: initialData.day,
        startHour: initialData.startHour.toString(),
        duration: initialData.duration.toString(),
        color: initialData.color
      });
    } else {
      setFormData({
        title: '',
        description: '',
        day: defaultDay,
        startHour: defaultHour.toString(),
        duration: '1',
        color: PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)]
      });
    }
  }, [initialData, defaultDay, defaultHour, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: initialData?.id || Math.random().toString(36).substr(2, 9),
      title: formData.title,
      description: formData.description,
      day: formData.day,
      startHour: parseInt(formData.startHour),
      duration: parseInt(formData.duration),
      color: formData.color
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        <div className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <h3 className="text-lg leading-6 font-bold text-slate-900" id="modal-title">
              {initialData ? 'Edit Activity' : 'New Activity'}
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-slate-700">Activity Title</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 p-2 border bg-white text-slate-900 placeholder-slate-400"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Gym, Reading, Meeting"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                <label className="block text-sm font-medium text-slate-700">Day</label>
                <select
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 p-2 border bg-white text-slate-900"
                  value={formData.day}
                  onChange={(e) => setFormData({ ...formData, day: e.target.value as DayOfWeek })}
                >
                  {DAYS.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              
               <div>
                <label className="block text-sm font-medium text-slate-700">Start Time</label>
                <select
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 p-2 border bg-white text-slate-900"
                  value={formData.startHour}
                  onChange={(e) => setFormData({ ...formData, startHour: e.target.value })}
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i}>{formatHour(i)}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Duration (Hours)</label>
              <select
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 p-2 border bg-white text-slate-900"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(d => (
                    <option key={d} value={d}>{d} Hour{d > 1 ? 's' : ''}</option>
                  ))}
                </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Color</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {PASTEL_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`w-8 h-8 rounded-full border-2 ${color} ${formData.color === color ? 'ring-2 ring-offset-2 ring-slate-400' : 'border-transparent'}`}
                    onClick={() => setFormData({ ...formData, color })}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Description (Optional)</label>
              <textarea
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 p-2 border bg-white text-slate-900 placeholder-slate-400"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              {initialData && (
                 <Button
                 type="button"
                 variant="danger"
                 onClick={() => {
                   onDelete(initialData.id);
                   onClose();
                 }}
               >
                 Delete
               </Button>
              )}
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
