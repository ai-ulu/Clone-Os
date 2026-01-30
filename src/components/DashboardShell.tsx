
import React, { useState } from 'react';
import {
  Terminal, MessageSquare, Code, Share2,
  Settings, Brain, LayoutDashboard, Database,
  Activity, Shield, Menu, X, Bell
} from 'lucide-react';
import {
  AgentTerminal, ChatApp, CodeWorkspace,
  SocialHub, OpsConsole, KnowledgeVault
} from './';
import { CloneProfile } from '../types';

interface DashboardShellProps {
  profile: CloneProfile;
}

const DashboardShell: React.FC<DashboardShellProps> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState('terminal');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigation = [
    { id: 'terminal', name: 'Mesh Terminal', icon: Terminal, component: AgentTerminal },
    { id: 'chat', name: 'Neural Chat', icon: MessageSquare, component: ChatApp },
    { id: 'code', name: 'Code Lab', icon: Code, component: CodeWorkspace },
    { id: 'social', name: 'Social Hub', icon: Share2, component: SocialHub },
    { id: 'vault', name: 'Knowledge Vault', icon: Database, component: KnowledgeVault },
    { id: 'ops', name: 'Ops Center', icon: Activity, component: OpsConsole },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'terminal':
        return <AgentTerminal profile={profile} onPushCode={() => {}} onNotify={() => {}} />;
      case 'chat':
        return <ChatApp profile={profile} />;
      case 'code':
        return <CodeWorkspace files={[{name: 'main.py', content: '# Enterprise script'}]} setFiles={() => {}} patterns={[]} />;
      case 'social':
        return <SocialHub profile={profile} />;
      case 'vault':
        return <KnowledgeVault items={[]} onDelete={() => {}} />;
      case 'ops':
        return <OpsConsole />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-[#050507] text-slate-300 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} border-r border-white/5 bg-black/40 backdrop-blur-3xl transition-all duration-300 flex flex-col z-50`}>
        <div className="p-6 flex items-center justify-between">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-black" />
              </div>
              <span className="font-black text-white uppercase tracking-tighter text-xl italic">ClonOS</span>
            </div>
          ) : (
            <Brain className="w-8 h-8 text-cyan-500 mx-auto" />
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-white/5 rounded-lg">
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-1 mt-6">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${
                activeTab === item.id
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                  : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'
              }`}
            >
              <item.icon className={`w-5 h-5 shrink-0 ${activeTab === item.id ? 'text-cyan-400' : 'group-hover:text-slate-300'}`} />
              {sidebarOpen && <span className="text-sm font-bold tracking-tight">{item.name}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className={`flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5 ${!sidebarOpen && 'justify-center'}`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shrink-0" />
            {sidebarOpen && (
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-bold text-white truncate">{profile.name}</p>
                <p className="text-[10px] text-slate-500 truncate">{profile.role}</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 border-b border-white/5 bg-black/20 backdrop-blur-md flex items-center justify-between px-8 z-40 shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">
              {navigation.find(n => n.id === activeTab)?.name}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none">System Online</span>
            </div>

            <div className="h-4 w-px bg-white/10" />

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-500 rounded-full ring-2 ring-black" />
              </button>
              <button className="p-2 text-slate-400 hover:text-white transition-colors">
                <Shield className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-400 hover:text-white transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <section className="flex-1 overflow-hidden relative">
          <div className="absolute inset-0 bg-grid-white/[0.01] pointer-events-none" />
          <div className="h-full w-full overflow-hidden">
             {renderContent()}
          </div>
        </section>

        {/* Floating status bar (optional) */}
        <footer className="h-8 border-t border-white/5 bg-black/40 flex items-center justify-between px-8 text-[9px] font-bold uppercase tracking-widest text-slate-600 shrink-0">
          <div className="flex items-center gap-6">
            <span>Lat: 2.4ms</span>
            <span>Uptime: 99.9%</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Region: Global-X</span>
            <span className="text-cyan-500/50 italic">Neural Sync Active</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default DashboardShell;
