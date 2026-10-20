import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  GitPullRequest, 
  CheckSquare, 
  Layers,
  Sun, 
  Moon, 
  Plus
} from 'lucide-react';

import { TaskCard } from './components/TaskCard';
import { OctomindDashboard } from './components/OctomindDashboard';
import { CodeRabbitReview } from './components/CodeRabbitReview';
import { AgentArchitecture } from './components/AgentArchitecture';

const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'Create accessible TaskCard component with keyboard support',
    priority: 'high',
    completed: true,
    tag: 'Component'
  },
  {
    id: 'task-2',
    title: 'Configure OCTOMIND_API_KEY and test targets in GitHub Secrets',
    priority: 'urgent',
    completed: false,
    tag: 'Octomind'
  },
  {
    id: 'task-3',
    title: 'Install CodeRabbit GitHub App & configure .coderabbit.yaml',
    priority: 'medium',
    completed: true,
    tag: 'CodeRabbit'
  },
  {
    id: 'task-4',
    title: 'Verify WCAG AA color contrast and screen reader accessibility',
    priority: 'high',
    completed: false,
    tag: 'A11y'
  }
];

const SUGGESTIONS = [
  'Build accessible modal dialog',
  'Add Octomind webhook trigger',
  'Create responsive drawer menu'
];

export function App() {
  const [activeTab, setActiveTab] = useState('architecture'); // default to 'architecture' to showcase the slide directly
  const [theme, setTheme] = useState('light'); // default to light to match the slide reference
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleAddTask = (e) => {
    e?.preventDefault();
    if (!newTitle.trim()) return;

    const newTask = {
      id: `task-${Date.now()}`,
      title: newTitle.trim(),
      priority: 'medium',
      completed: false,
      tag: 'Task'
    };

    setTasks(prev => [newTask, ...prev]);
    setNewTitle('');
  };

  const handleToggleTask = (id, completed) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, completed } : t)));
  };

  const handleDeleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="app-container">
      {/* Clean Minimalist Header */}
      <header className="app-header" role="banner">
        <div className="header-content" style={{ maxWidth: activeTab === 'architecture' ? '1040px' : '820px' }}>
          {/* Brand */}
          <div className="brand-wrapper" onClick={() => setActiveTab('architecture')}>
            <div className="brand-glyph">
              <Sparkles size={12} />
            </div>
            <span>DevFlow</span>
          </div>

          {/* Segmented Navigation */}
          <nav className="segmented-pill-nav" aria-label="Workspaces">
            <button
              type="button"
              className={`pill-nav-btn ${activeTab === 'architecture' ? 'active' : ''}`}
              onClick={() => setActiveTab('architecture')}
            >
              <Layers size={13} />
              <span>Agent Architecture</span>
            </button>
            <button
              type="button"
              className={`pill-nav-btn ${activeTab === 'tasks' ? 'active' : ''}`}
              onClick={() => setActiveTab('tasks')}
            >
              <CheckSquare size={13} />
              <span>Tasks</span>
            </button>
            <button
              type="button"
              className={`pill-nav-btn ${activeTab === 'octomind' ? 'active' : ''}`}
              onClick={() => setActiveTab('octomind')}
            >
              <ShieldCheck size={13} />
              <span>Octomind CI</span>
            </button>
            <button
              type="button"
              className={`pill-nav-btn ${activeTab === 'coderabbit' ? 'active' : ''}`}
              onClick={() => setActiveTab('coderabbit')}
            >
              <GitPullRequest size={13} />
              <span>CodeRabbit PR</span>
            </button>
          </nav>

          {/* Header Actions */}
          <div className="header-actions">
            <span className="ci-status-dot" title="CI Healthy" />
            <button
              type="button"
              className="btn-icon-subtle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main 
        className="main-content" 
        role="main"
        style={{ maxWidth: activeTab === 'architecture' ? '1040px' : '820px' }}
      >
        {/* VIEW 0: AGENT ARCHITECTURE (Run your agent anywhere) */}
        {activeTab === 'architecture' && (
          <AgentArchitecture />
        )}

        {/* VIEW 1: TASKS */}
        {activeTab === 'tasks' && (
          <div>
            <div className="section-header">
              <h1 className="section-title">Tasks</h1>
              <span className="section-meta">
                {completedCount} of {tasks.length} done
              </span>
            </div>

            {/* Simple Add Task Bar */}
            <form onSubmit={handleAddTask} className="simple-input-bar">
              <input
                type="text"
                className="simple-input-field"
                placeholder="Add a new task or prompt..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <button type="submit" className="btn-primary-simple">
                <Plus size={12} />
                <span>Add</span>
              </button>
            </form>

            {/* Quick Suggestions */}
            <div className="suggestion-pills">
              {SUGGESTIONS.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="suggestion-pill"
                  onClick={() => setNewTitle(item)}
                >
                  + {item}
                </button>
              ))}
            </div>

            {/* Task List */}
            <div className="task-list">
              {tasks.length === 0 ? (
                <div className="empty-state">
                  No tasks remaining. Use the input bar above to add one.
                </div>
              ) : (
                tasks.map(task => (
                  <TaskCard
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    priority={task.priority}
                    completed={task.completed}
                    tag={task.tag}
                    onToggleComplete={handleToggleTask}
                    onDelete={handleDeleteTask}
                  />
                ))
              )}
            </div>
          </div>
        )}

        {/* VIEW 2: OCTOMIND CI */}
        {activeTab === 'octomind' && (
          <div>
            <div className="section-header">
              <h1 className="section-title">Octomind CI</h1>
              <span className="section-meta">Playwright E2E</span>
            </div>
            <OctomindDashboard />
          </div>
        )}

        {/* VIEW 3: CODERABBIT PR */}
        {activeTab === 'coderabbit' && (
          <div>
            <div className="section-header">
              <h1 className="section-title">CodeRabbit Review</h1>
              <span className="section-meta">Pull Request #24</span>
            </div>
            <CodeRabbitReview />
          </div>
        )}
      </main>

      {/* Clean Minimalist Footer */}
      <footer 
        className="app-footer"
        style={{ maxWidth: activeTab === 'architecture' ? '1040px' : '820px' }}
      >
        <div>DevFlow • Minimalist Engineering Workspace</div>
        <div>React 19 • Vite</div>
      </footer>
    </div>
  );
}

export default App;
