import React, { useState } from 'react';
import { Check, Trash2, X } from 'lucide-react';

/**
 * TaskCard Component
 * Minimalist, accessible task item with subtle hover interactions.
 */
export function TaskCard({
  id = 'task-1',
  title = 'Configure Octomind API key in GitHub Secrets',
  priority = 'medium',
  completed = false,
  tag = '',
  onToggleComplete,
  onDelete
}) {
  const [isCompleted, setIsCompleted] = useState(completed);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const handleToggleComplete = () => {
    const updated = !isCompleted;
    setIsCompleted(updated);
    if (onToggleComplete) {
      onToggleComplete(id, updated);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      handleToggleComplete();
    }
  };

  const priorityColors = {
    urgent: '#ef4444',
    high: '#f59e0b',
    medium: '#3b82f6',
    low: '#71717a'
  };

  const dotColor = priorityColors[priority] || priorityColors.medium;

  return (
    <div
      id={`task-card-${id}`}
      data-testid="task-card"
      className="task-card-item"
    >
      {/* Left: Checkbox & Title */}
      <div className="task-left">
        <button
          type="button"
          role="checkbox"
          aria-checked={isCompleted}
          aria-label={`Mark "${title}" as ${isCompleted ? 'incomplete' : 'complete'}`}
          tabIndex={0}
          onClick={handleToggleComplete}
          onKeyDown={handleKeyDown}
          data-testid="task-card-checkbox"
          className={`task-checkbox ${isCompleted ? 'checked' : ''}`}
        >
          {isCompleted && <Check size={11} strokeWidth={3} />}
        </button>

        <span
          id={`task-title-${id}`}
          data-testid="task-card-title"
          className={`task-title ${isCompleted ? 'completed' : ''}`}
          title={title}
        >
          {title}
        </span>
      </div>

      {/* Right: Meta & Actions */}
      <div className="task-right">
        {tag && <span className="task-tag">{tag}</span>}

        <span
          data-testid="task-card-priority"
          aria-label={`Priority: ${priority}`}
          className="task-priority-badge"
        >
          <span
            className="task-priority-dot"
            style={{ backgroundColor: dotColor }}
          />
          <span style={{ textTransform: 'capitalize' }}>{priority}</span>
        </span>

        {/* Delete confirmation dialog or subtle icon */}
        {!isConfirmingDelete ? (
          <button
            type="button"
            data-testid="task-card-delete-btn"
            onClick={() => setIsConfirmingDelete(true)}
            aria-label={`Delete task: ${title}`}
            className="task-delete-btn"
          >
            <Trash2 size={13} />
          </button>
        ) : (
          <div
            data-testid="task-card-confirm-dialog"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'var(--bg-subtle)',
              padding: '2px 6px',
              borderRadius: '4px',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.725rem'
            }}
          >
            <span style={{ color: 'var(--text-tertiary)' }}>Delete?</span>
            <button
              type="button"
              data-testid="task-card-confirm-yes"
              onClick={() => {
                setIsConfirmingDelete(false);
                onDelete?.(id);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--accent-red)',
                cursor: 'pointer',
                fontWeight: 600,
                padding: '0 2px'
              }}
            >
              Yes
            </button>
            <button
              type="button"
              data-testid="task-card-confirm-no"
              onClick={() => setIsConfirmingDelete(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-tertiary)',
                cursor: 'pointer',
                padding: '0 2px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <X size={10} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
