import React, 'react';

const MemberList = ({ members }) => {
    if (!members || members.length === 0) {
        return <p>No members found.</p>;
    }

    const tableStyle = {
        width: '100%',
        marginTop: '20px',
        borderCollapse: 'collapse',
    };

    const thStyle = {
        backgroundColor: '#002147', // WRC Dark Blue
        color: 'white',
        padding: '12px 15px',
        textAlign: 'left',
        borderBottom: '2px solid #D4AF37', // WRC Gold
    };

    const tdStyle = {
        border: '1px solid #ddd',
        padding: '8px 15px',
    };

    const trStyle = {
        borderBottom: '1px solid #ddd',
    };

    const evenRowStyle = {
        backgroundColor: '#f2f2f2',
    };


    return (
        <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>Name</th>
                        <th style={thStyle}>Email</th>
                        <th style={thStyle}>Role</th>
                        <th style={thStyle}>Squads</th>
                        <th style={thStyle}>British Rowing No.</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member, index) => (
                        <tr key={member.id} style={{ ...trStyle, ...(index % 2 === 0 ? evenRowStyle : {}) }}>
                            <td style={tdStyle}>{member.name}</td>
                            <td style={tdStyle}>{member.email}</td>
                            <td style={tdStyle}>{member.role}</td>
                            <td style={tdStyle}>{member.squads ? member.squads.join(', ') : 'N/A'}</td>
                            <td style={tdStyle}>{member.britishRowingMembershipNumber || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MemberList;