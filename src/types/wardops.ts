// WardOps Data Models

export type AssetType = 'bed' | 'wheelchair' | 'iv_pump' | 'oxygen_tank' | 'monitor';

export type AssetState = 'in_use' | 'idle_ready' | 'idle_too_long' | 'missing' | 'dirty' | 'broken';

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  roomId: string | null;
  isRental: boolean;
  state: AssetState;
  stateLabel: string;
  idleMinutes: number;
  utilizationScore: number;
}

export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskAction = 'return_rental' | 'move_asset' | 'clean_asset' | 'repair_asset';
export type TaskStatus = 'active' | 'done' | 'dismissed';

export interface Task {
  taskId: string;
  priority: TaskPriority;
  assetId: string;
  roomId: string | null;
  action: TaskAction;
  title: string;
  reason: string;
  status: TaskStatus;
  createdAt: Date;
}

export interface RoomReadiness {
  roomId: string;
  roomName: string;
  requiredAssets: AssetType[];
  hasAllRequired: boolean;
  missing: string[];
  extra: string[];
  readinessScore: number;
}

export interface User {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  isOnline: boolean;
}

export interface AgentReasoning {
  agentName: string;
  decision: string;
  reasoning: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
