// This file acts as an in-memory database for club assets and their repair logs.

const assets = [
    {
        id: 1,
        name: 'The Worcester Giant',
        type: '8+',
        weightClass: 'Heavyweight (90kg+)',
        manufacturer: 'Filippi',
        status: 'In Service', // 'In Service', 'Booked', 'Out of Use'
        repairLog: [],
    },
    {
        id: 2,
        name: 'Severn Sprinter',
        type: '4x',
        weightClass: 'Lightweight (75kg)',
        manufacturer: 'Empacher',
        status: 'In Service',
        repairLog: [],
    },
    {
        id: 3,
        name: 'The Cathedral',
        type: '1x',
        weightClass: 'Open',
        manufacturer: 'Hudson',
        status: 'Out of Use',
        repairLog: [
            {
                reportId: 1,
                reportedBy: 'John Doe',
                dateReported: new Date('2025-10-15T09:00:00Z'),
                description: 'Large crack in the hull near the bow.',
                photoUrl: 'https://example.com/images/crack.jpg',
                isResolved: false,
                dateResolved: null,
            }
        ],
    }
];

let currentAssetId = assets.length;
let currentReportId = 1;

const listAssets = () => assets;

const getAssetById = (id) => assets.find(a => a.id === parseInt(id));

const updateAssetStatus = (id, newStatus) => {
    const asset = getAssetById(id);
    if (!asset) return null;
    asset.status = newStatus;
    return asset;
};

const reportDamage = (assetId, reportData) => {
    const asset = getAssetById(assetId);
    if (!asset) return null;

    currentReportId += 1;
    const newReport = {
        reportId: currentReportId,
        dateReported: new Date(),
        isResolved: false,
        dateResolved: null,
        ...reportData,
    };

    asset.repairLog.push(newReport);

    // CRUCIAL INTEGRATION: Set asset status to 'Out of Use'
    asset.status = 'Out of Use';

    return asset;
};

const resolveRepair = (assetId, reportId) => {
    const asset = getAssetById(assetId);
    if (!asset) return null;

    const report = asset.repairLog.find(r => r.reportId === parseInt(reportId));
    if (!report) return null;

    report.isResolved = true;
    report.dateResolved = new Date();

    // If there are no other unresolved issues, set the boat back to 'In Service'
    const hasOpenRepairs = asset.repairLog.some(r => !r.isResolved);
    if (!hasOpenRepairs) {
        asset.status = 'In Service';
    }

    return asset;
};

module.exports = {
    listAssets,
    getAssetById,
    updateAssetStatus,
    reportDamage,
    resolveRepair
};