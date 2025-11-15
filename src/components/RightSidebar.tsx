import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { WardMap } from './WardMap';
import { RoomDetails } from './RoomDetails';
import { TaskQueue } from './TaskQueue';
import { NotificationPanel } from './NotificationPanel';
import { Asset, RoomReadiness, Task } from '@/types/wardops';
import { Notification } from '@/types/notifications';
import { Button } from './ui/button';

interface RightSidebarProps {
  activeTab: string;
  assets: Asset[];
  roomReadiness: RoomReadiness[];
  tasks: Task[];
  notifications: Notification[];
  selectedRoomId: string | null;
  onRoomSelect: (roomId: string) => void;
  onAssetSelect: (assetId: string) => void;
  onTaskComplete: (taskId: string) => void;
  onTaskDismiss: (taskId: string) => void;
  onNotificationRead: (id: string) => void;
  onNotificationDismiss: (id: string) => void;
  onNotificationAction?: (actionId: string, notification: Notification) => void;
}

export function RightSidebar({
  activeTab,
  assets,
  roomReadiness,
  tasks,
  notifications,
  selectedRoomId,
  onRoomSelect,
  onAssetSelect,
  onTaskComplete,
  onTaskDismiss,
  onNotificationRead,
  onNotificationDismiss,
  onNotificationAction,
}: RightSidebarProps) {
  const [isManuallyCollapsed, setIsManuallyCollapsed] = useState(false);

  const selectedRoomReadiness = roomReadiness.find(
    r => r.roomId === selectedRoomId
  ) || null;

  // Show collapsed state when manually collapsed
  if (isManuallyCollapsed) {
    return (
      <div className="w-full h-full border-l border-border bg-bg-secondary flex items-center justify-center p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsManuallyCollapsed(false)}
          className="text-text-tertiary hover:text-text-primary rotate-180"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full h-full border-l border-border bg-bg-secondary flex flex-col">
      {/* Collapse Button */}
      <div className="border-b border-border p-3 flex items-center justify-between">
        <h3 className="text-sm font-bold text-text-primary">
          {activeTab === 'ask' ? 'Ward Overview' : 'Details'}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsManuallyCollapsed(true)}
          className="text-text-tertiary hover:text-text-primary"
          title="Collapse sidebar"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Content based on active tab */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {activeTab === 'ask' && (
          <div className="flex flex-col h-full">
            {/* Ward Map */}
            <div className="flex-shrink-0">
              <WardMap
                assets={assets}
                roomReadiness={roomReadiness}
                onRoomSelect={onRoomSelect}
                onAssetSelect={onAssetSelect}
                selectedRoomId={selectedRoomId}
              />
            </div>

            {/* Collapsible Sections */}
            <div className="p-4 space-y-4">
              {/* Notifications Panel */}
              <NotificationPanel
                notifications={notifications}
                onNotificationRead={onNotificationRead}
                onNotificationDismiss={onNotificationDismiss}
                onNotificationAction={onNotificationAction}
              />

              {/* Room Details */}
              {selectedRoomReadiness && (
                <RoomDetails 
                  roomReadiness={selectedRoomReadiness}
                  tasks={tasks}
                />
              )}

              {/* Task Queue */}
              <TaskQueue 
                tasks={tasks}
                onTaskComplete={onTaskComplete}
                onTaskDismiss={onTaskDismiss}
              />
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="p-6">
            <div className="glass-panel rounded-lg p-6">
              <p className="text-sm text-text-secondary">Dashboard metrics will appear here</p>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="p-6">
            <div className="glass-panel rounded-lg p-6">
              <p className="text-sm text-text-secondary">Inventory details will appear here</p>
            </div>
          </div>
        )}

        {activeTab === 'locations' && (
          <div className="p-6">
            <WardMap
              assets={assets}
              roomReadiness={roomReadiness}
              onRoomSelect={onRoomSelect}
              onAssetSelect={onAssetSelect}
              selectedRoomId={selectedRoomId}
            />
            <div className="mt-4">
              {selectedRoomReadiness && (
                <RoomDetails 
                  roomReadiness={selectedRoomReadiness}
                  tasks={tasks}
                />
              )}
            </div>
          </div>
        )}

        {activeTab === 'maintenance' && (
          <div className="p-6">
            <TaskQueue 
              tasks={tasks.filter(t => t.action === 'clean_asset' || t.action === 'repair_asset')}
              onTaskComplete={onTaskComplete}
              onTaskDismiss={onTaskDismiss}
            />
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="p-6">
            <div className="glass-panel rounded-lg p-6">
              <p className="text-sm text-text-secondary">Report data will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
