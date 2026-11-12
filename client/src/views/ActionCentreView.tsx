import React, { useState } from 'react';
import { 
  CheckSquare, 
  Plus, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  MapPin, 
  UserCheck, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Send,
  X
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
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeAction, setActiveAction] = useState<ActionItem>(actions[0]);

  // Form state for creating custom action
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState<any>('Drainage Clearance');
  const [newPriority, setNewPriority] = useState<any>('P1 - Immediate');
  const [newAgency, setNewAgency] = useState<any>('BBMP Stormwater Dept');
  const [newLocation, setNewLocation] = useState('Bellandur Lake Catchment');
  const [newDueDate, setNewDueDate] = useState('Today, 05:00 PM');

  const filteredActions = actions.filter((a) => {
    const matchesAgency = selectedAgency === 'all' || a.assignedAgency === selectedAgency;
    const matchesPriority = selectedPriority === 'all' || a.priority === selectedPriority;
    const matchesStatus = selectedStatus === 'all' || a.status === selectedStatus;
    return matchesAgency && matchesPriority && matchesStatus;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onCreateAction({
      title: newTitle,
      description: newDescription,
      category: newCategory,
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
          action: 'Manually logged operational intervention ticket.'
        }
      ]
    });

    setNewTitle('');
    setNewDescription('');
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0c1324] border border-cyan-500/20 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <CheckSquare className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-mono font-bold text-white uppercase tracking-wider">
              Municipal Action & Intervention Centre
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Operational resource sequencing and execution tracking across BBMP, BWSSB, KSPCB, and State Disaster Response.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>CREATE ACTION TICKET</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-[#0d1424] border border-slate-800 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-500">Agency:</span>
          {['all', 'BBMP Stormwater Dept', 'BWSSB Wastewater Unit', 'KSPCB Enforcement'].map((ag) => (
            <button
              key={ag}
              onClick={() => setSelectedAgency(ag)}
              className={`px-2.5 py-1 rounded-lg border transition-all ${
                selectedAgency === ag
                  ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {ag === 'all' ? 'All Agencies' : ag.replace(' Dept', '').replace(' Unit', '')}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-500">Status:</span>
          {['all', 'pending', 'in_progress', 'completed'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-2.5 py-1 rounded-lg border capitalize transition-all ${
                selectedStatus === st
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Action Tickets List (2 Cols) + Action Detail Inspector (1 Col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Action Items List */}
        <div className="lg:col-span-2 space-y-3">
          {filteredActions.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-500 font-mono text-xs">
              No actions match the active filters.
            </div>
          ) : (
            filteredActions.map((action) => {
              const isSelected = activeAction.id === action.id;
              const isCompleted = action.status === 'completed';

              return (
                <div
                  key={action.id}
                  onClick={() => setActiveAction(action)}
                  className={`p-4 rounded-xl cursor-pointer border transition-all space-y-3 ${
                    isSelected
                      ? 'bg-[#101b33] border-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                      : 'bg-[#0c1324] border-cyan-500/15 hover:border-cyan-500/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          action.priority === 'P1 - Immediate'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                            : action.priority === 'P2 - High'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-slate-800 text-slate-300 border border-slate-700'
                        }`}>
                          {action.priority}
                        </span>

                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                          isCompleted
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        }`}>
                          {action.status.replace('_', ' ')}
                        </span>

                        <span className="text-slate-600">|</span>
                        <span className="text-[10px] font-mono text-slate-400">{action.category}</span>
                      </div>

                      <h3 className={`text-sm font-bold font-mono mt-1 ${isCompleted ? 'line-through text-slate-400' : 'text-white'}`}>
                        {action.title}
                      </h3>

                      <div className="text-xs text-slate-400 font-mono flex items-center space-x-1.5">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                        <span>{action.location}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-2 flex-shrink-0">
                      <span className="text-[10px] font-mono text-slate-500">Due: {action.dueDate}</span>
                      
                      {!isCompleted ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onCompleteAction(action.id);
                          }}
                          className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-mono transition-colors"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Mark Done</span>
                        </button>
                      ) : (
                        <span className="flex items-center space-x-1 text-emerald-400 text-xs font-mono font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>COMPLETED</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 font-sans line-clamp-2">
                    {action.description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-800/80 pt-2">
                    <span>Agency: <span className="text-slate-200">{action.assignedAgency}</span></span>
                    <span className="text-cyan-400">{action.verificationStatus}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Action Detail & Activity Audit (1 Col) */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-[#0c1324] border border-cyan-500/25 shadow-xl space-y-4 sticky top-16">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                Action Ticket #{activeAction.id.toUpperCase()}
              </span>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                activeAction.status === 'completed' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
              }`}>
                {activeAction.status.toUpperCase()}
              </span>
            </div>

            <h2 className="text-base font-bold text-white font-mono">
              {activeAction.title}
            </h2>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {activeAction.description}
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="text-[10px] text-slate-400">Assigned Team</div>
                <div className="text-slate-200 font-bold mt-1 text-[11px]">{activeAction.assignedAgency}</div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="text-[10px] text-slate-400">Verification Engine</div>
                <div className="text-emerald-400 font-bold mt-1 text-[11px]">{activeAction.verificationStatus}</div>
              </div>
            </div>

            {/* Audit Log Trail */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Activity Audit Trail
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {activeAction.activityLog.map((log) => (
                  <div key={log.id} className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span className="font-bold text-slate-300">{log.actor}</span>
                      <span>{log.timestamp}</span>
                    </div>
                    <div className="text-slate-300 text-[11px]">{log.action}</div>
                  </div>
                ))}
              </div>
            </div>

            {activeAction.status !== 'completed' && (
              <button
                onClick={() => onCompleteAction(activeAction.id)}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black text-xs font-mono font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center justify-center space-x-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Execute & Complete Ticket</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Create Action Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-[#0c1324] border border-cyan-500/40 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white font-mono flex items-center space-x-2">
                <CheckSquare className="w-4 h-4 text-cyan-400" />
                <span>Create Field Intervention Directive</span>
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Directive Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Deploy emergency submersible pumps at Yamalur culvert"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Operational Instructions</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detail exact resources, machinery, and safety precautions required..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Priority Tier</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="P1 - Immediate">P1 - Immediate (2h SLA)</option>
                    <option value="P2 - High">P2 - High (6h SLA)</option>
                    <option value="P3 - Standard">P3 - Standard (24h SLA)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Jurisdictional Agency</label>
                  <select
                    value={newAgency}
                    onChange={(e) => setNewAgency(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="BBMP Stormwater Dept">BBMP Stormwater Dept</option>
                    <option value="BWSSB Wastewater Unit">BWSSB Wastewater Unit</option>
                    <option value="KSPCB Enforcement">KSPCB Enforcement</option>
                    <option value="State Disaster Response (SDRF)">State Disaster Response (SDRF)</option>
                    <option value="Citizen Lake Wardens">Citizen Lake Wardens</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Location Corridor</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Target Due Date / Time</label>
                  <input
                    type="text"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold font-mono transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)]"
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
