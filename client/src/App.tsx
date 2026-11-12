import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { OverviewView } from './views/OverviewView';
import { LiveEarthMonitorView } from './views/LiveEarthMonitorView';
import { AgentCommandCentreView } from './views/AgentCommandCentreView';
import { ChangeDetectionView } from './views/ChangeDetectionView';
import { InvestigationCentreView } from './views/InvestigationCentreView';
import { RiskPredictionView } from './views/RiskPredictionView';
import { SimulationLabView } from './views/SimulationLabView';
import { ActionCentreView } from './views/ActionCentreView';
import { EvidenceCentreView } from './views/EvidenceCentreView';
import { SettingsView } from './views/SettingsView';

import { 
  INITIAL_AGENTS, 
  INITIAL_ANOMALIES, 
  INITIAL_INVESTIGATIONS, 
  INITIAL_RISK_PREDICTIONS, 
  INITIAL_ACTIONS, 
  INITIAL_EVIDENCE,
  INITIAL_WEATHER 
} from './data/mockData';
import { 
  Agent, 
  Anomaly, 
  Investigation, 
  RiskPrediction, 
  ActionItem, 
  EvidenceItem, 
  BengaluruWeather, 
  AgentId,
  MonitoredWaterbody
} from './types';
import { fetchLiveBengaluruWeather } from './services/openMeteoService';
import { executeAgentStep, AgentLogEntry } from './services/agentEngine';

