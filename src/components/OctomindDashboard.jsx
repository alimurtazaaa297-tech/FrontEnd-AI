import React, { useState } from 'react';
import { ShieldCheck, Play, CheckCircle2, RefreshCw } from 'lucide-react';

const INITIAL_TESTS = [
  {
    id: 'test-1',
    name: 'TaskCard: Toggle completion and keyboard events (Space/Enter)',
    target: 'data-testid="task-card-checkbox"',
    duration: '184ms',
    status: 'passed'
  },
  {
    id: 'test-2',
    name: 'TaskCard: Two-step confirmation delete protection',
    target: 'data-testid="task-card-confirm-dialog"',
    duration: '210ms',
    status: 'passed'
  },
  {
    id: 'test-3',
    name: 'Workspace Navigation: Seamless segmented tab transitions',
    target: 'segmented-pill-nav button',
    duration: '142ms',
    status: 'passed'
  },
  {
    id: 'test-4',
    name: 'Theme System: Contrast ratio & WCAG AA semantic verification',
    target: 'data-theme tokens',
    duration: '96ms',
    status: 'passed'
  }
];

export function OctomindDashboard() {
  const [tests, setTests] = useState(INITIAL_TESTS);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunTests = () => {
    setIsRunning(true);
    setTests(prev => prev.map(t => ({ ...t, status: 'running' })));

    setTimeout(() => {
      setTests(prev => prev.map((t, idx) => (idx === 0 ? { ...t, status: 'passed' } : t)));
    }, 350);

    setTimeout(() => {
      setTests(prev => prev.map((t, idx) => (idx <= 1 ? { ...t, status: 'passed' } : t)));
    }, 700);

    setTimeout(() => {
      setTests(prev => prev.map((t, idx) => (idx <= 2 ? { ...t, status: 'passed' } : t)));
    }, 1050);

    setTimeout(() => {
      setTests(prev => prev.map(t => ({ ...t, status: 'passed' })));
      setIsRunning(false);
    }, 1400);
  };

  return (
    <div className="clean-panel" data-testid="octomind-dashboard">
      <div className="panel-header">
        <div className="panel-title">
          <ShieldCheck size={16} color="var(--accent-green)" />
          <span>Octomind Test Suite</span>
        </div>

        <button
          type="button"
          onClick={handleRunTests}
          disabled={isRunning}
          data-testid="octomind-run-btn"
          className="btn-primary-simple"
        >
          {isRunning ? (
            <>
              <RefreshCw size={12} style={{ animation: 'spin 0.8s linear infinite' }} />
              <span>Running...</span>
            </>
          ) : (
            <>
              <Play size={12} fill="currentColor" />
              <span>Run Tests</span>
            </>
          )}
        </button>
      </div>

      <div className="panel-body">
        {/* Simple Status Summary */}
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
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-green)' }} />
            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>All 4 Playwright tests passing</span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>
            632ms total
          </span>
        </div>

        {/* Tests List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {tests.map(test => (
            <div
              key={test.id}
              className="test-item-row"
            >
              <div className="test-item-name">
                {test.status === 'passed' ? (
                  <CheckCircle2 size={15} color="var(--accent-green)" style={{ flexShrink: 0 }} />
                ) : (
                  <RefreshCw size={14} color="var(--accent-blue)" style={{ flexShrink: 0, animation: 'spin 0.8s linear infinite' }} />
                )}
                <div>
                  <div style={{ fontWeight: 500 }}>{test.name}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                    {test.target}
                  </div>
                </div>
              </div>

              <div className="test-item-meta">
                <span>{test.status === 'passed' ? test.duration : 'Running...'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OctomindDashboard;
