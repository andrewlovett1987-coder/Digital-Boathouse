import React from 'react';
import { Users, Calendar, ClipboardList, Wrench } from 'lucide-react';

const Sidebar = ({ activeView, setActiveView, branding }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Users },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'lineups', label: 'Lineups', icon: ClipboardList },
    { id: 'equipment', label: 'Equipment', icon: Wrench },
  ];

  return (
    <nav className="w-64 p-4 space-y-2 flex-shrink-0 min-h-[calc(100vh-72px)]" style={{ backgroundColor: branding.colors.primary, color: branding.colors.secondary }}>
      {navItems.map(item => (
        <button key={item.id} onClick={() => setActiveView(item.id)}
          className={`w-full flex items-center space-x-3 p-3 rounded-md text-left transition-colors ${activeView === item.id ? '' : 'hover:bg-gray-700'}`}
          style={activeView === item.id ? { backgroundColor: branding.colors.accent } : {}}
        >
          <item.icon className="w-5 h-5" />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Sidebar;