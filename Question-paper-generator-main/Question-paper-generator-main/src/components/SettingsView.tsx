import React, { useState } from 'react';
import {
  Settings,
  User,
  Building,
  Sparkles,
  ShieldCheck,
  Save,
  Check,
  Bell,
  Key,
} from 'lucide-react';
import { UserProfile } from '../types';

interface SettingsViewProps {
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  user,
  onUpdateUser,
}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [institution, setInstitution] = useState(user.institution);
  const [department, setDepartment] = useState(user.department);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name,
      email,
      institution,
      department,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-12">
      {/* Header */}
      <div className="sleek-card flex flex-col justify-between gap-4 rounded-3xl p-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            Platform & Profile Settings
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Configure professor profile, university exam headers, and AI generation preferences.
          </p>
        </div>

        {saveSuccess && (
          <span className="flex items-center gap-1 rounded-xl bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            <Check className="h-4 w-4" /> Changes Saved!
          </span>
        )}
      </div>

      {/* Subscription Status Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 p-6 text-white shadow-xl sm:p-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/30 px-3 py-1 text-xs font-bold text-indigo-200">
              <ShieldCheck className="h-4 w-4 text-indigo-300" />
              Active Plan: {user.plan}
            </span>
            <h3 className="mt-3 text-2xl font-black">Unlimited Educator Access</h3>
            <p className="mt-1 text-xs text-slate-300">
              Your account has full access to Gemini 3.6 Flash paper generation, PDF/DOCX exports, and unlimited Question Bank storage.
            </p>
          </div>

          <button
            onClick={() => alert('Your Pro Plan is active and renewed automatically.')}
            className="rounded-2xl border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-bold text-white backdrop-blur-md hover:bg-white/20"
          >
            Manage Billing
          </button>
        </div>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base border-b border-slate-100 pb-3 dark:border-slate-800 flex items-center gap-2">
            <User className="h-4 w-4 text-indigo-600" />
            Educator Profile Details
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Full Name & Title
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 px-3 text-xs font-semibold text-slate-800 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                University Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 px-3 text-xs font-semibold text-slate-800 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Institution / College Name
              </label>
              <input
                type="text"
                required
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 px-3 text-xs font-semibold text-slate-800 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Department
              </label>
              <input
                type="text"
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 px-3 text-xs font-semibold text-slate-800 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              />
            </div>
          </div>
        </div>

        {/* AI Preferences */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base border-b border-slate-100 pb-3 dark:border-slate-800 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-600" />
            AI Generation Defaults
          </h3>

          <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
              <div>
                <p className="font-bold">Always generate step-by-step valuation scheme</p>
                <p className="text-[11px] text-slate-500">Includes complete answer key for each section</p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-indigo-600" />
            </div>

            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
              <div>
                <p className="font-bold">Enforce zero-repetition rule across recent papers</p>
                <p className="text-[11px] text-slate-500">Prevents generating duplicate questions from past tests</p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-indigo-600" />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-8 py-3 text-xs font-bold text-white shadow-md hover:bg-indigo-500"
          >
            <Save className="h-4 w-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
