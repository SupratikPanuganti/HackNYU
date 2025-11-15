import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ChatInterface } from '@/components/ChatInterface';
import { WardMap } from '@/components/WardMap';
import { RoomDetails } from '@/components/RoomDetails';
import { TaskQueue } from '@/components/TaskQueue';
import {
  mockUser,
  mockAssets,
  mockTasks,
  mockRoomReadiness,
  mockChatHistory,
} from '@/data/mockData';
import { Task } from '@/types/wardops';

const Index = () => {
  const [activeTab, setActiveTab] = useState('ask');
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>('room-101');
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const handleTaskComplete = (taskId: string) => {
    setTasks(tasks.map(t => 
      t.taskId === taskId ? { ...t, status: 'done' as const } : t
    ));
  };

  const handleTaskDismiss = (taskId: string) => {
    setTasks(tasks.map(t => 
      t.taskId === taskId ? { ...t, status: 'dismissed' as const } : t
    ));
  };

  const selectedRoomReadiness = mockRoomReadiness.find(
    r => r.roomId === selectedRoomId
  ) || null;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-bg-primary">
      {/* Left Sidebar */}
      <Sidebar 
        user={mockUser} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      {/* Center Column */}
      <div className="flex-1 h-full overflow-y-auto bg-bg-secondary">
        {activeTab === 'ask' ? (
          <div className="h-full flex flex-col">
            <div className="flex-1 min-h-0">
              <ChatInterface initialMessages={mockChatHistory} />
            </div>
            <div className="border-t border-border p-6">
              <TaskQueue 
                tasks={tasks}
                onTaskComplete={handleTaskComplete}
                onTaskDismiss={handleTaskDismiss}
              />
            </div>
          </div>
        ) : (
          <div className="p-8">
            <div className="glass-panel rounded-lg p-12 text-center">
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h2>
              <p className="text-text-secondary">
                Coming soon - this feature is under development
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Right Column - Ward Map */}
      <div className="w-[600px] h-full border-l border-border bg-bg-secondary flex flex-col">
        <div className="flex-1 min-h-0">
          <WardMap
            assets={mockAssets}
            roomReadiness={mockRoomReadiness}
            onRoomSelect={setSelectedRoomId}
            onAssetSelect={(id) => console.log('Asset selected:', id)}
            selectedRoomId={selectedRoomId}
          />
        </div>
        <div className="border-t border-border p-6">
          <RoomDetails 
            roomReadiness={selectedRoomReadiness}
            tasks={tasks}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
