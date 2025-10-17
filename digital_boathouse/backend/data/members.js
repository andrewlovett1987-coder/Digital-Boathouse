// This file will act as an in-memory database for members.
// In a real application, this would be replaced with a proper database connection.

const members = [
    {
        id: 1,
        googleId: '109876543210987654321', // Example Google ID
        name: 'John Doe',
        email: 'john.doe@example.com',
        britishRowingMembershipNumber: '123456',
        preferredSide: 'Strokeside',
        sculler: true,
        coxswain: false,
        weight: 85, // in kg
        height: 188, // in cm
        emergencyContactName: 'Jane Doe',
        emergencyContactPhone: '07123456789',
        squads: ['Senior Men'],
        role: 'Rower', // Rower, Coach, Admin, etc.
    },
    {
        id: 2,
        googleId: '123456789012345678901',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        britishRowingMembershipNumber: '654321',
        preferredSide: 'Bowside',
        sculler: false,
        coxswain: false,
        weight: 72,
        height: 175,
        emergencyContactName: 'John Smith',
        emergencyContactPhone: '07987654321',
        squads: ['Senior Women'],
        role: 'Rower',
    },
    {
        id: 3,
        name: 'Coach Carter',
        email: 'coach.carter@example.com',
        role: 'Coach',
        squads: ['Senior Men', 'Senior Women'],
         // Other fields can be null or empty for non-rowers
        britishRowingMembershipNumber: '',
        preferredSide: null,
        sculler: false,
        coxswain: false,
        weight: null,
        height: null,
        emergencyContactName: 'Club Secretary',
        emergencyContactPhone: '01905123456',
    }
];

// In a real DB, you'd use a sequence or UUID for IDs.
let currentId = members.length;

const listMembers = () => members;

const getMemberById = (id) => members.find(m => m.id === parseInt(id));

const createMember = (memberData) => {
    currentId += 1;
    const newMember = { id: currentId, ...memberData };
    members.push(newMember);
    return newMember;
};

const updateMember = (id, updatedData) => {
    const memberIndex = members.findIndex(m => m.id === parseInt(id));
    if (memberIndex === -1) {
        return null;
    }
    members[memberIndex] = { ...members[memberIndex], ...updatedData };
    return members[memberIndex];
};

const deleteMember = (id) => {
    const memberIndex = members.findIndex(m => m.id === parseInt(id));
    if (memberIndex === -1) {
        return null;
    }
    const [deletedMember] = members.splice(memberIndex, 1);
    return deletedMember;
};


module.exports = {
    listMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember
};