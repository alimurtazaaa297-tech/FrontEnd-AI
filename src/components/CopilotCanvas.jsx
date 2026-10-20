import React, { useState } from 'react';
import { Sparkles, Code, Play, Check, Copy, ArrowUpRight, User, Shield } from 'lucide-react';
import { TaskCard } from './TaskCard';

const COMPONENTS = [
  {
    id: 'task-card',
    name: 'Task Card (Prompt Example)',
    prompt: '// src/components/TaskCard.jsx\n// Prompt: Create an accessible TaskCard component with a checkbox, title, priority badge, and delete button with confirmation.',
    description: 'Accessible task card with checkbox, priority badge, and confirm-to-delete state',
    code: `// src/components/TaskCard.jsx
// Prompt: Create an accessible TaskCard component with a checkbox, title, priority badge, and delete button with confirmation.
import React, { useState } from 'react';
import { Check, Trash2, AlertTriangle, X } from 'lucide-react';

export function TaskCard({ id = '1', title, priority = 'high', completed = false, onDelete }) {
  const [isCompleted, setIsCompleted] = useState(completed);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleToggleComplete = () => setIsCompleted(!isCompleted);

  return (
    <article className="task-card" data-testid="task-card" role="article">
      <div 
        role="checkbox" 
        aria-checked={isCompleted} 
        tabIndex={0}
        onClick={handleToggleComplete}
        onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && handleToggleComplete()}
      >
        {isCompleted && <Check size={13} />}
      </div>
      <span style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>{title}</span>
      <span className="badge">{priority}</span>
      {!isConfirming ? (
        <button onClick={() => setIsConfirming(true)} aria-label="Delete task">
          <Trash2 size={15} />
        </button>
      ) : (
        <div role="dialog" aria-label="Confirm delete">
          <button onClick={() => onDelete?.(id)}>Delete</button>
          <button onClick={() => setIsConfirming(false)}>Cancel</button>
        </div>
      )}
    </article>
  );
}`,
    render: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', maxWidth: '460px' }}>
        <TaskCard 
          id="task-1" 
          title="Configure Octomind API key in GitHub Secrets" 
          priority="high" 
          completed={false} 
        />
        <TaskCard 
          id="task-2" 
          title="Install CodeRabbit GitHub App & configure .coderabbit.yaml" 
          priority="medium" 
          completed={true} 
        />
      </div>
    )
  },
  {
    id: 'metric-card',
    name: 'Metric Card',
    description: 'Tabular stat counter with percentage change indicator',
    code: `// Generated with GitHub Copilot (@copilot:component)
export function MetricCard({ label, value, change, trend }) {
  return (
    <div 
      data-testid="copilot-metric-card"
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '10px',
        padding: '1.25rem',
        minWidth: '240px',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 500 }}>
        {label}
      </div>
      <div style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0.35rem 0', color: 'var(--text-primary)' }}>
        {value}
      </div>
      <div style={{ fontSize: '0.75rem', color: trend === 'up' ? 'var(--accent-green)' : 'var(--accent-amber)', fontWeight: 500 }}>
        {change} vs last period
      </div>
    </div>
  );
}`,
    render: () => (
      <div 
        data-testid="copilot-metric-card"
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-default)',
          borderRadius: '10px',
          padding: '1.25rem 1.5rem',
          minWidth: '260px',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 500, letterSpacing: '0.02em' }}>
          ACTIVE USERS
        </div>
        <div style={{ fontSize: '1.85rem', fontWeight: 700, margin: '0.35rem 0', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          14,290
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--accent-green)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}>
          <ArrowUpRight size={13} /> +12.4% vs last week
        </div>
      </div>
    )
  },
  {
    id: 'user-badge',
    name: 'User Profile Card',
    description: 'Compact user identity card with verified status badge',
    code: `// Generated with GitHub Copilot (@copilot:component)
export function UserBadge({ name, role, status }) {
  return (
    <div 
      data-testid="copilot-user-badge"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '8px',
        padding: '0.75rem 1rem'
      }}
    >
      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--accent-blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <User size={18} />
      </div>
      <div>
        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{name}</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{role}</div>
      </div>
    </div>
  );
}`,
    render: () => (
      <div 
        data-testid="copilot-user-badge"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-default)',
          borderRadius: '10px',
          padding: '0.85rem 1.25rem',
          minWidth: '240px',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{
          width: 38,
          height: 38,
          borderRadius: '50%',
          background: 'var(--bg-subtle)',
          border: '1px solid var(--border-subtle)',
          color: 'var(--accent-blue)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <User size={18} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Alex Rivera</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Frontend Engineer</div>
        </div>
        <span style={{
          padding: '0.2rem 0.5rem',
          borderRadius: '9999px',
          background: 'var(--accent-green-subtle)',
          color: 'var(--accent-green)',
          fontSize: '0.7rem',
          fontWeight: 600
        }}>
          Online
        </span>
      </div>
    )
  },
  {
    id: 'action-toggle',
    name: 'Notification Pill',
    description: 'Clean inline alert indicator with action button',
    code: `// Generated with GitHub Copilot (@copilot:component)
export function NotificationPill({ message, onDismiss }) {
  return (
    <div 
      data-testid="copilot-pill"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.65rem',
        padding: '0.45rem 0.85rem',
        background: 'var(--bg-subtle)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '6px'
      }}
    >
      <Shield size={14} color="var(--accent-blue)" />
      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{message}</span>
    </div>
  );
}`,
    render: () => (
      <div 
        data-testid="copilot-pill"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.65rem',
          padding: '0.55rem 1rem',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-default)',
          borderRadius: '8px',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <Shield size={16} color="var(--accent-blue)" />
        <span style={{ fontSize: '0.825rem', color: 'var(--text-primary)', fontWeight: 500 }}>
          Octomind test discovery hook attached: <code>data-testid="copilot-pill"</code>
        </span>
      </div>
    )
  }
];

