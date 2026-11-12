import React, { useState } from 'react';
import { 
  CheckSquare, 
  Plus, 
  CheckCircle2, 
  MapPin, 
  X,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { ActionItem } from '../types';

interface ActionCentreViewProps {
  actions: ActionItem[];
  onCompleteAction: (actionId: string) => void;
  onCreateAction: (newAction: Partial<ActionItem>) => void;
  onNavigate: (viewId: string) => void;
}

export const ActionCentreView: React.FC<ActionCentreViewProps> = ({
  actions,
  onCompleteAction,
  onCreateAction,
  onNavigate,
}) => {
  const [selectedAgency, setSelectedAgency] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeAction, setActiveAction] = useState<ActionItem>(actions[0]);

  // Form state
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState<any>('P1 - Immediate');
  const [newAgency, setNewAgency] = useState<any>('BBMP Stormwater Dept');
  const [newLocation, setNewLocation] = useState('Bellandur Lake Catchment');
  const [newDueDate, setNewDueDate] = useState('Today, 05:00 PM');

  const filteredActions = actions.filter((a) => {
    const matchesAgency = selectedAgency === 'all' || a.assignedAgency === selectedAgency;
    const matchesStatus = selectedStatus === 'all' || a.status === selectedStatus;
    return matchesAgency && matchesStatus;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onCreateAction({
      title: newTitle,
      description: newDescription,
      priority: newPriority,
      assignedAgency: newAgency,
      location: newLocation,
      dueDate: newDueDate,
      status: 'pending',
      verificationStatus: 'Unverified',
      activityLog: [
        {
          id: `log-${Date.now()}`,
          timestamp: 'Just now',
          actor: 'Municipal Dispatcher',
          action: 'Manually logged operational intervention directive.'
        }
      ]
    });

    setNewTitle('');
    setNewDescription('');
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="p-5 lg:p-6 rounded-2xl enterprise-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <CheckSquare className="w-4 h-4 text-sky-400" />
            <h1 className="text-lg font-bold text-white tracking-tight">
              Action Centre & Field Directives
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Automated operational task sequencing mapped to BBMP, BWSSB, KSPCB, and State Disaster Response responders.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-black transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Directive</span>
        </button>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl enterprise-card text-xs font-mono">
        <div className="flex flex-wrap items-center gap-2">
          {['all', 'BBMP Stormwater Dept', 'BWSSB Wastewater Unit', 'KSPCB Enforcement'].map((ag) => (
            <button
              key={ag}
              onClick={() => setSelectedAgency(ag)}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedAgency === ag
                  ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30'
                  : 'bg-white/[0.04] text-slate-400 hover:text-slate-200'
              }`}
            >
              {ag === 'all' ? 'All Responders' : ag.replace(' Dept', '').replace(' Unit', '')}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {['all', 'pending', 'in_progress', 'completed'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-2.5 py-1 rounded capitalize transition-colors ${
                selectedStatus === st
                  ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                  : 'bg-white/[0.04] text-slate-400 hover:text-slate-200'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {filteredActions.map((action) => {
            const isSelected = activeAction.id === action.id;
            const isCompleted = action.status === 'completed';

            return (
              <div
                key={action.id}
                onClick={() => setActiveAction(action)}
                className={`p-5 rounded-xl cursor-pointer transition-colors space-y-3 enterprise-card ${
                  isSelected ? 'border-sky-400/50 bg-white/[0.05]' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        action.priority === 'P1 - Immediate'
                          ? 'bg-red-500/10 text-red-300 border border-red-500/20'
                          : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                      }`}>
                        {action.priority}
                      </span>

                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                        isCompleted
                          ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                          : 'bg-sky-500/10 text-sky-300 border border-sky-500/20'
                      }`}>
                        {action.status.replace('_', ' ')}
                      </span>

                      <span className="text-slate-500 text-xs">{action.category}</span>
                    </div>

                    <h3 className={`text-sm font-bold pt-0.5 ${isCompleted ? 'line-through text-slate-400' : 'text-white'}`}>
                      {action.title}
                    </h3>

                    <div className="text-xs text-slate-400 flex items-center space-x-1.5 pt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                      <span>{action.location}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-2 flex-shrink-0">
                    <span className="text-xs text-slate-500 font-mono">{action.dueDate}</span>
                    {!isCompleted ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onCompleteAction(action.id);
                        }}
                        className="px-2.5 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold transition-colors flex items-center space-x-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Done</span>
                      </button>
                    ) : (
                      <span className="text-emerald-400 text-xs font-mono font-bold flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>VERIFIED</span>
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {action.description}
                </p>

                <div className="flex items-center justify-between text-xs text-slate-400 border-t border-white/[0.06] pt-2">
                  <span>Responder: <span className="text-white">{action.assignedAgency}</span></span>
                  <span className="text-sky-400 font-mono text-[11px]">{action.verificationStatus}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Action Inspector */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl enterprise-card space-y-4 sticky top-24">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                Ticket #{activeAction.id.toUpperCase()}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {activeAction.status.toUpperCase()}
              </span>
            </div>

            <h2 className="text-base font-bold text-white">
              {activeAction.title}
            </h2>

            <p className="text-xs text-slate-300 leading-relaxed">
              {activeAction.description}
            </p>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1 text-xs">
              <div className="text-[10px] text-sky-400 font-mono font-bold uppercase">Responsible Authority</div>
              <div className="text-white font-medium">{activeAction.assignedAgency}</div>
              <div className="text-slate-500 text-[11px]">{activeAction.location}</div>
            </div>

            {activeAction.status !== 'completed' && (
              <button
                onClick={() => onCompleteAction(activeAction.id)}
                className="w-full py-2.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold transition-colors flex items-center justify-center space-x-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark Action Completed</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl bg-[#0f1523] border border-white/10 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <h3 className="text-base font-bold text-white">
                Create Field Directive
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Directive Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Deploy submersible pumps at Yamalur underpass"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Details of intervention..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white focus:outline-none focus:border-sky-400 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/[0.08] text-white"
                  >
                    <option value="P1 - Immediate">P1 - Immediate</option>
                    <option value="P2 - High">P2 - High</option>
                    <option value="P3 - Standard">P3 - Standard</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Assigned Agency</label>
                  <select
                    value={newAgency}
                    onChange={(e) => setNewAgency(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/[0.08] text-white"
                  >
                    <option value="BBMP Stormwater Dept">BBMP Stormwater Dept</option>
                    <option value="BWSSB Wastewater Unit">BWSSB Wastewater Unit</option>
                    <option value="KSPCB Enforcement">KSPCB Enforcement</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-lg bg-white/[0.06] text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-sky-500 font-semibold text-black"
                >
                  Dispatch Directive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
