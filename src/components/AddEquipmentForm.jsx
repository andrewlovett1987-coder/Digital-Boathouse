import React, { useState } from 'react';

const AddEquipmentForm = ({ onSubmit, onCancel, branding }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(name, type); }} className="space-y-4">
            <h3 className="text-xl font-bold">Add New Equipment</h3>
            <div>
                <label className="block text-sm font-medium text-gray-700">Equipment Name (e.g., Vespoli 8+ "Phoenix")</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Type (e.g., Eight (8+), Pair (2-))</label>
                <input type="text" value={type} onChange={e => setType(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"/>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
                <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-md text-white" style={{backgroundColor: branding.colors.accent, color: branding.colors.primary}}>Add Item</button>
            </div>
        </form>
    );
};

export default AddEquipmentForm;