export function CopilotCanvas() {
  const [selectedComponent, setSelectedComponent] = useState(COMPONENTS[0]);
  const [tab, setTab] = useState('preview'); // 'preview' | 'code' | 'instructions'
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedComponent.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="panel-card" data-testid="copilot-canvas">
      <div className="panel-card-header">
        <div className="panel-card-title">
          <Sparkles size={16} color="var(--accent-blue)" />
          <span>GitHub Copilot Component Canvas</span>
        </div>

        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button 
            className={`btn-outline ${tab === 'preview' ? 'active' : ''}`}
            onClick={() => setTab('preview')}
            style={tab === 'preview' ? { background: 'var(--bg-hover)', borderColor: 'var(--border-focus)' } : {}}
          >
            <Play size={13} /> Preview
          </button>
          <button 
            className={`btn-outline ${tab === 'code' ? 'active' : ''}`}
            onClick={() => setTab('code')}
            style={tab === 'code' ? { background: 'var(--bg-hover)', borderColor: 'var(--border-focus)' } : {}}
          >
            <Code size={13} /> Code
          </button>
        </div>
      </div>

      <div className="panel-card-body">
        {/* Component Selector */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {COMPONENTS.map((item) => (
            <button
              key={item.id}
              className="btn-outline"
              onClick={() => setSelectedComponent(item)}
              style={selectedComponent.id === item.id ? { 
                background: 'var(--accent-blue-subtle)', 
                borderColor: 'var(--accent-blue)',
                color: 'var(--accent-blue)',
                fontWeight: 600
              } : {}}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Preview Tab */}
        {tab === 'preview' && (
          <div className="canvas-stage">
            {selectedComponent.render()}
          </div>
        )}

        {/* Code Tab */}
        {tab === 'code' && (
          <div className="code-box">
            <div className="code-box-header">
              <span>src/components/{selectedComponent.id}.jsx</span>
              <button 
                onClick={handleCopy}
                style={{ background: 'transparent', border: 'none', color: '#8b949e', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                {copied ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="code-box-content">
              {selectedComponent.code}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.775rem', color: 'var(--text-tertiary)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
          <span>Convention: Pure React functional component with semantic HTML & <code>data-testid</code></span>
          <span>Config: <code>.github/copilot-instructions.md</code></span>
        </div>
      </div>
    </div>
  );
}
