import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Zap,
  BookOpen,
  Sliders,
  Clock,
  FileCheck,
  Download,
  BrainCircuit,
  Play,
  Layers,
  Shield,
  Star,
  Users,
  GraduationCap,
  ChevronRight,
  FileText,
} from 'lucide-react';

interface LandingPageProps {
  onStartFree: () => void;
  onOpenAuth: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartFree,
  onOpenAuth,
}) => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        {/* Glow Effects */}
        <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 h-[500px] w-full max-w-7xl bg-gradient-to-tr from-violet-600/15 via-indigo-600/10 to-purple-600/5 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-violet-50/80 px-3.5 py-1.5 text-xs font-semibold text-violet-700 shadow-xs backdrop-blur-md dark:border-violet-800/80 dark:bg-violet-950/60 dark:text-violet-300">
            <Sparkles className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
            <span>Next-Gen Bloom's Taxonomy AI Paper Engine 2.0</span>
            <span className="rounded-full bg-violet-600 px-1.5 py-0.5 text-[10px] text-white font-bold">NEW</span>
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
            Automated Question Paper Generator
          </h1>

          {/* Subheading */}
          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 dark:text-slate-300 sm:text-xl">
            Create comprehensive, syllabus-aligned question papers in seconds with AI.
            Formulated according to university standards, Bloom's Taxonomy, and custom difficulty profiles.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={onStartFree}
              className="group flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-violet-500/25 transition-all hover:scale-105 sm:w-auto"
            >
              <Sparkles className="h-5 w-5" />
              <span>Get Started Free</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => setDemoModalOpen(true)}
              className="flex w-full items-center justify-center gap-2.5 rounded-2xl border border-slate-200/80 bg-white/80 px-7 py-4 text-base font-semibold text-slate-700 shadow-xs transition-all hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800 sm:w-auto"
            >
              <Play className="h-4 w-4 text-violet-600 fill-violet-600 dark:text-violet-400 dark:fill-violet-400" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Key Stats Bar */}
          <div className="mt-12 grid grid-cols-2 gap-4 border-y border-slate-200/80 py-6 dark:border-slate-800 md:grid-cols-4">
            <div>
              <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 sm:text-3xl">50,000+</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Papers Generated</p>
            </div>
            <div>
              <p className="text-2xl font-black text-purple-600 dark:text-purple-400 sm:text-3xl">400+</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Institutions & Colleges</p>
            </div>
            <div>
              <p className="text-2xl font-black text-pink-600 dark:text-pink-400 sm:text-3xl">99.2%</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Taxonomy Accuracy</p>
            </div>
            <div>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 sm:text-3xl">&lt; 10s</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Generation Speed</p>
            </div>
          </div>

          {/* Interactive Live Sample Paper Mockup Card */}
          <div className="mt-14 relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-indigo-100 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:p-8 text-left">
            <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-4 dark:border-slate-800 gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Live Generated Preview</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">K.R. Mangalam University — Mid-Term Exam 2026</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Subject: Data Structures & Algorithms (CS201) | Time: 90 Mins | Max Marks: 50</p>
              </div>
              <div className="flex gap-2">
                <span className="rounded-lg bg-purple-100 px-2.5 py-1 text-xs font-bold text-purple-700 dark:bg-purple-950 dark:text-purple-300">Bloom Aligned</span>
                <span className="rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">Verified Format</span>
              </div>
            </div>

            {/* Questions Sample */}
            <div className="mt-5 space-y-4 font-mono text-sm">
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/60 dark:bg-slate-800/60 dark:border-slate-700/60">
                <div className="flex justify-between items-center text-xs font-sans text-slate-500 dark:text-slate-400 mb-1">
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">Q1. Section A (MCQ)</span>
                  <div className="flex gap-2">
                    <span className="rounded bg-indigo-50 dark:bg-indigo-950 px-1.5 py-0.5 text-[10px] text-indigo-700 dark:text-indigo-300 font-sans">Level 2: Understand</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300 font-sans">[2 Marks]</span>
                  </div>
                </div>
                <p className="font-sans font-medium text-slate-800 dark:text-slate-200">
                  What is the worst-case time complexity of searching an element in a balanced Binary Search Tree (BST) with N nodes?
                </p>
                <div className="mt-2.5 grid grid-cols-2 gap-2 text-xs font-sans text-slate-600 dark:text-slate-300">
                  <div className="rounded border border-slate-200 p-1.5 dark:border-slate-700">A) O(1)</div>
                  <div className="rounded border border-indigo-500 bg-indigo-50/50 p-1.5 font-semibold text-indigo-700 dark:border-indigo-400 dark:bg-indigo-950/50 dark:text-indigo-300">B) O(log N) ✓</div>
                  <div className="rounded border border-slate-200 p-1.5 dark:border-slate-700">C) O(N)</div>
                  <div className="rounded border border-slate-200 p-1.5 dark:border-slate-700">D) O(N log N)</div>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/60 dark:bg-slate-800/60 dark:border-slate-700/60">
                <div className="flex justify-between items-center text-xs font-sans text-slate-500 dark:text-slate-400 mb-1">
                  <span className="font-semibold text-purple-600 dark:text-purple-400">Q2. Section C (Descriptive)</span>
                  <div className="flex gap-2">
                    <span className="rounded bg-purple-50 dark:bg-purple-950 px-1.5 py-0.5 text-[10px] text-purple-700 dark:text-purple-300 font-sans">Level 5: Evaluate</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300 font-sans">[10 Marks]</span>
                  </div>
                </div>
                <p className="font-sans font-medium text-slate-800 dark:text-slate-200">
                  Given the 0/1 Knapsack problem with weights W = [2, 3, 4, 5] and values V = [3, 4, 5, 6] with maximum capacity C = 8. Formulate the dynamic programming recurrence relation, construct the DP table, and determine the optimal subset of items selected.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={onStartFree}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-indigo-500"
              >
                <Sparkles className="h-4 w-4" />
                Generate Paper Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              Core Capabilities
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Why Educators Choose Bloomia AI
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
              Designed specifically for professors, schools, and university examination boards requiring balanced, compliant, and zero-repetition tests.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1 */}
            <div className="relative rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 transition-all hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-800/40">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20">
                <BrainCircuit className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">AI Powered</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Uses advanced Gemini 3.6 Flash models to generate balanced questions strictly following Bloom's Taxonomy levels (Remember to Create).
              </p>
            </div>

            {/* Feature 2 */}
            <div className="relative rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 transition-all hover:-translate-y-1 hover:border-purple-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-800/40">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-md shadow-purple-500/20">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">Multiple Subjects</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Pre-loaded with CS, Engineering, Mathematics, and Science curricula. Easily upload custom syllabus units and chapters.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="relative rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 transition-all hover:-translate-y-1 hover:border-pink-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-800/40">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-600 text-white shadow-md shadow-pink-500/20">
                <Sliders className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">Customizable</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Fine-tune difficulty distribution (Easy, Medium, Hard), total marks (20, 50, 100), section titles, and custom exam headers.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="relative rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-800/40">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-500/20">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">Time Saving</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Reduce test creation time from 6 hours to 10 seconds. Instantly export print-ready PDF and editable DOCX formats with answer keys.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-purple-700 dark:bg-purple-950 dark:text-purple-300">
              Flexible Pricing
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Plans for Teachers, Departments, and Universities
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
              Start with free monthly credits, or upgrade for unlimited university paper generation.
            </p>

            {/* Toggle Billing */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <span className={`text-sm font-semibold ${billingCycle === 'monthly' ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>Monthly</span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="relative h-7 w-14 rounded-full bg-indigo-600 p-1 transition-colors"
              >
                <div className={`h-5 w-5 rounded-full bg-white transition-transform ${billingCycle === 'yearly' ? 'translate-x-7' : 'translate-x-0'}`} />
              </button>
              <span className={`text-sm font-semibold ${billingCycle === 'yearly' ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
                Yearly <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">Save 25%</span>
              </span>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Free Tier */}
            <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Free</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">For individual tutors & quick tests</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">$0</span>
                  <span className="ml-1 text-sm text-slate-500">/ forever</span>
                </div>
                <ul className="mt-8 space-y-3.5 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" /> 5 Question Papers / month
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Basic PDF Export
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Standard Subjects included
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Up to 50 Marks per paper
                  </li>
                </ul>
              </div>
              <button
                onClick={onStartFree}
                className="mt-8 w-full rounded-2xl border border-indigo-600 px-4 py-3 text-sm font-bold text-indigo-600 transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-950"
              >
                Get Started Free
              </button>
            </div>

            {/* Pro Tier (Popular) */}
            <div className="relative flex flex-col justify-between rounded-3xl border-2 border-indigo-600 bg-white p-8 shadow-2xl shadow-indigo-500/20 dark:bg-slate-900">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-md">
                Most Popular
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Pro Educator</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">For active professors & departments</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                    {billingCycle === 'yearly' ? '$22' : '$29'}
                  </span>
                  <span className="ml-1 text-sm text-slate-500">/ month</span>
                </div>
                <ul className="mt-8 space-y-3.5 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-indigo-600" /> <strong>Unlimited</strong> AI Question Papers
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-indigo-600" /> Bloom's Taxonomy AI Mapping
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-indigo-600" /> PDF & Editable DOCX Exports
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-indigo-600" /> Full Answer Key & Solutions
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-indigo-600" /> Question Bank & Template Sync
                  </li>
                </ul>
              </div>
              <button
                onClick={onStartFree}
                className="mt-8 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition-all hover:opacity-95"
              >
                Start 14-Day Free Trial
              </button>
            </div>

            {/* Enterprise Tier */}
            <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Enterprise</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">For universities & board exams</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">Custom</span>
                </div>
                <ul className="mt-8 space-y-3.5 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-purple-600" /> University-wide Faculty Seats
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-purple-600" /> Custom AI Model Fine-tuning
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-purple-600" /> SSO, LMS & Canvas Integration
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-purple-600" /> Dedicated Account Manager & SLA
                  </li>
                </ul>
              </div>
              <button
                onClick={onStartFree}
                className="mt-8 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Contact Board Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-lg font-extrabold text-slate-900 dark:text-white">Bloomia AI</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} Bloomia AI Inc. All rights reserved. Bloom's Taxonomy Automated Question Paper System.
            </p>
            <div className="flex gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <a href="#privacy" className="hover:text-indigo-600">Privacy Policy</a>
              <a href="#terms" className="hover:text-indigo-600">Terms of Service</a>
              <a href="#support" className="hover:text-indigo-600">Educator Help Center</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Demo Video Modal */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Play className="h-5 w-5 text-indigo-400 fill-indigo-400" /> Bloomia AI Platform Demo
              </h3>
              <button
                onClick={() => setDemoModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-800"
              >
                ✕
              </button>
            </div>
            <div className="my-6 aspect-video rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center p-8 text-center">
              <div className="h-16 w-16 rounded-full bg-indigo-600/30 flex items-center justify-center text-indigo-400 animate-pulse mb-3">
                <Sparkles className="h-8 w-8" />
              </div>
              <p className="font-bold text-lg text-slate-200">Interactive Paper Generation Demonstration</p>
              <p className="text-xs text-slate-400 mt-2 max-w-md">
                Click "Launch Live Portal" below to experience the full 4-step wizard with real Gemini AI question paper generation in real-time!
              </p>
              <button
                onClick={() => {
                  setDemoModalOpen(false);
                  onStartFree();
                }}
                className="mt-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg"
              >
                Launch Live Portal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
