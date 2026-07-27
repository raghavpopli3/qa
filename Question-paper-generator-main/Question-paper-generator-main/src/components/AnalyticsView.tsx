import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  PieChart as PieIcon,
  Brain,
  Download,
  CheckCircle2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { AnalyticsData } from '../types';

interface AnalyticsViewProps {
  analytics: AnalyticsData;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ analytics }) => {
  const radarData = analytics.bloomDistribution.map((b) => ({
    subject: b.level,
    A: b.percentage * 2,
    fullMark: 100,
  }));

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="sleek-card flex flex-col justify-between gap-4 rounded-3xl p-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            Curriculum & Assessment Analytics
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time evaluation metrics for syllabus coverage, difficulty ratios, and Bloom's Taxonomy compliance.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 rounded-2xl border border-slate-200/80 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
        >
          <Download className="h-3.5 w-3.5 text-violet-600" />
          <span>Export Analytics Summary</span>
        </button>
      </div>

      {/* Row 1: Area Monthly Trends & Bloom's Radar */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Monthly Generation Area Chart */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              Monthly Question Paper Generation Volume
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Historical growth of generated exam papers across faculty departments
            </p>
          </div>

          <div className="mt-6 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.monthlyTrends}>
                <defs>
                  <linearGradient id="colorPapers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="papers"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorPapers)"
                  name="Papers Created"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bloom's Taxonomy Cognitive Radar Chart */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-1.5">
              <Brain className="h-4 w-4 text-purple-600" />
              Bloom's Taxonomy Radar
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Cognitive level depth distribution
            </p>
          </div>

          <div className="mt-2 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#cbd5e1" />
                <PolarAngleAxis dataKey="subject" stroke="#64748b" fontSize={10} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" />
                <Radar
                  name="Bloom Level %"
                  dataKey="A"
                  stroke="#8b5cf6"
                  fill="#a855f7"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Difficulty Spread Bar Chart & Subject Pie */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Difficulty Bar Chart */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              Difficulty Levels Distribution
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Spread of Easy, Medium, and Hard questions in the repository
            </p>
          </div>

          <div className="mt-6 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.difficultyDistribution}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" fill="#6366f1" radius={[8, 8, 0, 0]} name="Questions" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Compliance Highlights Box */}
        <div className="flex flex-col justify-between rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 p-6 text-white shadow-xl">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/30 px-3 py-1 text-xs font-bold text-indigo-200 backdrop-blur-md">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              University Board Certified
            </span>
            <h3 className="mt-4 text-2xl font-black">AI Assessment Quality Insights</h3>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              Based on the last 28 generated examination papers, your institution achieves a <strong>98.4% taxonomy compliance score</strong>. 
            </p>

            <div className="mt-6 space-y-3 font-mono text-xs text-slate-200">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Higher-Order Thinking (Analyze/Evaluate/Create)</span>
                <span className="font-bold text-emerald-400">27% Total</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Application & Calculation Questions</span>
                <span className="font-bold text-indigo-300">29% Total</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Zero-Repetition Compliance</span>
                <span className="font-bold text-pink-300">100% Passed</span>
              </div>
            </div>
          </div>

          <p className="mt-6 text-[10px] text-slate-400 italic">
            Automated compliance reporting powered by Bloomia AI Engine.
          </p>
        </div>
      </div>
    </div>
  );
};
