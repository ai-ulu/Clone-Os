export const THEMES = {
  dark: {
    primary: '#000000',
    secondary: '#111111',
    accent: '#00ffff',
    borderRadius: '32px',
    fontFamily: 'Inter, system-ui, sans-serif',
    windowBg: 'bg-slate-900/80',
    glassBlur: 'backdrop-blur-3xl'
  }
};

export const INITIAL_WINDOWS = [
  { id: 'terminal', title: 'Agent Terminal', iconName: 'Terminal', component: 'AgentTerminal' },
  { id: 'chat', title: 'Neural Chat', iconName: 'MessageSquare', component: 'ChatApp' },
  { id: 'code', title: 'Code Workspace', iconName: 'Code', component: 'CodeWorkspace' },
  { id: 'social', title: 'Social Hub', iconName: 'Share2', component: 'SocialHub' }
];