export function App() {
  const [activeView, setActiveView] = useState<string>('overview');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [weather, setWeather] = useState<BengaluruWeather>(INITIAL_WEATHER);

  // Core Data State
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
  const [anomalies, setAnomalies] = useState<Anomaly[]>(INITIAL_ANOMALIES);
  const [investigations, setInvestigations] = useState<Investigation[]>(INITIAL_INVESTIGATIONS);
  const [risks, setRisks] = useState<RiskPrediction[]>(INITIAL_RISK_PREDICTIONS);
  const [actions, setActions] = useState<ActionItem[]>(INITIAL_ACTIONS);
  const [evidenceList, setEvidenceList] = useState<EvidenceItem[]>(INITIAL_EVIDENCE);

  // Agent Pipeline Execution State
  const [logs, setLogs] = useState<AgentLogEntry[]>([
    {
      id: 'init-1',
      timestamp: '10:45 AM',
      agentId: 'observation',
      agentName: 'Observation Agent',
      level: 'info',
      message: 'Ingestion pipeline established with Sentinel-2 MSI and 48 municipal IoT gauge telemetry nodes.'
    },
    {
      id: 'init-2',
      timestamp: '10:46 AM',
      agentId: 'change_detection',
      agentName: 'Change Detection Agent',
      level: 'warning',
      message: 'Critical anomaly detected: Bellandur Lake weir surfactant surge (8.7 mg/L) & K-100 SWD 56% silt choke.'
    }
  ]);
  const [isPipelineRunning, setIsPipelineRunning] = useState<boolean>(false);
  const [activeAgentId, setActiveAgentId] = useState<AgentId | null>(null);

  // Deep-linking selections
  const [selectedInvestigationId, setSelectedInvestigationId] = useState<string | undefined>(undefined);
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string | undefined>(undefined);
  const [simulationLocation, setSimulationLocation] = useState<string | undefined>(undefined);

  // Fetch live weather on startup if not strictly demo
  useEffect(() => {
    let isMounted = true;
    fetchLiveBengaluruWeather().then((w) => {
      if (isMounted) setWeather(w);
    });
    return () => { isMounted = false; };
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const liveW = await fetchLiveBengaluruWeather();
      setWeather(liveW);
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setIsRefreshing(false), 600);
    }
  };

  const handleToggleDemoMode = () => {
    const nextMode = !isDemoMode;
    setIsDemoMode(nextMode);
    if (!nextMode) {
      handleRefresh();
    }
  };

  // Run a single agent step
  const handleRunAgent = (agentId: AgentId) => {
    const targetAgent = agents.find(a => a.id === agentId);
    if (!targetAgent) return;

    setActiveAgentId(agentId);
    setAgents(prev => prev.map(a => a.id === agentId ? { ...a, status: 'running' } : a));

    setTimeout(() => {
      const result = executeAgentStep(targetAgent, (newLog) => {
        setLogs(prev => [newLog, ...prev.slice(0, 99)]);
      });

      setAgents(prev => prev.map(a => a.id === agentId ? result.updatedAgent : a));
      setActiveAgentId(null);
    }, 800);
  };

  // Run the full closed-loop autonomous pipeline (all 6 agents sequentially)
  const handleRunFullPipeline = () => {
    if (isPipelineRunning) return;
    setIsPipelineRunning(true);

    const agentSequence: AgentId[] = [
      'observation',
      'change_detection',
      'investigation',
      'prediction',
      'action',
      'verification',
    ];

    let currentStepIndex = 0;

    const executeNext = () => {
      if (currentStepIndex >= agentSequence.length) {
        setIsPipelineRunning(false);
        setActiveAgentId(null);
        return;
      }

      const agentId = agentSequence[currentStepIndex];
      setActiveAgentId(agentId);
      setAgents(prev => prev.map(a => a.id === agentId ? { ...a, status: 'running' } : a));

      setTimeout(() => {
        setAgents(prev => {
          const current = prev.find(a => a.id === agentId);
          if (!current) return prev;
          const result = executeAgentStep(current, (newLog) => {
            setLogs(logsPrev => [newLog, ...logsPrev.slice(0, 99)]);
          });
          return prev.map(a => a.id === agentId ? result.updatedAgent : a);
        });

        currentStepIndex++;
        executeNext();
      }, 1000);
    };

    executeNext();
  };

  // Action management handlers
  const handleCompleteAction = (actionId: string) => {
    setActions(prev => prev.map(a => {
      if (a.id === actionId) {
        return {
          ...a,
          status: 'completed',
          verificationStatus: 'Satellite Verified',
          activityLog: [
            {
              id: `log-${Date.now()}`,
              timestamp: 'Just now',
              actor: 'Municipal Field Supervisor',
              action: 'Marked action completed. Verification Agent FS-VRF-06 dispatched post-event satellite pass.'
            },
            ...a.activityLog
          ]
        };
      }
      return a;
    }));
  };

  const handleCreateAction = (newActionData: Partial<ActionItem>) => {
    const newAction: ActionItem = {
      id: `act-${Date.now().toString().slice(-4)}`,
      title: newActionData.title || 'Untitled Directive',
      description: newActionData.description || 'No description provided.',
      category: newActionData.category || 'Drainage Clearance',
      priority: newActionData.priority || 'P2 - High',
      status: 'pending',
      assignedAgency: newActionData.assignedAgency || 'BBMP Stormwater Dept',
      location: newActionData.location || 'Bengaluru Catchment',
      coordinates: [12.9716, 77.5946],
      dueDate: newActionData.dueDate || 'Today, 06:00 PM',
      createdAt: 'Just now',
      verificationStatus: 'Unverified',
      activityLog: [
        {
          id: `log-${Date.now()}`,
          timestamp: 'Just now',
          actor: 'Municipal Dispatcher',
          action: 'Created directive ticket.'
        }
      ]
    };
    setActions(prev => [newAction, ...prev]);
  };

  // Navigation Deep Link Helpers
  const handleSelectAnomalyForInvestigation = (anomaly: Anomaly) => {
    const matchingInv = investigations.find(i => i.anomalyId === anomaly.id);
    if (matchingInv) {
      setSelectedInvestigationId(matchingInv.id);
    }
    setActiveView('investigation_centre');
  };

  const handleLaunchSimulationForWaterbody = (wb: MonitoredWaterbody) => {
    setSimulationLocation(wb.name);
    setActiveView('simulation_lab');
  };

  const handleInspectEvidence = (evidenceId: string) => {
    setSelectedEvidenceId(evidenceId);
    setActiveView('evidence_centre');
  };

  const handleInspectAnomalyFromEvidence = (anomalyId: string) => {
    setActiveView('change_detection');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#080c14] text-slate-100 font-sans">
      {/* Top Navigation */}
      <Navbar
        weather={weather}
        isDemoMode={isDemoMode}
        onToggleDemoMode={handleToggleDemoMode}
        onRefreshData={handleRefresh}
        isRefreshing={isRefreshing}
        activeView={activeView}
        onNavigate={(viewId) => setActiveView(viewId)}
        anomalies={anomalies}
        actions={actions}
      />

      {/* Main Body with Sidebar + View Viewport */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          activeView={activeView}
          onNavigate={(viewId) => setActiveView(viewId)}
          anomaliesCount={anomalies.length}
          actionsCount={actions.filter(a => a.status !== 'completed').length}
          evidenceCount={evidenceList.length}
          isPipelineRunning={isPipelineRunning}
        />

        {/* Viewport */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 cyber-grid">
          {activeView === 'overview' && (
            <OverviewView
              agents={agents}
              anomalies={anomalies}
              actions={actions}
              risks={risks}
              weather={weather}
              onNavigate={(v) => setActiveView(v)}
              onSelectAnomaly={handleSelectAnomalyForInvestigation}
              onSelectWaterbody={handleLaunchSimulationForWaterbody}
              onRunAutonomousPipeline={handleRunFullPipeline}
              isPipelineRunning={isPipelineRunning}
            />
          )}

          {activeView === 'live_earth_monitor' && (
            <LiveEarthMonitorView
              anomalies={anomalies}
              weather={weather}
              isDemoMode={isDemoMode}
              onSelectAnomaly={handleSelectAnomalyForInvestigation}
              onNavigate={(v) => setActiveView(v)}
              onLaunchSimulationForWaterbody={handleLaunchSimulationForWaterbody}
            />
          )}

          {activeView === 'agent_command_centre' && (
            <AgentCommandCentreView
              agents={agents}
              onRunAgent={handleRunAgent}
              onRunFullPipeline={handleRunFullPipeline}
              isPipelineRunning={isPipelineRunning}
              activeAgentId={activeAgentId}
              logs={logs}
            />
          )}

          {activeView === 'change_detection' && (
            <ChangeDetectionView
              anomalies={anomalies}
              onSelectAnomaly={handleSelectAnomalyForInvestigation}
              onNavigate={(v) => setActiveView(v)}
            />
          )}

          {activeView === 'investigation_centre' && (
            <InvestigationCentreView
              investigations={investigations}
              anomalies={anomalies}
              evidenceList={evidenceList}
              selectedInvestigationId={selectedInvestigationId}
              onNavigate={(v) => setActiveView(v)}
              onInspectEvidence={handleInspectEvidence}
            />
          )}

          {activeView === 'risk_prediction' && (
            <RiskPredictionView
              risks={risks}
              onNavigate={(v) => setActiveView(v)}
              onLaunchSimulation={(loc) => {
                setSimulationLocation(loc);
                setActiveView('simulation_lab');
              }}
            />
          )}

          {activeView === 'simulation_lab' && (
            <SimulationLabView
              initialLocation={simulationLocation}
            />
          )}

          {activeView === 'action_centre' && (
            <ActionCentreView
              actions={actions}
              onCompleteAction={handleCompleteAction}
              onCreateAction={handleCreateAction}
              onNavigate={(v) => setActiveView(v)}
            />
          )}

          {activeView === 'evidence_centre' && (
            <EvidenceCentreView
              evidenceList={evidenceList}
              selectedEvidenceId={selectedEvidenceId}
              onNavigate={(v) => setActiveView(v)}
              onInspectAnomaly={handleInspectAnomalyFromEvidence}
            />
          )}

          {activeView === 'settings' && (
            <SettingsView
              isDemoMode={isDemoMode}
              onToggleDemoMode={handleToggleDemoMode}
              weather={weather}
              onRefreshData={handleRefresh}
              isRefreshing={isRefreshing}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;

