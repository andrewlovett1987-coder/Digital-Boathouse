import React from 'react';

const AssetList = ({ assets }) => {
    if (!assets || assets.length === 0) {
        return <p>No assets found.</p>;
    }

    const getStatusStyle = (status) => {
        switch (status) {
            case 'In Service':
                return { backgroundColor: '#e6fffa', color: '#2c7a7b', padding: '3px 8px', borderRadius: '12px', fontWeight: 'bold' };
            case 'Out of Use':
                return { backgroundColor: '#fed7d7', color: '#c53030', padding: '3px 8px', borderRadius: '12px', fontWeight: 'bold' };
            case 'Booked':
                return { backgroundColor: '#feebc8', color: '#b7791f', padding: '3px 8px', borderRadius: '12px', fontWeight: 'bold' };
            default:
                return {};
        }
    };

    const cardStyle = {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        backgroundColor: 'white',
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #eee',
        paddingBottom: '10px',
        marginBottom: '15px',
    };

    const repairLogStyle = {
        marginTop: '15px',
        paddingLeft: '20px',
        borderLeft: '3px solid #eee',
    };

    return (
        <div>
            {assets.map(asset => (
                <div key={asset.id} style={cardStyle}>
                    <div style={headerStyle}>
                        <h3 style={{ margin: 0, fontSize: '1.5em', color: '#002147' }}>{asset.name} <span style={{fontSize: '0.8em', color: '#666'}}>({asset.type})</span></h3>
                        <span style={getStatusStyle(asset.status)}>{asset.status}</span>
                    </div>
                    <p><strong>Manufacturer:</strong> {asset.manufacturer} | <strong>Weight Class:</strong> {asset.weightClass}</p>

                    {asset.repairLog && asset.repairLog.length > 0 && (
                        <div style={repairLogStyle}>
                            <h4>Repair Log:</h4>
                            {asset.repairLog.map(log => (
                                <div key={log.reportId} style={{ marginBottom: '10px', padding: '10px', backgroundColor: log.isResolved ? '#f0fff4' : '#fff5f5', borderRadius: '5px' }}>
                                    <p><strong>Description:</strong> {log.description}</p>
                                    <p><strong>Reported by:</strong> {log.reportedBy} on {new Date(log.dateReported).toLocaleDateString()}</p>
                                    <p><strong>Status:</strong> {log.isResolved ? `Resolved on ${new Date(log.dateResolved).toLocaleDateString()}` : 'Outstanding'}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AssetList;