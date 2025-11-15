import React from 'react';
import { Task } from '@/types/wardops';
import { CheckCircle2, X, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TaskQueueProps {
  tasks: Task[];
  onTaskComplete: (taskId: string) => void;
  onTaskDismiss: (taskId: string) => void;
}

export function TaskQueue({ tasks, onTaskComplete, onTaskDismiss }: TaskQueueProps) {
  const activeTasks = tasks.filter(t => t.status === 'active');

  return (
    <div className="glass-panel rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-text-primary">Task Queue</h3>
        <span className="px-2 py-1 bg-accent-cyan/20 text-accent-cyan text-xs font-medium rounded">
          {activeTasks.length} Active
        </span>
      </div>

      <div className="space-y-3">
        {activeTasks.map(task => (
          <div key={task.taskId} className="bg-bg-tertiary rounded-lg p-4 border border-border">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 text-xs font-bold rounded ${
                    task.priority === 'high' ? 'bg-accent-red/20 text-accent-red' :
                    task.priority === 'medium' ? 'bg-accent-yellow/20 text-accent-yellow' :
                    'bg-accent-blue/20 text-accent-blue'
                  }`}>
                    {task.priority.toUpperCase()}
                  </span>
                  <Clock className="h-3 w-3 text-text-tertiary" />
                  <span className="text-xs text-text-tertiary">
                    {Math.floor((Date.now() - task.createdAt.getTime()) / 60000)}m ago
                  </span>
                </div>
                <h4 className="text-sm font-bold text-text-primary mb-1">{task.title}</h4>
                <p className="text-xs text-text-secondary">{task.reason}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <Button
                size="sm"
                onClick={() => onTaskComplete(task.taskId)}
                className="flex-1 bg-accent-green/20 text-accent-green hover:bg-accent-green/30"
              >
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Done
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onTaskDismiss(task.taskId)}
                className="text-text-tertiary hover:text-accent-red"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}

        {activeTasks.length === 0 && (
          <p className="text-sm text-text-secondary text-center py-8">
            No active tasks. All clear!
          </p>
        )}
      </div>
    </div>
  );
}
