import { RoomReadiness, Task } from '@/types/wardops';
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

interface RoomDetailsProps {
  roomReadiness: RoomReadiness | null;
  tasks: Task[];
}

export function RoomDetails({ roomReadiness, tasks }: RoomDetailsProps) {
  if (!roomReadiness) {
    return (
      <div className="glass-panel rounded-lg p-6">
        <p className="text-text-secondary text-sm">Select a room to view details</p>
      </div>
    );
  }

  const getReadinessColor = () => {
    if (roomReadiness.readinessScore >= 90) return 'text-accent-green';
    if (roomReadiness.readinessScore >= 70) return 'text-accent-yellow';
    return 'text-accent-red';
  };

  const roomTasks = tasks.filter(t => t.roomId === roomReadiness.roomId);

  return (
    <div className="space-y-4">
      {/* Room Details Card */}
      <div className="glass-panel rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-text-primary">{roomReadiness.roomName}</h3>
          <div className={`text-2xl font-bold ${getReadinessColor()}`}>
            {roomReadiness.readinessScore}%
          </div>
        </div>

        <div className="space-y-3">
          {/* Required Assets */}
          <div>
            <p className="text-xs text-text-tertiary uppercase font-medium mb-2">Required Assets</p>
            <div className="flex flex-wrap gap-2">
              {roomReadiness.requiredAssets.map(asset => (
                <span key={asset} className="px-2 py-1 bg-bg-tertiary rounded text-xs text-text-secondary">
                  {asset.replace('_', ' ')}
                </span>
              ))}
            </div>
          </div>

          {/* Missing Assets */}
          {roomReadiness.missing.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="h-4 w-4 text-accent-red" />
                <p className="text-xs text-text-tertiary uppercase font-medium">Missing</p>
              </div>
              <div className="space-y-1">
                {roomReadiness.missing.map((item, idx) => (
                  <p key={idx} className="text-sm text-accent-red">{item}</p>
                ))}
              </div>
            </div>
          )}

          {/* Extra Assets */}
          {roomReadiness.extra.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-accent-yellow" />
                <p className="text-xs text-text-tertiary uppercase font-medium">Extra / Review</p>
              </div>
              <div className="space-y-1">
                {roomReadiness.extra.map((item, idx) => (
                  <p key={idx} className="text-sm text-accent-yellow">{item}</p>
                ))}
              </div>
            </div>
          )}

          {/* All Clear */}
          {roomReadiness.hasAllRequired && roomReadiness.missing.length === 0 && (
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent-green" />
              <p className="text-sm text-accent-green">All required assets present</p>
            </div>
          )}
        </div>
      </div>

      {/* Room Tasks */}
      {roomTasks.length > 0 && (
        <div className="glass-panel rounded-lg p-6">
          <h4 className="text-sm font-bold text-text-primary mb-3">Related Tasks</h4>
          <div className="space-y-2">
            {roomTasks.map(task => (
              <div key={task.taskId} className="p-3 bg-bg-tertiary rounded">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-text-primary">{task.title}</span>
                  <span className={`px-2 py-0.5 text-xs rounded ${
                    task.priority === 'high' ? 'bg-accent-red/20 text-accent-red' :
                    task.priority === 'medium' ? 'bg-accent-yellow/20 text-accent-yellow' :
                    'bg-accent-blue/20 text-accent-blue'
                  }`}>
                    {task.priority}
                  </span>
                </div>
                <p className="text-xs text-text-tertiary">{task.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
