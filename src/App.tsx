/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { DashboardOverview } from './components/DashboardOverview';
import { GeneratePaperWizard } from './components/GeneratePaperWizard';
import { QuestionBank } from './components/QuestionBank';
import { PreviousPapers } from './components/PreviousPapers';
import { TemplatesView } from './components/TemplatesView';
import { AnalyticsView } from './components/AnalyticsView';
import { SettingsView } from './components/SettingsView';

import {
  INITIAL_USER,
  INITIAL_SUBJECTS,
  INITIAL_QUESTIONS,
  INITIAL_PAPERS,
  INITIAL_TEMPLATES,
  INITIAL_ANALYTICS,
} from './data/initialData';

import {
  UserProfile,
  Subject,
  Question,
  QuestionPaper,
  PaperTemplate,
  AnalyticsData,
  PaperConfig,
} from './types';

export default function App() {
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState<boolean>(false);

  // App Data State
  const [subjects, setSubjects] = useState<Subject[]>(INITIAL_SUBJECTS);
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
  const [papers, setPapers] = useState<QuestionPaper[]>(INITIAL_PAPERS);
  const [templates, setTemplates] = useState<PaperTemplate[]>(INITIAL_TEMPLATES);
  const [analytics, setAnalytics] = useState<AnalyticsData>(INITIAL_ANALYTICS);

  // Template wizard initial config
  const [wizardConfig, setWizardConfig] = useState<Partial<PaperConfig> | undefined>(undefined);

  // Sync dark class on html tag
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handlers
  const handlePaperGenerated = (newPaper: QuestionPaper) => {
    setPapers((prev) => [newPaper, ...prev]);
    setAnalytics((prev) => ({
      ...prev,
      totalPapers: prev.totalPapers + 1,
    }));
  };

  const handleSaveToArchive = (paper: QuestionPaper) => {
    setPapers((prev) =>
      prev.map((p) => (p.id === paper.id ? { ...p, isSaved: true } : p))
    );
  };

  const handleAddQuestion = (q: Question) => {
    setQuestions((prev) => [q, ...prev]);
    setAnalytics((prev) => ({
      ...prev,
      totalQuestions: prev.totalQuestions + 1,
    }));
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    setAnalytics((prev) => ({
      ...prev,
      totalQuestions: Math.max(0, prev.totalQuestions - 1),
    }));
  };

  const handleDeletePaper = (id: string) => {
    setPapers((prev) => prev.filter((p) => p.id !== id));
  };

  const handleDuplicatePaper = (paper: QuestionPaper) => {
    const duplicated: QuestionPaper = {
      ...paper,
      id: `paper-${Date.now()}`,
      title: `${paper.title} (Copy)`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setPapers((prev) => [duplicated, ...prev]);
  };

  const handleCreateTemplate = (tmpl: PaperTemplate) => {
    setTemplates((prev) => [tmpl, ...prev]);
  };

  const handleUseTemplate = (tmpl: PaperTemplate) => {
    setWizardConfig(tmpl.config);
    setActiveTab('generate');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 font-sans">
      {/* Top Navbar */}
      <Navbar
        user={user}
        activeTab={activeTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenAuth={() => setAuthModalOpen(true)}
        onNavigate={(tab) => setActiveTab(tab)}
        toggleSidebarMobile={() => setSidebarMobileOpen(!sidebarMobileOpen)}
      />

      {/* Main Layout Area */}
      {activeTab === 'landing' ? (
        <LandingPage
          onStartFree={() => setActiveTab('dashboard')}
          onOpenAuth={() => setAuthModalOpen(true)}
        />
      ) : (
        <div className="flex">
          {/* Dashboard Sidebar */}
          <Sidebar
            activeTab={activeTab}
            onNavigate={(tab) => setActiveTab(tab)}
            user={user}
            papersCount={papers.length}
            questionBankCount={questions.length}
            isOpenMobile={sidebarMobileOpen}
            onCloseMobile={() => setSidebarMobileOpen(false)}
          />

          {/* Main Content Workspace */}
          <main className="flex-1 px-4 py-6 md:px-8 max-w-7xl mx-auto">
            {activeTab === 'dashboard' && (
              <DashboardOverview
                analytics={analytics}
                recentPapers={papers.slice(0, 4)}
                user={user}
                onNavigate={(tab) => setActiveTab(tab)}
                onViewPaper={(p) => setActiveTab('previous-papers')}
                onDuplicatePaper={handleDuplicatePaper}
              />
            )}

            {activeTab === 'generate' && (
              <GeneratePaperWizard
                subjects={subjects}
                onPaperGenerated={handlePaperGenerated}
                onSaveToArchive={handleSaveToArchive}
                initialConfig={wizardConfig}
              />
            )}

            {activeTab === 'question-bank' && (
              <QuestionBank
                questions={questions}
                subjects={subjects}
                onAddQuestion={handleAddQuestion}
                onDeleteQuestion={handleDeleteQuestion}
              />
            )}

            {activeTab === 'previous-papers' && (
              <PreviousPapers
                papers={papers}
                onDeletePaper={handleDeletePaper}
                onDuplicatePaper={handleDuplicatePaper}
              />
            )}

            {activeTab === 'templates' && (
              <TemplatesView
                templates={templates}
                subjects={subjects}
                onCreateTemplate={handleCreateTemplate}
                onUseTemplate={handleUseTemplate}
              />
            )}

            {activeTab === 'analytics' && (
              <AnalyticsView analytics={analytics} />
            )}

            {activeTab === 'settings' && (
              <SettingsView
                user={user}
                onUpdateUser={(updated) => setUser(updated)}
              />
            )}
          </main>
        </div>
      )}

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(loggedInUser) => {
          setUser(loggedInUser);
          setActiveTab('dashboard');
        }}
      />
    </div>
  );
}
