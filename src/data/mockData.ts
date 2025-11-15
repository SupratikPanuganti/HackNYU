import { Asset, Task, RoomReadiness, User, ChatMessage } from '@/types/wardops';

export const mockAssets: Asset[] = [
  {
    id: 'bed-101',
    name: 'Bed 101',
    type: 'bed',
    roomId: 'room-101',
    isRental: false,
    state: 'in_use',
    stateLabel: 'In Use',
    idleMinutes: 0,
    utilizationScore: 85,
  },
  {
    id: 'wheelchair-101',
    name: 'Wheelchair 101',
    type: 'wheelchair',
    roomId: null,
    isRental: false,
    state: 'missing',
    stateLabel: 'Missing from Room 101',
    idleMinutes: 0,
    utilizationScore: 92,
  },
  {
    id: 'iv-pump-a',
    name: 'IV Pump A',
    type: 'iv_pump',
    roomId: 'room-101',
    isRental: true,
    state: 'idle_too_long',
    stateLabel: 'Idle 3h',
    idleMinutes: 180,
    utilizationScore: 10,
  },
  {
    id: 'iv-pump-b',
    name: 'IV Pump B',
    type: 'iv_pump',
    roomId: 'room-102',
    isRental: false,
    state: 'idle_ready',
    stateLabel: 'Ready',
    idleMinutes: 30,
    utilizationScore: 45,
  },
  {
    id: 'oxygen-tank-a',
    name: 'Oxygen Tank A',
    type: 'oxygen_tank',
    roomId: 'room-102',
    isRental: false,
    state: 'in_use',
    stateLabel: 'In Use',
    idleMinutes: 0,
    utilizationScore: 78,
  },
  {
    id: 'bed-102',
    name: 'Bed 102',
    type: 'bed',
    roomId: 'room-102',
    isRental: false,
    state: 'idle_ready',
    stateLabel: 'Ready',
    idleMinutes: 45,
    utilizationScore: 60,
  },
];

export const mockTasks: Task[] = [
  {
    taskId: 'task-1',
    priority: 'high',
    assetId: 'iv-pump-a',
    roomId: 'room-101',
    action: 'return_rental',
    title: 'Return IV Pump A',
    reason: 'Rented pump idle 3h; 2 other pumps available',
    status: 'active',
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    taskId: 'task-2',
    priority: 'medium',
    assetId: 'wheelchair-101',
    roomId: 'room-101',
    action: 'move_asset',
    title: 'Move Wheelchair 101 to Room 101',
    reason: 'Room readiness gap - wheelchair required',
    status: 'active',
    createdAt: new Date(Date.now() - 1000 * 60 * 45),
  },
  {
    taskId: 'task-3',
    priority: 'medium',
    assetId: 'bed-101',
    roomId: 'room-101',
    action: 'clean_asset',
    title: 'Clean Bed 101',
    reason: 'Bed marked dirty after discharge',
    status: 'active',
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
  },
];

export const mockRoomReadiness: RoomReadiness[] = [
  {
    roomId: 'room-101',
    roomName: 'Room 101',
    requiredAssets: ['bed', 'wheelchair', 'iv_pump'],
    hasAllRequired: false,
    missing: ['Wheelchair'],
    extra: ['IV Pump (rental - should return)'],
    readinessScore: 72,
  },
  {
    roomId: 'room-102',
    roomName: 'Room 102',
    requiredAssets: ['bed', 'oxygen_tank'],
    hasAllRequired: true,
    missing: [],
    extra: [],
    readinessScore: 95,
  },
];

export const mockUser: User = {
  id: 'user-1',
  name: 'Alex Rivera',
  role: 'Charge Nurse',
  isOnline: true,
};

export const mockChatHistory: ChatMessage[] = [
  {
    id: 'msg-1',
    role: 'user',
    content: 'What are the highest priority tasks this shift?',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: 'msg-2',
    role: 'assistant',
    content: `Here are your top priorities for this shift:

1. **Return IV Pump A** (High Priority)
   • Rental idle for 3 hours
   • 2 other pumps available in the ward
   • Estimated savings: $45/day

2. **Move Wheelchair 101 to Room 101** (Medium Priority)
   • Room readiness gap detected
   • Required for patient admission
   
3. **Clean Bed 101** (Medium Priority)
   • Marked dirty after discharge
   • Blocks room turnaround`,
    timestamp: new Date(Date.now() - 1000 * 60 * 15 + 5000),
  },
];
