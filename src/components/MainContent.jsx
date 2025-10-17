import React from 'react';
import TeamManagement from './TeamManagement';
import ScheduleView from './ScheduleView';
import LineupsView from './LineupsView';
import EquipmentManagement from './EquipmentManagement';

const MainContent = (props) => {
  return (
    <main className="flex-1 p-8 overflow-y-auto">
      {props.activeView === 'dashboard' && <TeamManagement {...props} />}
      {props.activeView === 'schedule' && <ScheduleView {...props} />}
      {props.activeView === 'lineups' && <LineupsView {...props} />}
      {props.activeView === 'equipment' && <EquipmentManagement {...props} />}
    </main>
  );
};

export default MainContent;