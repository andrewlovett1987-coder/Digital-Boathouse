import React from 'react';
import { PlusCircle } from 'lucide-react';

const ScheduleView = ({ schedule, squads, athletes, openModal, branding }) => {
    const today = new Date('2025-10-20'); // Fix date for consistent display
    const days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() + i + 1);
        return d;
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">This Week's Schedule</h2>
                <button className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium" style={{backgroundColor: branding.colors.accent, color: branding.colors.primary}}>
                    <PlusCircle className="w-4 h-4" />
                    <span>New Session</span>
                </button>
            </div>
            <div className="grid grid-cols-7 gap-px bg-gray-300 border border-gray-300 rounded-lg overflow-hidden">
                {days.map(day => (
                    <div key={day} className="bg-gray-100 p-2">
                        <div className="text-center font-bold text-sm">{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                        <div className="text-center text-xs text-gray-500">{day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                    </div>
                ))}
                {days.map(day => {
                    const daySessions = schedule.filter(s => new Date(s.date).toDateString() === day.toDateString());
                    return (
                        <div key={day.toISOString()} className="bg-white p-2 min-h-[120px] space-y-2">
                            {daySessions.map(session => (
                                <div key={session.id} className="bg-yellow-100 border-l-4 border-yellow-500 p-2 rounded-r-md text-sm cursor-pointer hover:bg-yellow-200">
                                    <p className="font-bold">{session.time}</p>
                                    <p className="text-xs">{session.title}</p>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ScheduleView;