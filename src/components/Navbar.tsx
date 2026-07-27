import React from 'react';
import {
  Sparkles,
  Bell,
  Sun,
  Moon,
  Search,
  User,
  Menu,
  ChevronDown,
  BookOpen,
} from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  user: UserProfile;
  activeTab: string;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenAuth: () => void;
  onNavigate: (tab: string) => void;
  toggleSidebarMobile?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  activeTab,
  darkMode,
  setDarkMode,
  onOpenAuth,
  onNavigate,
  toggleSidebarMobile,
}) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/70 bg-white/70 px-4 backdrop-blur-xl transition-colors dark:border-slate-800/80 dark:bg-slate-950/70 md:px-6">
      {/* Left branding & mobile menu toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebarMobile}
          className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/80 lg:hidden"
          title="Toggle Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div
          onClick={() => onNavigate('landing')}
          className="flex cursor-pointer items-center gap-2.5 transition-transform hover:opacity-95"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-purple-500 text-white shadow-md shadow-violet-500/20 ring-1 ring-white/20">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 bg-clip-text text-xl font-extrabold tracking-tight text-transparent dark:from-violet-400 dark:via-indigo-300 dark:to-purple-400">
                Bloomia AI
              </span>
              <span className="rounded-full bg-violet-100/80 px-2 py-0.5 text-[10px] font-bold text-violet-700 ring-1 ring-violet-500/20 dark:bg-violet-950/80 dark:text-violet-300">
                v2.4
              </span>
            </div>
            <p className="hidden text-[11px] font-medium text-slate-500 dark:text-slate-400 sm:block">
              AI Question Paper Generator
            </p>
          </div>
        </div>
      </div>

      {/* Center Search Bar (for dashboard mode) */}
      {activeTab !== 'landing' && (
        <div className="hidden max-w-md flex-1 px-4 md:block">
          <div className="relative">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search question papers, subjects, or Bloom's levels..."
              className="w-full rounded-2xl border border-slate-200/80 bg-slate-100/60 py-2 pl-9 pr-4 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-violet-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200 dark:placeholder-slate-500 dark:focus:border-violet-400 dark:focus:bg-slate-900"
            />
          </div>
        </div>
      )}

      {/* Right controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {activeTab === 'landing' ? (
          <>
            <button
              onClick={() => onNavigate('dashboard')}
              className="hidden items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-violet-600 dark:text-slate-300 dark:hover:text-violet-400 sm:flex"
            >
              <BookOpen className="h-4 w-4" />
              Demo Portal
            </button>
            <button
              onClick={onOpenAuth}
              className="rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-md shadow-violet-500/25 transition-all hover:scale-[1.02] hover:from-violet-500 hover:to-indigo-500 active:scale-[0.98]"
            >
              Sign In
            </button>
          </>
        ) : (
          <>
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-2xl border border-slate-200/80 p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800/80"
              title="Toggle Theme"
            >
              {darkMode ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-slate-600" />
              )}
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                className="relative rounded-2xl border border-slate-200/80 p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800/80"
                title="Notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-violet-500 ring-2 ring-white dark:ring-slate-950"></span>
              </button>
            </div>

            {/* User Profile menu button */}
            <div className="flex items-center gap-2 border-l border-slate-200/80 pl-2 dark:border-slate-800/80 sm:pl-3">
              <div
                onClick={() => onNavigate('settings')}
                className="flex cursor-pointer items-center gap-2 rounded-2xl p-1.5 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/80"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 font-bold text-white shadow-xs">
                  {user.name.charAt(0)}
                </div>
                <div className="hidden text-left sm:block">
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    {user.institution.substring(0, 18)}...
                  </p>
                </div>
                <ChevronDown className="hidden h-3.5 w-3.5 text-slate-400 sm:block" />
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
