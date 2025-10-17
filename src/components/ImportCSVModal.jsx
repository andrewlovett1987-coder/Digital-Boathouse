import React from 'react';
import { UploadCloud } from 'lucide-react';

const ImportCSVModal = ({ onCancel, branding }) => (
    <div className="space-y-4">
        <h3 className="text-xl font-bold">Import Athletes via CSV</h3>
        <p className="text-sm text-gray-600">Upload a CSV file with the columns: `name`, `squadId`, `side`, `weight`, `2k` to bulk-add athletes to your squads.</p>
        <div className="mt-4 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">Drag & drop your file here or click to browse.</p>
            <p className="text-xs text-gray-500">CSV, XLS, or XLSX up to 10MB</p>
        </div>
        <div className="flex justify-end space-x-2 pt-4">
            <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300">Close</button>
        </div>
    </div>
);

export default ImportCSVModal;