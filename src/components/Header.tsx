import { NotificationCenter } from './NotificationCenter';
import { Notification } from '@/types/notifications';

interface HeaderProps {
  notifications: Notification[];
  onNotificationRead: (id: string) => void;
  onNotificationDismiss: (id: string) => void;
  onNotificationAction?: (actionId: string, notification: Notification) => void;
}

export function Header({
  notifications,
  onNotificationRead,
  onNotificationDismiss,
  onNotificationAction,
}: HeaderProps) {
  const criticalCount = notifications.filter(
    n => n.status === 'unread' && n.priority === 'critical'
  ).length;
  const highCount = notifications.filter(
    n => n.status === 'unread' && n.priority === 'high'
  ).length;

  return (
    <div className="h-14 border-b border-border bg-bg-secondary flex items-center justify-between px-6">
      <div className="flex items-center gap-6">
        <div>
          <h1 className="text-lg font-bold text-text-primary">Ward 101</h1>
          <p className="text-xs text-text-tertiary">Active Monitoring</p>
        </div>
        
        {(criticalCount > 0 || highCount > 0) && (
          <div className="flex items-center gap-2">
            {criticalCount > 0 && (
              <span className="px-2 py-1 bg-accent-red/20 text-accent-red text-xs font-bold rounded border border-accent-red/30">
                {criticalCount} Critical
              </span>
            )}
            {highCount > 0 && (
              <span className="px-2 py-1 bg-accent-yellow/20 text-accent-yellow text-xs font-bold rounded border border-accent-yellow/30">
                {highCount} High Priority
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <NotificationCenter
          notifications={notifications}
          onNotificationRead={onNotificationRead}
          onNotificationDismiss={onNotificationDismiss}
          onNotificationAction={onNotificationAction}
        />
      </div>
    </div>
  );
}
