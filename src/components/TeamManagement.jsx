import React from 'react';
import { PlusCircle, UploadCloud, Edit, Trash2 } from 'lucide-react';

const TeamManagement = ({ squads, athletes, setSquads, openModal, onViewAthlete, branding }) => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Team & Athlete Management</h2>
        <div className="flex space-x-2">
            <button onClick={() => openModal('importCSV')} className="flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium">
                <UploadCloud className="w-4 h-4" />
                <span>Import CSV</span>
            </button>
            <button onClick={() => openModal('addSquad')} className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium" style={{backgroundColor: branding.colors.accent, color: branding.colors.primary}}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#b89b31'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = branding.colors.accent}>
                <PlusCircle className="w-4 h-4" />
                <span>New Squad</span>
            </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {squads.map(squad => {
          const squadAthletes = athletes.filter(a => a.squadId === squad.id);
          return (
            <div key={squad.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{squad.name}</h3>
                  <p className="text-sm text-gray-500">Coach: {squad.coach}</p>
                </div>
                 <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-blue-600"><Edit size={16}/></button>
                      <button className="text-gray-400 hover:text-red-600"><Trash2 size={16}/></button>
                 </div>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold text-sm mb-2">Athletes ({squadAthletes.length})</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                  {squadAthletes.map(athlete => (
                    <div key={athlete.id} onClick={() => onViewAthlete(athlete)} className="flex justify-between items-center bg-gray-50 p-2 rounded-md text-sm cursor-pointer hover:bg-gray-200">
                      <span>{athlete.name}</span>
                      <span className="text-gray-500">{athlete.side}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
);

export default TeamManagement;