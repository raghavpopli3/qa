import React, { useState } from 'react';
import {
  Database,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit2,
  Upload,
  Download,
  X,
  Check,
  Tag,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { Question, Subject, BloomLevel, DifficultyLevel, QuestionType } from '../types';

interface QuestionBankProps {
  questions: Question[];
  subjects: Subject[];
  onAddQuestion: (q: Question) => void;
  onDeleteQuestion: (id: string) => void;
}

export const QuestionBank: React.FC<QuestionBankProps> = ({
  questions,
  subjects,
  onAddQuestion,
  onDeleteQuestion,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [bloomFilter, setBloomFilter] = useState('all');

  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);

  // New question state
  const [newSubjId, setNewSubjId] = useState(subjects[0]?.id || 'dsa');
  const [newChapter, setNewChapter] = useState(subjects[0]?.chapters[0] || 'Unit 1');
  const [newType, setNewType] = useState<QuestionType>('Short Answer');
  const [newBloom, setNewBloom] = useState<BloomLevel>('Apply');
  const [newDiff, setNewDiff] = useState<DifficultyLevel>('Medium');
  const [newMarks, setNewMarks] = useState(5);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newAnswerKey, setNewAnswerKey] = useState('');

  // Filter questions
  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.questionText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.chapter.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = subjectFilter === 'all' || q.subjectId === subjectFilter;
    const matchesDiff = difficultyFilter === 'all' || q.difficulty === difficultyFilter;
    const matchesBloom = bloomFilter === 'all' || q.bloomLevel === bloomFilter;

    return matchesSearch && matchesSubject && matchesDiff && matchesBloom;
  });

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    const subj = subjects.find((s) => s.id === newSubjId);

    const q: Question = {
      id: `q-${Date.now()}`,
      subjectId: newSubjId,
      subjectName: subj?.name || 'Data Structures & Algorithms',
      chapter: newChapter,
      type: newType,
      bloomLevel: newBloom,
      difficulty: newDiff,
      marks: newMarks,
      questionText: newQuestionText,
      answerKey: newAnswerKey,
      createdAt: new Date().toISOString().split('T')[0],
    };

    onAddQuestion(q);
    setShowAddModal(false);
    setNewQuestionText('');
    setNewAnswerKey('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Bar */}
      <div className="sleek-card flex flex-col justify-between gap-4 rounded-3xl p-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Database className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            Curriculum Question Bank
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage, tag, and organize repository questions by Bloom's Taxonomy & Difficulty.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowBulkModal(true)}
            className="flex items-center gap-1.5 rounded-2xl border border-slate-200/80 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          >
            <Upload className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
            <span>Bulk Upload CSV</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-violet-500/20 hover:scale-[1.02] transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>Add Question</span>
          </button>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="sleek-card grid grid-cols-1 gap-3 rounded-3xl p-4 sm:grid-cols-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search questions or chapters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl border border-slate-200/80 bg-slate-100/60 py-2 pl-9 pr-3 text-xs text-slate-800 focus:border-violet-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200"
          />
        </div>

        {/* Subject Filter */}
        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="rounded-2xl border border-slate-200/80 bg-slate-100/60 py-2 px-3 text-xs font-semibold text-slate-800 focus:border-violet-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200"
        >
          <option value="all">All Subjects</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        {/* Difficulty Filter */}
        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="rounded-2xl border border-slate-200/80 bg-slate-100/60 py-2 px-3 text-xs font-semibold text-slate-800 focus:border-violet-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200"
        >
          <option value="all">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        {/* Bloom Level Filter */}
        <select
          value={bloomFilter}
          onChange={(e) => setBloomFilter(e.target.value)}
          className="rounded-2xl border border-slate-200/80 bg-slate-100/60 py-2 px-3 text-xs font-semibold text-slate-800 focus:border-violet-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200"
        >
          <option value="all">All Bloom Levels</option>
          <option value="Remember">Remember</option>
          <option value="Understand">Understand</option>
          <option value="Apply">Apply</option>
          <option value="Analyze">Analyze</option>
          <option value="Evaluate">Evaluate</option>
          <option value="Create">Create</option>
        </select>
      </div>

      {/* Questions Cards List */}
      <div className="space-y-3">
        {filteredQuestions.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center text-slate-500 dark:border-slate-700">
            <Database className="mx-auto h-10 w-10 text-slate-400 mb-2" />
            <p className="font-bold text-sm">No questions found matching criteria</p>
            <p className="text-xs">Try adjusting your search terms or filters.</p>
          </div>
        ) : (
          filteredQuestions.map((q) => (
            <div
              key={q.id}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:border-indigo-200 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-lg bg-indigo-100 px-2 py-0.5 font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    {q.subjectName}
                  </span>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    {q.chapter}
                  </span>
                  <span className="rounded bg-purple-100 px-2 py-0.5 font-bold text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                    {q.bloomLevel}
                  </span>
                  <span className="rounded bg-amber-100 px-2 py-0.5 font-semibold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    {q.difficulty}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-bold text-xs text-indigo-600 dark:text-indigo-400">
                    [{q.marks} Marks]
                  </span>
                  <button
                    onClick={() => onDeleteQuestion(q.id)}
                    className="rounded-lg p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40"
                    title="Delete Question"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="mt-3 text-sm font-medium text-slate-800 dark:text-slate-200">
                {q.questionText}
              </p>

              {q.options && q.options.length > 0 && (
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
                  {q.options.map((opt, idx) => (
                    <div key={idx} className="rounded border border-slate-200 p-1.5 dark:border-slate-800">
                      {opt}
                    </div>
                  ))}
                </div>
              )}

              {q.answerKey && (
                <div className="mt-3 rounded-xl bg-purple-50/60 p-2.5 text-xs text-purple-900 dark:bg-purple-950/30 dark:text-purple-300">
                  <span className="font-bold uppercase text-[10px] text-purple-700">Answer Key: </span>
                  {q.answerKey}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add New Question Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                Add Question to Bank
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateQuestion} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Subject
                  </label>
                  <select
                    value={newSubjId}
                    onChange={(e) => {
                      setNewSubjId(e.target.value);
                      const s = subjects.find((sb) => sb.id === e.target.value);
                      if (s && s.chapters[0]) setNewChapter(s.chapters[0]);
                    }}
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
                    Chapter / Unit
                  </label>
                  <select
                    value={newChapter}
                    onChange={(e) => setNewChapter(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2 font-semibold dark:border-slate-700 dark:bg-slate-800"
                  >
                    {subjects
                      .find((s) => s.id === newSubjId)
                      ?.chapters.map((ch, idx) => (
                        <option key={idx} value={ch}>
                          {ch}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Bloom's Level
                  </label>
                  <select
                    value={newBloom}
                    onChange={(e) => setNewBloom(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 p-2 font-semibold dark:border-slate-700 dark:bg-slate-800"
                  >
                    <option value="Remember">Remember</option>
                    <option value="Understand">Understand</option>
                    <option value="Apply">Apply</option>
                    <option value="Analyze">Analyze</option>
                    <option value="Evaluate">Evaluate</option>
                    <option value="Create">Create</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Difficulty
                  </label>
                  <select
                    value={newDiff}
                    onChange={(e) => setNewDiff(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 p-2 font-semibold dark:border-slate-700 dark:bg-slate-800"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Marks
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={25}
                    value={newMarks}
                    onChange={(e) => setNewMarks(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 p-2 font-bold dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Question Prompt Text
                </label>
                <textarea
                  rows={3}
                  required
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  placeholder="Enter clear, unambiguous academic question text..."
                  className="w-full rounded-xl border border-slate-200 p-2.5 font-medium dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Answer Key / Solution Scheme
                </label>
                <textarea
                  rows={2}
                  value={newAnswerKey}
                  onChange={(e) => setNewAnswerKey(e.target.value)}
                  placeholder="Steps or key points for valuation..."
                  className="w-full rounded-xl border border-slate-200 p-2.5 font-medium dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 font-semibold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-5 py-2 font-bold text-white hover:bg-indigo-500"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Upload Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                Bulk Upload Questions (CSV)
              </h3>
              <button
                onClick={() => setShowBulkModal(false)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="my-6 space-y-4 text-center">
              <div className="rounded-2xl border-2 border-dashed border-indigo-300 bg-indigo-50/50 p-8 dark:border-indigo-800 dark:bg-indigo-950/20">
                <Upload className="mx-auto h-8 w-8 text-indigo-600 dark:text-indigo-400 mb-2" />
                <p className="font-bold text-xs text-slate-800 dark:text-slate-200">
                  Drag and drop CSV file here
                </p>
                <p className="text-[10px] text-slate-500 mt-1">
                  Format: Subject, Chapter, BloomLevel, Difficulty, Marks, QuestionText, AnswerKey
                </p>
                <button
                  onClick={() => {
                    alert('Sample CSV questions imported successfully!');
                    setShowBulkModal(false);
                  }}
                  className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm"
                >
                  Upload & Import Sample CSV
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
