import React from 'react';
import {
  Sparkles,
  FileText,
  Database,
  BookOpen,
  Award,
  ArrowUpRight,
  Plus,
  Clock,
  Download,
  Eye,
  Copy,
  BarChart2,
  CheckCircle2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { AnalyticsData, QuestionPaper, UserProfile } from '../types';

interface DashboardOverviewProps {
  analytics: AnalyticsData;
  recentPapers: QuestionPaper[];
  user: UserProfile;
  onNavigate: (tab: string) => void;
  onViewPaper: (paper: QuestionPaper) => void;
  onDuplicatePaper: (paper: QuestionPaper) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  analytics,
  recentPapers,
  user,
  onNavigate,
  onViewPaper,
  onDuplicatePaper,
}) => {
  return (
    <div className="space-y-6 pb-12">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white shadow-xl border border-slate-800/80 sm:p-8">
        <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-violet-500/20 via-indigo-500/10 to-transparent blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/20 px-3 py-1 text-xs font-bold text-violet-200 backdrop-blur-md ring-1 ring-violet-400/30">
              <Sparkles className="h-3.5 w-3.5 text-violet-300" />
              Bloom's Taxonomy AI Engine Connected
            </span>
            <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
              Welcome back, {user.name}!
            </h1>
            <p className="mt-1 text-xs text-slate-300 sm:text-sm">
              {user.department} • {user.institution}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('generate')}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-violet-500/25 transition-all hover:scale-[1.02] hover:shadow-violet-500/40"
            >
              <Sparkles className="h-4 w-4" />
              <span>Generate New Paper</span>
            </button>
            <button
              onClick={() => onNavigate('question-bank')}
              className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-xs font-semibold text-white backdrop-blur-md hover:bg-white/20 transition-all"
            >
              <Database className="h-4 w-4" />
              <span>Question Bank</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core Stat Widgets */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Stat 1 */}
        <div className="sleek-card relative overflow-hidden rounded-3xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Papers Generated
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 dark:bg-violet-950/80 dark:text-violet-400 ring-1 ring-violet-500/20">
              <FileText className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <p className="text-3xl font-black text-slate-900 dark:text-white">
              {analytics.totalPapers}
            </p>
            <span className="flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="h-3.5 w-3.5" /> +18% mo
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            Across 6 department subjects
          </p>
        </div>

        {/* Stat 2 */}
        <div className="sleek-card relative overflow-hidden rounded-3xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Questions in Bank
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-950/80 dark:text-purple-400 ring-1 ring-purple-500/20">
              <Database className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <p className="text-3xl font-black text-slate-900 dark:text-white">
              {analytics.totalQuestions}
            </p>
            <span className="flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="h-3.5 w-3.5" /> +42 this week
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            Categorized by Bloom level
          </p>
        </div>

        {/* Stat 3 */}
        <div className="sleek-card relative overflow-hidden rounded-3xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active Subjects
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/80 dark:text-indigo-400 ring-1 ring-indigo-500/20">
              <BookOpen className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <p className="text-3xl font-black text-slate-900 dark:text-white">
              {analytics.totalSubjects}
            </p>
            <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              Ready
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            DSA, Python, DBMS, Math & Networks
          </p>
        </div>

        {/* Stat 4 */}
        <div className="sleek-card relative overflow-hidden rounded-3xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Accuracy Score
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/80 dark:text-emerald-400 ring-1 ring-emerald-500/20">
              <Award className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <p className="text-3xl font-black text-slate-900 dark:text-white">
              {analytics.qualityScore}%
            </p>
            <span className="flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" /> Verified
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            Syllabus & taxonomy alignment rating
          </p>
        </div>
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Line Chart Widget */}
        <div className="sleek-card rounded-3xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-slate-800/80">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Question Papers Generated Over Time
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Monthly trends of generated papers and question additions
              </p>
            </div>
            <button
              onClick={() => onNavigate('analytics')}
              className="text-xs font-bold text-violet-600 hover:underline dark:text-violet-400"
            >
              Full Analytics →
            </button>
          </div>

          <div className="mt-6 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.monthlyTrends}>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#020617',
                    borderColor: '#1e293b',
                    borderRadius: '16px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="papers"
                  stroke="#7c3aed"
                  strokeWidth={3}
                  dot={{ fill: '#7c3aed', r: 5 }}
                  activeDot={{ r: 7 }}
                  name="Papers Created"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart Widget */}
        <div className="sleek-card rounded-3xl p-6">
          <div className="pb-4 border-b border-slate-200/60 dark:border-slate-800/80">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Subject Wise Breakdown
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Distribution across active courses
            </p>
          </div>

          <div className="mt-4 h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.subjectDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {analytics.subjectDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#020617',
                    borderColor: '#1e293b',
                    borderRadius: '16px',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 space-y-1.5 text-xs">
            {analytics.subjectDistribution.slice(0, 3).map((sub) => (
              <div key={sub.name} className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: sub.color }} />
                  <span className="truncate max-w-[140px] font-medium">{sub.name}</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-slate-200">{sub.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Question Papers Feed */}
      <div className="sleek-card rounded-3xl p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-slate-800/80">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Recent Generated Papers
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              View, preview, download, or duplicate recent examination papers
            </p>
          </div>
          <button
            onClick={() => onNavigate('previous-papers')}
            className="text-xs font-bold text-violet-600 hover:underline dark:text-violet-400"
          >
            View All ({recentPapers.length}) →
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {recentPapers.map((paper) => (
            <div
              key={paper.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200/60 bg-slate-50/50 p-4 transition-all hover:bg-slate-100/70 dark:border-slate-800/80 dark:bg-slate-900/40 dark:hover:bg-slate-900/80"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-lg bg-violet-100 px-2 py-0.5 text-[10px] font-bold text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                    {paper.courseCode}
                  </span>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {paper.title}
                  </h4>
                  <span className="rounded-md bg-purple-50 px-2 py-0.5 text-[10px] font-medium text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                    {paper.totalMarks} Marks
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {paper.subjectName} • {paper.durationMinutes} Mins • Created: {paper.createdAt}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onViewPaper(paper)}
                  className="flex items-center gap-1.5 rounded-2xl border border-slate-200/80 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <Eye className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
                  <span>Preview</span>
                </button>
                <button
                  onClick={() => onDuplicatePaper(paper)}
                  className="flex items-center gap-1.5 rounded-2xl border border-slate-200/80 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <Copy className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                  <span>Duplicate</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
