import React from 'react';
import { PlusCircle } from 'lucide-react';

const LineupsView = ({ lineups, athletes, openModal, branding }) => (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Lineups</h2>
             <button className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium" style={{backgroundColor: branding.colors.accent, color: branding.colors.primary}}>
                <PlusCircle className="w-4 h-4" />
                <span>Create Lineup</span>
            </button>
        </div>
        <div className="space-y-6">
            {lineups.map(l => {
                const boatSize = Object.keys(l.lineup).length;
                const seatOrder = ['cox', 8, 7, 6, 5, 4, 3, 2, 1].filter(s => l.lineup[s] !== undefined);
                return (
                    <div key={l.id} className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="text-xl font-bold">{l.name} - {l.boat}</h3>
                        <p className="text-sm text-gray-500 mb-4">Date: {new Date(l.date).toDateString()}</p>
                        <div className="flex items-center space-x-4">
                            <div className="relative w-full h-8 bg-gray-200 rounded-full flex items-center" style={{transform: "scaleX(-1)"}}>
                                {seatOrder.map((seat, index) => {
                                    const athlete = athletes.find(a => a.id === l.lineup[seat]);
                                    return (
                                        <div key={seat} className="absolute flex items-center justify-center h-12 w-12 rounded-full border-2 border-white shadow-md" style={{ left: `${(index / (boatSize -1)) * 95}%`, backgroundColor: seat === 'cox' ? '#fde047' : '#60a5fa', transform: "scaleX(-1)"}}>
                                            <span className="text-white font-bold text-xs">{athlete.name.split(' ')[0][0]}{athlete.name.split(' ')[1][0]}</span>
                                        </div>
                                    )
                                })}
                                <div className="absolute right-[-10px] w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-16 border-l-gray-300" style={{borderLeft: '16px solid #d1d5db'}}></div>
                            </div>
                        </div>
                         <div className="mt-8 grid gap-2" style={{ gridTemplateColumns: `repeat(${boatSize}, minmax(0, 1fr))` }}>
                            {seatOrder.map(seat => {
                                const athlete = athletes.find(a => a.id === l.lineup[seat]);
                                return (
                                <div key={seat} className="text-center">
                                    <div className="font-bold text-sm uppercase">{seat}</div>
                                    <div className="text-xs text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis">{athlete.name}</div>
                                </div>
                                )
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
);

export default LineupsView;