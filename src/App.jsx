import React, { useState, useEffect } from 'react';
import { User, Users, Calendar, ClipboardList, Wrench, LogOut, PlusCircle, AlertCircle, Trash2, Edit, X, ArrowLeft, Check, UploadCloud } from 'lucide-react';
import LoginScreen from './components/LoginScreen';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Modal from './components/Modal';
import AddSquadForm from './components/AddSquadForm';
import AddEquipmentForm from './components/AddEquipmentForm';
import ReportDamageForm from './components/ReportDamageForm';
import ImportCSVModal from './components/ImportCSVModal';
import AthleteProfile from './components/AthleteProfile';

// --- BRANDING & ASSETS ---
const wrcLogo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARAAAADDCAMAAACfF+3BAAAAUVBMVEX////zgDPzgDPzgDPzgDPzgDPzgDPzgDPzgDPzgDPzgDPzgDPzgDPzgDPzgDPzgDPzgDPzgDPzgDPzgDPzgDPzgDPzgDPzgDPzgDPzgDPzgDPzgDPzgDPzgDPzgDPzgDPzgDM3z/wOAAAAF3RSTlMAESJdZgEV3d3d3d3d3d3d3d3d3dU3ZtUAAA4ZSURBVHja7J3/kps1GMWvCEa0bHqyLff/v3N8ZJLbWd0z07rXG8z3x2eOkbgydSo1k0wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACA0iSTySSs+20O+H9Bv+p3u+S095c+8D5kL/s9/XbX59H7+p1i6j+lC5j12x2z/5i/3fV5vj2+vP61X4u8D5/f1+s2Lz3X71z6u92K7Nf63d0c39f1/W6/3v7l7/f73e7+6j9s75/fP99c/+q/sH22v/z+t3v5/Uv+Lp/fP99e//rX/+X3j2l/sP/l9z/d7X63t/+L7/+7l/fH9/fP/1//+lf/+vf/+rf//f3P//r//u/v3//6//7v75//9a///f3/7+9//ev//d///v75//3f3///9///v//7++f/t3///+tf//v73/t7+//7e9//e/vr3//7+9//+vvf/3r//vf//r//v/l73/9//7v77/8/r///v37P5P4/e7/7/f/tP9vj//9v7/+l/b/+79/+sH+/j+lf38e4N9/+9M=";

const branding = {
  colors: {
    primary: '#c9151e', // Scarlet Red
    secondary: '#000000', // Black
    light: '#ffffff', // White
    gray: '#f3f4f6', // Light gray background
    darkGray: '#374151',
  },
  logo: wrcLogo,
};

// --- MOCK DATA (Simulates a database) ---
const mockAthletes = [
    { id: 1, name: 'Mike Anderson', side: 'Port', weight: '190 lbs', '2k': '6:10', squadId: 1, awayDates: ['2025-10-25'] },
    { id: 2, name: 'Sarah Williams', side: 'Starboard', weight: '155 lbs', '2k': '7:20', squadId: 1 },
    { id: 3, name: 'David Chen', side: 'Port', weight: '185 lbs', '2k': '6:15', squadId: 1 },
    { id: 4, name: 'Emily Rodriguez', side: 'Starboard', weight: '160 lbs', '2k': '7:25', squadId: 1 },
    { id: 5, name: 'Chris Thompson', side: 'Port', weight: '195 lbs', '2k': '6:08', squadId: 1 },
    { id: 6, name: 'Jessica Miller', side: 'Starboard', weight: '150 lbs', '2k': '7:18', squadId: 1 },
    { id: 7, name: 'Kevin Lee', side: 'Port', weight: '188 lbs', '2k': '6:12', squadId: 1 },
    { id: 8, name: 'Laura Martinez', side: 'Starboard', weight: '158 lbs', '2k': '7:22', squadId: 1 },
    { id: 9, name: 'James Wilson (Cox)', side: 'N/A', weight: '125 lbs', '2k': 'N/A', squadId: 1 },
    { id: 10, name: 'Olivia Brown', side: 'Port', weight: '145 lbs', '2k': '7:40', squadId: 2, awayDates: ['2025-10-22', '2025-10-23'] },
    { id: 11, name: 'Sophia Garcia', side: 'Starboard', weight: '148 lbs', '2k': '7:45', squadId: 2 },
    { id: 12, name: 'Isabella Johnson', side: 'Port', weight: '152 lbs', '2k': '7:38', squadId: 2 },
    { id: 13, name: 'Mia Davis', side: 'Starboard', weight: '147 lbs', '2k': '7:42', squadId: 2 },
    { id: 14, name: 'Ethan Moore', side: 'Port', weight: '165 lbs', '2k': '6:40', squadId: 3 },
    { id: 15, name: 'Liam Taylor', side: 'Starboard', weight: '168 lbs', '2k': '6:38', squadId: 3 },
    { id: 16, name: 'Noah Clark', side: 'Port', weight: '170 lbs', '2k': '6:35', squadId: 3 },
    { id: 17, name: 'Lucas White', side: 'Starboard', weight: '166 lbs', '2k': '6:42', squadId: 3 },
];

const mockSquads = [
  { id: 1, name: 'Men\'s Senior Squad', coach: 'John Doe' },
  { id: 2, name: 'Women\'s Novice Squad', coach: 'Jane Smith' },
  { id: 3, name: 'Men\'s Development Squad', coach: 'Peter Jones' },
];

