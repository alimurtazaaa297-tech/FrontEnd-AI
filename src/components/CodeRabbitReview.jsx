import React, { useState } from 'react';
import { GitPullRequest, Check, MessageSquare } from 'lucide-react';

const DIFF_LINES = [
  { type: 'neutral', code: ' export function TaskCard({ id, title, priority, completed, onDelete }) {' },
  { type: 'del', code: '-  return <div onClick={() => alert("deleted")}>{title}</div>;' },
  { type: 'add', code: '+  return (' },
  { type: 'add', code: '+    <div role="checkbox" aria-checked={isCompleted} tabIndex={0}>' },
  { type: 'add', code: '+      <span>{title}</span>' },
  { type: 'add', code: '+      <button aria-label={`Delete task: ${title}`} onClick={handleConfirm}>' },
  { type: 'add', code: '+        <Trash2 size={13} />' },
  { type: 'add', code: '+      </button>' },
  { type: 'add', code: '+    </div>' },
  { type: 'add', code: '+  );' },
  { type: 'neutral', code: ' }' }
];

export function CodeRabbitReview() {
  const [tab, setTab] = useState('summary'); // 'summary' | 'diff'

  return (
    <div className="clean-panel" data-testid="coderabbit-review">
      <div className="panel-header">
        <div className="panel-title">
          <GitPullRequest size={16} color="var(--accent-amber)" />
          <span>PR #24: Accessible TaskCard</span>
        </div>

        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            type="button"
            onClick={() => setTab('summary')}
            style={{
              background: tab === 'summary' ? 'var(--bg-subtle)' : 'transparent',
              color: tab === 'summary' ? 'var(--text-primary)' : 'var(--text-tertiary)',
              border: '1px solid',
              borderColor: tab === 'summary' ? 'var(--border-strong)' : 'transparent',
              borderRadius: 'var(--radius-sm)',
              padding: '0.25rem 0.65rem',
              fontSize: '0.75rem',
              cursor: 'pointer',
              fontWeight: 500,
              transition: 'all 0.12s ease'
            }}
          >
            Summary
          </button>
          <button
            type="button"
            onClick={() => setTab('diff')}
            style={{
              background: tab === 'diff' ? 'var(--bg-subtle)' : 'transparent',
              color: tab === 'diff' ? 'var(--text-primary)' : 'var(--text-tertiary)',
              border: '1px solid',
              borderColor: tab === 'diff' ? 'var(--border-strong)' : 'transparent',
              borderRadius: 'var(--radius-sm)',
              padding: '0.25rem 0.65rem',
              fontSize: '0.75rem',
              cursor: 'pointer',
              fontWeight: 500,
              transition: 'all 0.12s ease'
            }}
          >
            Diff
          </button>
        </div>
      </div>

      <div className="panel-body">
        {/* Simple Approved Strip */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.6rem 0.85rem',
          borderRadius: 'var(--radius-sm)',
          background: 'var(--bg-subtle)',
          border: '1px solid var(--border-subtle)',
          marginBottom: '0.85rem',
          fontSize: '0.775rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{
              color: 'var(--accent-green)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontWeight: 600
            }}>
              <Check size={12} strokeWidth={3} /> Approved
            </span>
            <span style={{ color: 'var(--text-tertiary)' }}>•</span>
            <span style={{ color: 'var(--text-secondary)' }}>CodeRabbit review passed</span>
          </div>

          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)', fontSize: '0.725rem' }}>
            main ← feat/task-card
          </span>
        </div>

        {tab === 'summary' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-page)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.825rem',
              lineHeight: 1.6
            }}>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MessageSquare size={13} color="var(--accent-purple)" />
                <span>AI Review Insights</span>
              </div>
              <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <li><strong style={{ color: 'var(--text-primary)' }}>Accessibility:</strong> Full keyboard navigation (Space/Enter) and ARIA attributes for WCAG AA compliance.</li>
                <li><strong style={{ color: 'var(--text-primary)' }}>Safeguard:</strong> Two-step confirmation prevents accidental deletion.</li>
                <li><strong style={{ color: 'var(--text-primary)' }}>Quality:</strong> Zero lint warnings and clean component separation.</li>
              </ul>
            </div>
          </div>
        )}

        {tab === 'diff' && (
          <div className="diff-container">
            <div style={{
              padding: '0.45rem 0.75rem',
              background: 'var(--bg-subtle)',
              borderBottom: '1px solid var(--border-subtle)',
              fontSize: '0.725rem',
              color: 'var(--text-tertiary)',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <span>src/components/TaskCard.jsx</span>
              <span style={{ color: 'var(--accent-green)' }}>+8 -1 lines</span>
            </div>
            {DIFF_LINES.map((line, idx) => (
              <div key={idx} className={`diff-line ${line.type === 'add' ? 'addition' : line.type === 'del' ? 'deletion' : 'neutral'}`}>
                <span>{line.code}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CodeRabbitReview;
