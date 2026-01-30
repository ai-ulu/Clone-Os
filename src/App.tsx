import React from 'react';
import { DashboardShell, ErrorBoundary } from './components';
import { CloneProfile } from './types';

const mockProfile: CloneProfile = {
  id: '1',
  name: 'Alpha One',
  role: 'System Architect',
  specialization: 'architect',
  personality: 'Strategic, analytical, and highly efficient.',
  background: 'Core developer of the Neural OS Mesh Network.',
  speakingStyle: 'Professional and concise.',
  hobbies: ['Quantum Computing', 'High-Frequency Trading', 'Distributed Systems']
};

function App() {
  return (
    <ErrorBoundary>
      <div className="h-screen w-full bg-black">
        <DashboardShell profile={mockProfile} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
