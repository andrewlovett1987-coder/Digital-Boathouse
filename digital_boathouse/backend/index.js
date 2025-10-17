require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const { google } = require('googleapis');

const app = express();
const port = process.env.PORT || 3001;

// --- Middleware ---
app.use(cors({
    origin: 'http://localhost:3000', // Assuming frontend runs on port 3000
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET || 'supersecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// --- Google OAuth2 Client Setup ---
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3001/auth/google/callback'
);

// --- Routes ---

// 1. Redirect to Google's consent screen
app.get('/auth/google', (req, res) => {
    const scopes = [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/calendar.events' // As per PRD
    ];

    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes
    });

    res.redirect(url);
});

// 2. Handle the callback from Google
app.get('/auth/google/callback', async (req, res) => {
    const { code } = req.query;

    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        // Store tokens in session
        req.session.tokens = tokens;

        // Fetch user profile
        const oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2'
        });
        const { data } = await oauth2.userinfo.get();

        // Here, you would typically find or create a user in your database
        // For now, we'll just store the profile in the session
        req.session.user = {
            googleId: data.id,
            name: data.name,
            email: data.email,
            picture: data.picture,
        };

        // Redirect to the frontend application
        res.redirect('http://localhost:3000/dashboard'); // Or wherever your frontend is hosted

    } catch (error) {
        console.error('Error during Google OAuth callback:', error);
        res.status(500).send('Authentication failed');
    }
});

// 3. Get user data (for frontend to check if logged in)
app.get('/api/me', (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
});

// 4. Logout
app.post('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Could not log out.');
        }
        res.clearCookie('connect.sid'); // The default session cookie name
        res.status(200).send('Logged out');
    });
});


const memberDB = require('./data/members');

// --- Member API Routes ---

// GET /api/members - List all members
app.get('/api/members', (req, res) => {
    // In a real app, add role-based access control here
    res.json(memberDB.listMembers());
});

// GET /api/members/:id - Get a single member by ID
app.get('/api/members/:id', (req, res) => {
    const member = memberDB.getMemberById(req.params.id);
    if (member) {
        res.json(member);
    } else {
        res.status(404).send('Member not found');
    }
});

// POST /api/members - Create a new member
app.post('/api/members', (req, res) => {
    const newMember = memberDB.createMember(req.body);
    res.status(201).json(newMember);
});

// PUT /api/members/:id - Update an existing member
app.put('/api/members/:id', (req, res) => {
    const updatedMember = memberDB.updateMember(req.params.id, req.body);
    if (updatedMember) {
        res.json(updatedMember);
    } else {
        res.status(404).send('Member not found');
    }
});

// DELETE /api/members/:id - Delete a member
app.delete('/api/members/:id', (req, res) => {
    const deletedMember = memberDB.deleteMember(req.params.id);
    if (deletedMember) {
        res.status(200).json(deletedMember);
    } else {
        res.status(404).send('Member not found');
    }
});


const assetDB = require('./data/assets');

// --- Asset API Routes ---

// GET /api/assets - List all assets
app.get('/api/assets', (req, res) => {
    res.json(assetDB.listAssets());
});

// POST /api/assets/:id/report - Report damage to an asset
app.post('/api/assets/:id/report', (req, res) => {
    const { reportedBy, description, photoUrl } = req.body;
    if (!reportedBy || !description) {
        return res.status(400).send('Missing required fields: reportedBy, description');
    }
    const updatedAsset = assetDB.reportDamage(req.params.id, { reportedBy, description, photoUrl });
    if (updatedAsset) {
        res.status(201).json(updatedAsset);
    } else {
        res.status(404).send('Asset not found');
    }
});

// PUT /api/assets/:assetId/repairs/:reportId/resolve - Mark a repair as complete
app.put('/api/assets/:assetId/repairs/:reportId/resolve', (req, res) => {
    const updatedAsset = assetDB.resolveRepair(req.params.assetId, req.params.reportId);
    if (updatedAsset) {
        res.json(updatedAsset);
    } else {
        res.status(404).send('Asset or repair report not found');
    }
});


// Placeholder for database connection
function connectToDatabase() {
    console.log('Attempting to connect to the database...');
    // In a real application, you would connect to a relational database here
    // e.g., using Sequelize, TypeORM, or a direct driver like 'pg' or 'mysql2'
    console.log('Database connection placeholder established.');
}


app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
    connectToDatabase();
});

module.exports = app;