import React from 'react';
import { AgentTerminal } from './components';
import { CloneProfile } from './types';

const mockProfile: CloneProfile = {
  id: '1',
  name: 'Enterprise Agent',
  role: 'Architect',
  specialization: 'architect',
  personality: 'Professional and efficient',
  background: 'Enterprise system design',
  speakingStyle: 'Formal',
  hobbies: ['Optimization', 'System Design']
};

function App() {
  return (
    <div className="h-screen w-full bg-black">
      <AgentTerminal
        profile={mockProfile}
        onPushCode={() => {}}
        onNotify={() => {}}
      />
    </div>
  );
}

export default App;
