import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ChatInterface } from '@/components/ChatInterface';
import { RightSidebar } from '@/components/RightSidebar';
import {
  mockUser,
  mockAssets,
  mockTasks,
  mockRoomReadiness,
  mockChatHistory,
} from '@/data/mockData';
import { mockNotifications } from '@/data/mockNotifications';
import { Task } from '@/types/wardops';
import { Notification } from '@/types/notifications';
import { toast } from 'sonner';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

const Index = () => {
  const [activeTab, setActiveTab] = useState('ask');
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>('room-101');
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const handleTaskComplete = (taskId: string) => {
    setTasks(tasks.map(t => 
      t.taskId === taskId ? { ...t, status: 'done' as const } : t
    ));
    toast.success('Task marked as complete');
  };

  const handleTaskDismiss = (taskId: string) => {
    setTasks(tasks.map(t => 
      t.taskId === taskId ? { ...t, status: 'dismissed' as const } : t
    ));
  };

  const handleNotificationRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, status: 'read' as const } : n
    ));
  };

  const handleNotificationDismiss = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast.success('Notification dismissed');
  };

  const handleNotificationAction = (actionId: string, notification: Notification) => {
    if (notification.relatedRoomId) {
      setSelectedRoomId(notification.relatedRoomId);
    }
    toast.info(`Action triggered: ${actionId}`);
    handleNotificationRead(notification.id);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-bg-primary">
      {/* Left Sidebar */}
      <Sidebar 
        user={mockUser} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      {/* Resizable Main Content Area */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Center Column */}
        <ResizablePanel defaultSize={70} minSize={40}>
          <div className="h-full flex flex-col bg-bg-secondary overflow-y-auto">
            {activeTab === 'ask' ? (
              <ChatInterface initialMessages={mockChatHistory} />
            ) : (
              <div className="p-8 flex-1">
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
        </ResizablePanel>

        {/* Draggable Resize Handle */}
        <ResizableHandle className="w-1 bg-border hover:bg-accent-cyan transition-smooth cursor-col-resize" />

        {/* Right Sidebar - Collapsible & Resizable */}
        <ResizablePanel defaultSize={30} minSize={15} maxSize={50}>
          <RightSidebar
            activeTab={activeTab}
            assets={mockAssets}
            roomReadiness={mockRoomReadiness}
            tasks={tasks}
            notifications={notifications}
            selectedRoomId={selectedRoomId}
            onRoomSelect={setSelectedRoomId}
            onAssetSelect={(id) => console.log('Asset selected:', id)}
            onTaskComplete={handleTaskComplete}
            onTaskDismiss={handleTaskDismiss}
            onNotificationRead={handleNotificationRead}
            onNotificationDismiss={handleNotificationDismiss}
            onNotificationAction={handleNotificationAction}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Index;
