import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Sparkles,
  Award,
  Clock,
  BookOpen,
  ArrowRight,
  X,
  Check,
  CheckCircle2,
} from 'lucide-react';
import { PaperTemplate, Subject, DifficultyLevel } from '../types';

interface TemplatesViewProps {
  templates: PaperTemplate[];
  subjects: Subject[];
  onCreateTemplate: (tmpl: PaperTemplate) => void;
  onUseTemplate: (tmpl: PaperTemplate) => void;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({
  templates,
  subjects,
  onCreateTemplate,
  onUseTemplate,
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Modal form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [subjectId, setSubjectId] = useState(subjects[0]?.id || 'dsa');
  const [totalMarks, setTotalMarks] = useState(50);
  const [durationMinutes, setDurationMinutes] = useState(90);
  const [difficulty, setDifficulty] = useState<DifficultyLevel | 'Mixed'>('Medium');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const subj = subjects.find((s) => s.id === subjectId);

    const newTmpl: PaperTemplate = {
      id: `tmpl-${Date.now()}`,
      name: name || 'Standard Exam Format',
      description: description || 'Custom university paper template layout.',
      subjectId,
      subjectName: subj?.name || 'Data Structures & Algorithms',
      totalMarks,
      durationMinutes,
      difficulty,
      questionTypesSummary: '5 MCQs, 3 Short, 2 Long Answers',
      bloomFocus: '40% Apply, 30% Understand, 30% Analyze',
      config: {
        totalMarks,
        durationMinutes,
        difficulty,
      },
      createdAt: new Date().toISOString().split('T')[0],
    };

    onCreateTemplate(newTmpl);
    setShowCreateModal(false);
    setName('');
    setDescription('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="sleek-card flex flex-col justify-between gap-4 rounded-3xl p-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            Reusable Exam Templates
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Save standard department exam blueprints (Mid-Terms, Finals, Quizzes) to generate in 1-click.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-1.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-violet-500/20 hover:scale-[1.02] transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Template</span>
        </button>
      </div>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((tmpl) => (
          <div
            key={tmpl.id}
            className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-indigo-100 px-2.5 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  {tmpl.subjectName}
                </span>
                <span className="rounded-md bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                  {tmpl.difficulty}
                </span>
              </div>

              <h3 className="mt-4 font-extrabold text-slate-900 dark:text-white text-base">
                {tmpl.name}
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                {tmpl.description}
              </p>

              <div className="mt-4 space-y-2 rounded-2xl bg-slate-50/80 p-3 text-xs text-slate-600 dark:bg-slate-800/50 dark:text-slate-300">
                <div className="flex justify-between font-semibold">
                  <span>Marks & Duration:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {tmpl.totalMarks} Marks • {tmpl.durationMinutes} Mins
                  </span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Questions Format:</span>
                  <span className="truncate max-w-[150px]">{tmpl.questionTypesSummary}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Bloom's Emphasis:</span>
                  <span className="truncate max-w-[150px] text-purple-600 dark:text-purple-400">
                    {tmpl.bloomFocus}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onUseTemplate(tmpl)}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 text-xs font-bold text-white shadow-md hover:bg-indigo-500"
            >
              <Sparkles className="h-4 w-4" />
              <span>Use Template to Generate Paper</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Create Template Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                Create Exam Template
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Template Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mid-Term 50 Marks Standard"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 font-semibold dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Format guidelines for this template..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 font-medium dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Subject
                  </label>
                  <select
                    value={subjectId}
                    onChange={(e) => setSubjectId(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2 font-semibold dark:border-slate-700 dark:bg-slate-800"
                  >
                    {subjects.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Difficulty
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 p-2 font-semibold dark:border-slate-700 dark:bg-slate-800"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                    <option value="Mixed">Mixed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Total Marks
                  </label>
                  <input
                    type="number"
                    value={totalMarks}
                    onChange={(e) => setTotalMarks(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 p-2 font-bold dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Duration (Mins)
                  </label>
                  <input
                    type="number"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 p-2 font-bold dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 font-semibold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-5 py-2 font-bold text-white hover:bg-indigo-500"
                >
                  Save Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