const mockEquipment = [
    { id: 1, name: 'Vespoli 8+ "The Eagle"', type: 'Eight (8+)', status: 'Available' },
    { id: 2, name: 'Hudson 4x "The Shark"', type: 'Quad (4x)', status: 'In Repair' },
    { id: 3, name: 'Pocock 1x "Solo"', type: 'Single (1x)', status: 'Available' },
    { id: 4, name: 'Empacher 4- "The Bullet"', type: 'Four (4-)', status: 'Available' },
];

const mockDamageReports = [
    { id: 1, equipmentId: 2, equipmentName: 'Hudson 4x "The Shark"', report: 'Bent rigger on bow seat.', reportedBy: 'Mike Anderson', date: '2025-10-15', status: 'Pending' },
];

const mockSchedule = [
    { id: 1, squadId: 1, title: 'Men\'s Senior Outing', date: '2025-10-21', time: '06:00 AM', attendance: { 1: 'present', 2: 'present', 3: 'absent', 4: 'present', 5: 'present', 6: 'late', 7: 'present', 8: 'present', 9: 'present' } },
    { id: 2, squadId: 2, title: 'Women\'s Novice Outing', date: '2025-10-22', time: '07:00 AM', attendance: {} },
    { id: 3, squadId: 3, title: 'Men\'s Dev Outing', date: '2025-10-22', time: '05:30 PM', attendance: {} },
];

const mockLineups = [
    { id: 1, name: 'Saturday Race Piece', date: '2025-10-25', boat: 'Vespoli 8+ "The Eagle"', lineup: { cox: 9, 8: 5, 7: 3, 6: 1, 5: 7, 4: 2, 3: 4, 2: 6, 1: 8 } },
];

// --- MAIN APP COMPONENT ---
export default function App() {
  // --- STATE MANAGEMENT ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');

  // Data state
  const [squads, setSquads] = useState(mockSquads);
  const [athletes, setAthletes] = useState(mockAthletes);
  const [equipment, setEquipment] = useState(mockEquipment);
  const [damageReports, setDamageReports] = useState(mockDamageReports);
  const [schedule, setSchedule] = useState(mockSchedule);
  const [lineups, setLineups] = useState(mockLineups);

  // UI State
  const [modal, setModal] = useState({ open: false, type: '', data: null }); // { open, type, data }
  const [viewingAthlete, setViewingAthlete] = useState(null);

  // --- HANDLERS ---
  const openModal = (type, data = null) => setModal({ open: true, type, data });
  const closeModal = () => setModal({ open: false, type: '', data: null });

  const handleCreateSquad = (squadName, coachName) => {
    const newSquad = {
      id: Date.now(),
      name: squadName,
      coach: coachName,
    };
    setSquads([...squads, newSquad]);
    closeModal();
  };

  const handleAddEquipment = (name, type) => {
    const newItem = { id: Date.now(), name, type, status: 'Available' };
    setEquipment([...equipment, newItem]);
    closeModal();
  };

  const handleReportDamage = (equipmentId, report) => {
    const equipmentItem = equipment.find(e => e.id === equipmentId);
    const newReport = {
        id: Date.now(),
        equipmentId,
        equipmentName: equipmentItem.name,
        report,
        reportedBy: 'Coach',
        date: new Date().toISOString().split('T')[0],
        status: 'Pending',
    };
    setDamageReports([...damageReports, newReport]);
    setEquipment(equipment.map(e => e.id === equipmentId ? { ...e, status: 'In Repair' } : e));
    closeModal();
  };

  // --- RENDER LOGIC ---
  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} branding={branding} />;
  }

  if (viewingAthlete) {
    return <AthleteProfile athlete={viewingAthlete} onBack={() => setViewingAthlete(null)} squads={squads} branding={branding} />;
  }

  return (
    <div className="min-h-screen font-sans text-gray-800" style={{ backgroundColor: branding.colors.gray }}>
      <Header onLogout={() => setIsLoggedIn(false)} branding={branding} />
      <div className="flex">
        <Sidebar activeView={activeView} setActiveView={setActiveView} branding={branding} />
        <MainContent
          activeView={activeView}
          squads={squads}
          athletes={athletes}
          equipment={equipment}
          damageReports={damageReports}
          schedule={schedule}
          lineups={lineups}
          setAthletes={setAthletes}
          setSquads={setSquads}
          openModal={openModal}
          onViewAthlete={setViewingAthlete}
          branding={branding}
        />
      </div>
      {modal.open && (
        <Modal onClose={closeModal}>
          {modal.type === 'addSquad' && <AddSquadForm onSubmit={handleCreateSquad} onCancel={closeModal} branding={branding} />}
          {modal.type === 'addEquipment' && <AddEquipmentForm onSubmit={handleAddEquipment} onCancel={closeModal} branding={branding} />}
          {modal.type === 'reportDamage' && <ReportDamageForm equipment={equipment} onSubmit={handleReportDamage} onCancel={closeModal} branding={branding} />}
          {modal.type === 'importCSV' && <ImportCSVModal onCancel={closeModal} branding={branding} />}
        </Modal>
      )}
    </div>
  );
}