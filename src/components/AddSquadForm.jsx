import React, { useState } from 'react';

const AddSquadForm = ({ onSubmit, onCancel, branding }) => {
    const [squadName, setSquadName] = useState('');
    const [coachName, setCoachName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(squadName, coachName);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-bold">Create New Squad</h3>
            <div>
                <label className="block text-sm font-medium text-gray-700">Squad Name</label>
                <input type="text" value={squadName} onChange={e => setSquadName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Coach Name</label>
                <input type="text" value={coachName} onChange={e => setCoachName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"/>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
                <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-md text-white" style={{backgroundColor: branding.colors.accent, color: branding.colors.primary}}>Create</button>
            </div>
        </form>
    );
};

export default AddSquadForm;