import React, { useState } from 'react';
import { Bell, X, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { Notification, NotificationStatus } from '@/types/notifications';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NotificationCenterProps {
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

export function NotificationCenter({
  notifications,
  onNotificationRead,
  onNotificationDismiss,
  onNotificationAction,
}: NotificationCenterProps) {
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter(n => n.status === 'unread').length;
  const sortedNotifications = [...notifications].sort((a, b) => 
    b.timestamp.getTime() - a.timestamp.getTime()
  );

  const handleNotificationClick = (notification: Notification) => {
    if (notification.status === 'unread') {
      onNotificationRead(notification.id);
    }
  };

  const formatTimestamp = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="relative p-2 rounded-lg hover:bg-bg-tertiary transition-smooth">
          <Bell className="h-5 w-5 text-text-secondary" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-accent-red rounded-full flex items-center justify-center text-[10px] font-bold text-white glow-cyan">
              {unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[400px] p-0 glass-panel border-border" 
        align="end"
        sideOffset={8}
      >
        <div className="border-b border-border p-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-text-primary">Notifications</h3>
            <p className="text-xs text-text-tertiary mt-0.5">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                notifications.forEach(n => {
                  if (n.status === 'unread') onNotificationRead(n.id);
                });
              }}
              className="text-xs text-accent-cyan hover:text-accent-cyan/80"
            >
              Mark all read
            </Button>
          )}
        </div>

        <ScrollArea className="h-[500px]">
          <div className="p-2 space-y-2">
            {sortedNotifications.map(notification => {
              const config = priorityConfig[notification.priority];
              const Icon = config.icon;

              return (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`
                    p-3 rounded-lg border cursor-pointer transition-smooth
                    ${notification.status === 'unread' 
                      ? `${config.bgColor} ${config.borderColor}` 
                      : 'bg-bg-tertiary/30 border-border/50'
                    }
                    hover:scale-[1.02]
                  `}
                >
                  <div className="flex items-start gap-3">
                    <Icon className={`h-4 w-4 mt-0.5 flex-shrink-0 ${config.color}`} />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className={`text-sm font-bold ${
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
                          className="text-text-tertiary hover:text-accent-red transition-smooth"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                      
                      <p className="text-xs text-text-secondary mb-2">
                        {notification.message}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-text-tertiary">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                        
                        {notification.actionLabel && notification.actionId && (
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNotificationAction?.(notification.actionId!, notification);
                              setOpen(false);
                            }}
                            className={`h-6 text-xs ${config.color} bg-transparent hover:${config.bgColor} border ${config.borderColor}`}
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
              <div className="py-12 text-center">
                <Bell className="h-12 w-12 text-text-tertiary mx-auto mb-3 opacity-50" />
                <p className="text-sm text-text-secondary">No notifications</p>
                <p className="text-xs text-text-tertiary mt-1">You're all caught up!</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
