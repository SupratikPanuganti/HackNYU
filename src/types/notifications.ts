export type NotificationPriority = 'critical' | 'high' | 'medium' | 'low';
export type NotificationStatus = 'unread' | 'read' | 'dismissed';

export interface Notification {
  id: string;
  title: string;
  message: string;
  priority: NotificationPriority;
  status: NotificationStatus;
  timestamp: Date;
  actionLabel?: string;
  actionId?: string;
  relatedRoomId?: string;
  relatedAssetId?: string;
}
