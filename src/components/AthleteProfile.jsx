import React from 'react';
import { User, ArrowLeft } from 'lucide-react';

const AthleteProfile = ({ athlete, onBack, squads, branding }) => (
    <div className="p-8">
        <button onClick={onBack} className="flex items-center space-x-2 text-sm text-gray-600 hover:text-red-600 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
        </button>
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
            <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-gray-500" />
                </div>
                <div>
                    <h2 className="text-4xl font-bold">{athlete.name}</h2>
                    <p className="text-lg text-gray-500">{squads.find(s => s.id === athlete.squadId)?.name || 'Unassigned'}</p>
                </div>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-semibold mb-4 border-b pb-2">Athlete Details</h3>
                    <div className="space-y-3 text-gray-700">
                        <p><strong>Preferred Side:</strong> {athlete.side}</p>
                        <p><strong>Weight:</strong> {athlete.weight}</p>
                        <p><strong>2k Ergo Score:</strong> {athlete['2k']}</p>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-4 border-b pb-2">Dates Away</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        {athlete.awayDates && athlete.awayDates.length > 0 ? (
                            <ul className="list-disc list-inside text-gray-700">
                                {athlete.awayDates.map(date => <li key={date}>{new Date(date).toDateString()}</li>)}
                            </ul>
                        ) : (
                            <p className="text-gray-500 text-sm">No upcoming absences reported.</p>
                        )}
                        <button className="mt-4 text-sm text-white py-1 px-3 rounded-md" style={{backgroundColor: branding.colors.accent, color: branding.colors.primary}}>+ Report Absence</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default AthleteProfile;