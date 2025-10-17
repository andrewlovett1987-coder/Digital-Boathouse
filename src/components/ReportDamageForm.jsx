import React, { useState } from 'react';

const ReportDamageForm = ({ equipment, onSubmit, onCancel, branding }) => {
    const [equipmentId, setEquipmentId] = useState(equipment.find(e => e.status === 'In Repair')?.id || equipment[0].id);
    const [report, setReport] = useState('');

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(parseInt(equipmentId), report); }} className="space-y-4">
            <h3 className="text-xl font-bold">Report Equipment Damage</h3>
            <div>
                <label className="block text-sm font-medium text-gray-700">Select Equipment</label>
                <select value={equipmentId} onChange={e => setEquipmentId(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500">
                    {equipment.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Describe the issue</label>
                <textarea value={report} onChange={e => setReport(e.target.value)} required rows="4" className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"></textarea>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
                <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-md text-white" style={{backgroundColor: branding.colors.accent, color: branding.colors.primary}}>Submit Report</button>
            </div>
        </form>
    );
};

export default ReportDamageForm;