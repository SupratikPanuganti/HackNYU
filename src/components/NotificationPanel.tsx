import React, { useState } from 'react';
import { Bell, ChevronDown, ChevronUp, X, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { Notification } from '@/types/notifications';
import { Button } from '@/components/ui/button';

interface NotificationPanelProps {
  notifications: Notification[];
  onNotificationRead: (id: string) => void;
  onNotificationDismiss: (id: string) => void;
  onNotificationAction?: (actionId: string, notification: Notification) => void;
}

const priorityConfig = {
  critical: {
    icon: AlertTriangle,
    color: 'text-accent-red',
    bgColor: 'bg-accent-red/10',
    borderColor: 'border-accent-red/30',
  },
  high: {
    icon: AlertCircle,
    color: 'text-accent-yellow',
    bgColor: 'bg-accent-yellow/10',
    borderColor: 'border-accent-yellow/30',
  },
  medium: {
    icon: Info,
    color: 'text-accent-blue',
    bgColor: 'bg-accent-blue/10',
    borderColor: 'border-accent-blue/30',
  },
  low: {
    icon: Info,
    color: 'text-text-tertiary',
    bgColor: 'bg-bg-tertiary/50',
    borderColor: 'border-border',
  },
};

export function NotificationPanel({
  notifications,
  onNotificationRead,
  onNotificationDismiss,
  onNotificationAction,
}: NotificationPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const unreadCount = notifications.filter(n => n.status === 'unread').length;
  const sortedNotifications = [...notifications].sort((a, b) => 
    b.timestamp.getTime() - a.timestamp.getTime()
  ).slice(0, 5); // Show only top 5

  const formatTimestamp = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="glass-panel rounded-lg overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-bg-tertiary/30 transition-smooth min-w-0"
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <Bell className="h-4 w-4 text-accent-cyan flex-shrink-0" />
          <div className="text-left min-w-0 flex-1">
            <h3 className="text-sm font-bold text-text-primary truncate">Notifications</h3>
            <p className="text-xs text-text-tertiary whitespace-nowrap">
              {unreadCount} unread
            </p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-text-tertiary flex-shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-text-tertiary flex-shrink-0" />
        )}
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="border-t border-border">
          <div className="max-h-[400px] overflow-y-auto">
            <div className="p-2 space-y-2">
              {sortedNotifications.map(notification => {
                const config = priorityConfig[notification.priority];
                const Icon = config.icon;

                return (
                  <div
                    key={notification.id}
                    onClick={() => {
                      if (notification.status === 'unread') {
                        onNotificationRead(notification.id);
                      }
                    }}
                    className={`
                      p-3 rounded-lg border cursor-pointer transition-smooth
                      ${notification.status === 'unread' 
                        ? `${config.bgColor} ${config.borderColor}` 
                        : 'bg-bg-tertiary/30 border-border/50'
                      }
                      hover:scale-[1.02]
                    `}
                  >
                    <div className="flex items-start gap-2">
                      <Icon className={`h-3 w-3 mt-0.5 flex-shrink-0 ${config.color}`} />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className={`text-xs font-bold break-words ${
                            notification.status === 'unread' 
                              ? 'text-text-primary' 
                              : 'text-text-secondary'
                          }`}>
                            {notification.title}
                          </h4>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onNotificationDismiss(notification.id);
                            }}
                            className="text-text-tertiary hover:text-accent-red transition-smooth flex-shrink-0"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                        
                        <p className="text-xs text-text-secondary mb-2 break-words">
                          {notification.message}
                        </p>

                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="text-[10px] text-text-tertiary whitespace-nowrap">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          
                          {notification.actionLabel && notification.actionId && (
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                onNotificationAction?.(notification.actionId!, notification);
                              }}
                              className={`h-5 px-2 text-[10px] ${config.color} bg-transparent hover:${config.bgColor} border ${config.borderColor} whitespace-nowrap`}
                            >
                              {notification.actionLabel}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {sortedNotifications.length === 0 && (
                <div className="py-8 text-center">
                  <Bell className="h-8 w-8 text-text-tertiary mx-auto mb-2 opacity-50" />
                  <p className="text-xs text-text-secondary">No notifications</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
