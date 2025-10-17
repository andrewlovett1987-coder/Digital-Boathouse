import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// --- Page Components (will be created in separate files) ---

const HomePage = () => {
    const handleLogin = () => {
        // Redirect to the backend's Google authentication route
        window.location.href = 'http://localhost:3001/auth/google';
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1>Worcester Rowing Club</h1>
                <p>Digital Boathouse</p>
            </header>
            <main style={styles.main}>
                <h2>Welcome</h2>
                <p>Please sign in to continue.</p>
                <button onClick={handleLogin} style={styles.button}>
                    Sign In with Google
                </button>
            </main>
        </div>
    );
};

import MemberList from './components/MemberList';
import AssetList from './components/AssetList';
import { useState, useEffect } from 'react';

const DashboardPage = () => {
    const [members, setMembers] = useState([]);
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [membersResponse, assetsResponse] = await Promise.all([
                    fetch('http://localhost:3001/api/members'),
                    fetch('http://localhost:3001/api/assets')
                ]);

                if (!membersResponse.ok || !assetsResponse.ok) {
                    throw new Error('Failed to fetch data from the server.');
                }

                const membersData = await membersResponse.json();
                const assetsData = await assetsResponse.json();

                setMembers(membersData);
                setAssets(assetsData);

            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <header style={styles.header}>
                <h1>Worcester Rowing Club</h1>
                <p style={{color: '#D4AF37'}}>Admin Dashboard</p>
            </header>
            <main style={{...styles.main, padding: '20px 40px', backgroundColor: '#f7fafc'}}>
                <div style={{marginBottom: '40px'}}>
                    <h2>Member Management</h2>
                    <p>A central, searchable member database.</p>
                    {loading && <p>Loading members...</p>}
                    {error && <p style={{color: 'red'}}>Error: {error}</p>}
                    {!loading && !error && <MemberList members={members} />}
                </div>

                <hr style={{border: 'none', borderTop: '2px solid #eee', margin: '40px 0'}} />

                <div>
                    <h2>Asset & Fleet Management</h2>
                    <p>A live inventory of club boats and their status.</p>
                     {loading && <p>Loading assets...</p>}
                     {error && <p style={{color: 'red'}}>Error: {error}</p>}
                     {!loading && !error && <AssetList assets={assets} />}
                </div>
            </main>
        </div>
    );
};

const NotFoundPage = () => (
    <div style={styles.container}>
        <main style={styles.main}>
            <h2>404 - Not Found</h2>
            <p>The page you are looking for does not exist.</p>
        </main>
    </div>
);


// --- Main App Component ---

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

// --- Basic Styles ---

const styles = {
    container: {
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        color: '#333',
    },
    header: {
        backgroundColor: '#002147', // WRC Dark Blue
        color: 'white',
        padding: '20px',
    },
    main: {
        padding: '50px 20px',
    },
    button: {
        backgroundColor: '#D4AF37', // WRC Gold
        color: '#002147',
        border: 'none',
        padding: '15px 30px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '5px',
        marginTop: '20px',
    }
};


export default App;