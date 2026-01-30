export interface CloneProfile {
  id: string;
  name: string;
  role: string;
  specialization: string;
  bio?: string;
  avatar?: string;
  personality: string;
  background: string;
  speakingStyle: string;
  hobbies: string[];
}

export interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  tags: string[];
  timestamp: Date;
  type?: string;
  url?: string;
}

export interface AgentTask {
  id: string;
  goal: string;
  status: 'pending' | 'executing' | 'completed' | 'failed';
  reasoning: string;
  agents: SubAgent[];
  sharedInsights: string[];
  subtasks: SubTask[];
  timestamp: Date;
}

export interface SubTask {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  assignedAgentId?: string;
  result?: string;
  handoff?: string;
}

export interface SubAgent {
  id: string;
  name: string;
  specialization: string;
  status: 'idle' | 'working' | 'done' | 'failed';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'agent' | 'learning';
  timestamp: Date;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'assistant' | 'system';
  text: string;
  timestamp: Date;
}

export interface SentimentData {
  score: number;
  label: string;
  trend?: string;
}

export interface SocialAccount {
  id: string;
  platform: 'Twitter' | 'Instagram' | 'LinkedIn';
  handle: string;
  bio: string;
  avatar: string;
  followers: number;
  engagementRate: string;
  strategy: string;
}

export interface Post {
  id: string;
  accountId: string;
  content: string;
  imageUrl?: string;
  timestamp: Date;
  stats: {
    likes: number;
    shares: number;
    comments: number;
  };
}

export interface LedgerEntry {
  id: string;
  type: 'THOUGHT' | 'ACTION' | 'SYSTEM';
  content: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface AppTheme {
  id?: string;
  primary: string;
  secondary: string;
  accent: string;
  borderRadius: string;
  fontFamily: string;
  windowBg: string;
  glassBlur: string;
}

export type DimensionType = 'neural' | 'quantum' | 'social' | 'code' | 'MATERIAL' | 'ZENITH' | 'ETHEREAL';

export interface NeuralPattern {
  id: string;
  pattern: string;
  strength: number;
  confidence?: number;
  trigger?: string;
  action?: string;
}

export interface SyntaxTheme {
  keyword: string;
  string: string;
  comment: string;
  number: string;
  function: string;
  background: string;
  text: string;
}

export interface CodeIssue {
  severity: 'high' | 'medium' | 'low';
  type: 'bug' | 'smell' | 'security';
  line?: number;
  description: string;
  fixSuggestion?: string;
}

export interface TestResult {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
  duration: string;
  error?: string;
}

export interface TestReport {
  summary: {
    total: number;
    passed: number;
    failed: number;
    duration: string;
  };
  results: TestResult[];
}

export interface WindowState {
  id: string;
  title: string;
  iconName: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  component: string;
}
