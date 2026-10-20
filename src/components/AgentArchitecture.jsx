import React from 'react';
import {
  Cloud,
  Laptop,
  AppWindow,
  Box,
  ShieldCheck,
  Eye,
  Layers,
  Lock,
  Key,
  Cpu
} from 'lucide-react';

const ARCHITECTURE_CARDS = [
  {
    id: 'local-machines',
    title: 'Local Machines',
    description: 'Personal assistants and development workflows',
    icon: Laptop
  },
  {
    id: 'embedded-in-apps',
    title: 'Embedded in Apps',
    description: 'Desktop & web apps with simple backing architectures',
    icon: AppWindow
  },
  {
    id: 'cloud-containers',
    title: 'Cloud Containers',
    description: 'Secrets outside container; runtime inside with proxy isolation',
    icon: Box
  },
  {
    id: 'air-gapped-clouds',
    title: 'Air-Gapped Clouds',
    description: 'Government clouds with no access to the internet',
    icon: ShieldCheck
  },
  {
    id: 'private-vnets',
    title: 'Private VNets',
    description: 'Azure VNet inference; enterprises that need data residency control',
    icon: Eye
  },
  {
    id: 'multi-tenant-services',
    title: 'Multi-Tenant Services',
    description: 'Rigid startup time, memory footprint, and processing requirements',
    icon: Layers
  }
];

export function AgentArchitecture() {
  return (
    <div className="simple-agent-container" data-testid="agent-architecture-showcase">
      {/* Simple Clean Header */}
      <div className="simple-agent-header">
        <div className="simple-agent-icon-badge">
          <Cloud size={18} />
        </div>
        <h1 className="simple-agent-title">Run your agent anywhere</h1>
      </div>

      {/* Clean 3x2 Grid */}
      <div className="simple-agent-grid">
        {ARCHITECTURE_CARDS.map((card) => {
          const IconComponent = card.icon;

          return (
            <div key={card.id} className="simple-agent-card">
              <div className="simple-agent-card-icon">
                <IconComponent size={18} />
              </div>
              <div>
                <h3 className="simple-agent-card-title">{card.title}</h3>
                <p className="simple-agent-card-desc">{card.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Simple Footer Badges */}
      <div className="simple-agent-badges">
        <div className="simple-badge-item">
          <Lock size={12} />
          <span>GITHUB AUTH</span>
        </div>
        <span className="simple-badge-divider">•</span>
        <div className="simple-badge-item">
          <Key size={12} />
          <span>BRING-YOUR-OWN-KEY</span>
        </div>
        <span className="simple-badge-divider">•</span>
        <div className="simple-badge-item">
          <Cpu size={12} />
          <span>BRING-YOUR-OWN-MODEL</span>
        </div>
      </div>
    </div>
  );
}

export default AgentArchitecture;
