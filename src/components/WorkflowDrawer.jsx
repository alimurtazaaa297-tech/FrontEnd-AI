import React from 'react';
import { X, CheckCircle, Sparkles, ShieldCheck, GitPullRequest, FileText } from 'lucide-react';

export function WorkflowDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="drawer-backdrop" onClick={onClose} data-testid="workflow-drawer">
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <h2>AI Workflows & CI/CD Status</h2>
            <span style={{
              fontSize: '0.75rem',
              color: 'var(--accent-green)',
              background: 'var(--accent-green-subtle)',
              padding: '0.15rem 0.5rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <CheckCircle size={12} /> Passing
            </span>
          </div>
          <button className="btn-icon-only" onClick={onClose} aria-label="Close drawer">
            <X size={16} />
          </button>
        </div>

        <div className="drawer-body">
          {/* Section 1: Copilot */}
          <div className="workflow-card">
            <div className="workflow-card-header">
              <div className="workflow-card-title">
                <Sparkles size={16} color="var(--accent-blue)" />
                <span>GitHub Copilot Conventions</span>
              </div>
              <span className="code-pill">.github/copilot-instructions.md</span>
            </div>
            <p>
              Repository guidelines enforce modular React 19 functional components, accessible semantic HTML, and Vanilla CSS tokens.
            </p>
          </div>

          {/* Section 2: Octomind */}
          <div className="workflow-card">
            <div className="workflow-card-header">
              <div className="workflow-card-title">
                <ShieldCheck size={16} color="var(--accent-green)" />
                <span>Octomind Autonomous Testing</span>
              </div>
              <span className="code-pill">.github/workflows/e2e-octomind.yml</span>
            </div>
            <p>
              End-to-end test execution running on push and PR triggers. Automatically identifies interactive <code>data-testid</code> elements with self-healing selector fallback.
            </p>
          </div>

          {/* Section 3: CodeRabbit */}
          <div className="workflow-card">
            <div className="workflow-card-header">
              <div className="workflow-card-title">
                <GitPullRequest size={16} color="var(--accent-amber)" />
                <span>CodeRabbit AI Reviews</span>
              </div>
              <span className="code-pill">.coderabbit.yaml</span>
            </div>
            <p>
              Automated code reviews on pull requests. Inspects clean code practices, accessibility compliance, and build stability before merging to <code>main</code>.
            </p>
          </div>

          {/* Section 4: CI/CD */}
          <div className="workflow-card">
            <div className="workflow-card-header">
              <div className="workflow-card-title">
                <FileText size={16} color="var(--text-muted)" />
                <span>Linting & Build Gate</span>
              </div>
              <span className="code-pill">.github/workflows/ci.yml</span>
            </div>
            <p>
              Fast static verification using Oxlint and Vite bundle compilation on every pull request.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
