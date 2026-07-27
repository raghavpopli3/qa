import React from 'react';
import {
  LayoutDashboard,
  Sparkles,
  Database,
  History,
  Layers,
  BarChart3,
  Settings,
  LogOut,
  Home,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { UserProfile } from '../types';

interface SidebarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  user: UserProfile;
  papersCount: number;
  questionBankCount: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onNavigate,
  user,
  papersCount,
  questionBankCount,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    {
      id: 'generate',
      label: 'Generate Paper',
      icon: Sparkles,
      highlight: true,
      badge: 'AI',
    },
    {
      id: 'question-bank',
      label: 'Question Bank',
      icon: Database,
      badge: questionBankCount.toString(),
    },
    {
      id: 'previous-papers',
      label: 'Previous Papers',
      icon: History,
      badge: papersCount.toString(),
    },
    { id: 'templates', label: 'Templates', icon: Layers },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200/70 bg-white/80 backdrop-blur-xl transition-transform duration-300 dark:border-slate-800/80 dark:bg-slate-950/80 lg:static lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-1 flex-col justify-between overflow-y-auto px-3 py-4">
          {/* Main navigation list */}
          <div className="space-y-1.5">
            <div className="mb-2.5 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Workspace
            </div>

            <button
              onClick={() => {
                onNavigate('landing');
                onCloseMobile?.();
              }}
              className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900/80 dark:hover:text-slate-100"
            >
              <Home className="h-4 w-4 text-slate-400" />
              <span>Public Portal</span>
            </button>

            <div className="my-2.5 border-t border-slate-200/60 dark:border-slate-800/80" />

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    onCloseMobile?.();
                  }}
                  className={`group relative flex w-full items-center justify-between rounded-2xl px-3.5 py-2.5 text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/25 ring-1 ring-white/10'
                      : item.highlight
                      ? 'bg-violet-50/80 text-violet-700 hover:bg-violet-100/90 dark:bg-violet-950/40 dark:text-violet-300 dark:hover:bg-violet-900/50'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900/80 dark:hover:text-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`h-4 w-4 transition-transform group-hover:scale-110 ${
                        isActive
                          ? 'text-white'
                          : item.highlight
                          ? 'text-violet-600 dark:text-violet-400'
                          : 'text-slate-400 dark:text-slate-500'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : item.highlight
                          ? 'bg-violet-600 text-white'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-800/80 dark:text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Card - Upgrade & User summary */}
          <div className="space-y-3 pt-4">
            {/* Pro Plan Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-950 p-4 text-white shadow-lg border border-slate-800/80">
              <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-violet-500/20 blur-xl" />
              <div className="relative z-10">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-200 backdrop-blur-xs ring-1 ring-violet-400/30">
                    <ShieldCheck className="h-3 w-3 text-violet-300" />
                    {user.plan} Account
                  </span>
                  <span className="text-[10px] text-slate-400">Bloom Engine</span>
                </div>
                <p className="mt-1 text-xs font-medium text-slate-300">
                  Unlimited AI Paper Generation & Bloom Taxonomy Mapping.
                </p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={() => onNavigate('landing')}
              className="flex w-full items-center justify-between rounded-2xl border border-slate-200/80 px-3.5 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:border-slate-800/80 dark:text-slate-400 dark:hover:bg-rose-950/30 dark:hover:text-rose-400"
            >
              <span className="flex items-center gap-2">
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </span>
              <ChevronRight className="h-3 w-3 opacity-60" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
