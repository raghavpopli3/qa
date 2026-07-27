import React, { useState } from 'react';
import {
  Sparkles,
  Check,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Sliders,
  FileCheck,
  Download,
  RotateCcw,
  Save,
  FileText,
  Plus,
  Info,
  CheckCircle2,
  Brain,
  AlertCircle,
  Eye,
  EyeOff,
  Printer,
  Copy,
  Edit3,
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  Subject,
  PaperConfig,
  QuestionPaper,
  BloomLevel,
  DifficultyLevel,
} from '../types';

interface GeneratePaperWizardProps {
  subjects: Subject[];
  onPaperGenerated: (paper: QuestionPaper) => void;
  onSaveToArchive: (paper: QuestionPaper) => void;
  initialConfig?: Partial<PaperConfig>;
}

export const GeneratePaperWizard: React.FC<GeneratePaperWizardProps> = ({
  subjects,
  onPaperGenerated,
  onSaveToArchive,
  initialConfig,
}) => {
  const [step, setStep] = useState<number>(1);

  // Step 1 State: Subject Selection
  const [selectedSubject, setSelectedSubject] = useState<Subject>(subjects[0]);
  const [customSubjectName, setCustomSubjectName] = useState('');
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);

  // Step 2 State: Chapters Selection
  const [selectedChapters, setSelectedChapters] = useState<string[]>(
    subjects[0]?.chapters || []
  );

  // Step 3 State: Exam & AI Configuration
  const [institutionName, setInstitutionName] = useState('K.R. Mangalam University');
  const [courseCode, setCourseCode] = useState(subjects[0]?.code || 'CS201');
  const [totalMarks, setTotalMarks] = useState<number>(initialConfig?.totalMarks || 50);
  const [durationMinutes, setDurationMinutes] = useState<number>(initialConfig?.durationMinutes || 90);
  const [difficulty, setDifficulty] = useState<DifficultyLevel | 'Mixed'>(
    initialConfig?.difficulty || 'Mixed'
  );

  // Difficulty percentage ratios
  const [easyRatio, setEasyRatio] = useState(30);
  const [mediumRatio, setMediumRatio] = useState(50);
  const [hardRatio, setHardRatio] = useState(20);

  // Question counts
  const [mcqCount, setMcqCount] = useState(5);
  const [mcqMarks, setMcqMarks] = useState(2);
  const [shortCount, setShortCount] = useState(3);
  const [shortMarks, setShortMarks] = useState(5);
  const [longCount, setLongCount] = useState(2);
  const [longMarks, setLongMarks] = useState(12.5);

  // Bloom's Taxonomy percentages
  const [bloomDistribution, setBloomDistribution] = useState<Record<BloomLevel, number>>({
    Remember: 15,
    Understand: 25,
    Apply: 30,
    Analyze: 15,
    Evaluate: 10,
    Create: 5,
  });

  const [generalInstructions, setGeneralInstructions] = useState<string[]>([
    'All questions in Section A are compulsory.',
    'Answer any 3 questions from Section B.',
    'Draw neat diagrams wherever necessary.',
    'Assume suitable data if missing and state assumptions clearly.',
  ]);

  // Step 4 State: Generated Output
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPaper, setGeneratedPaper] = useState<QuestionPaper | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Handle subject change
  const handleSelectSubject = (subj: Subject) => {
    setSelectedSubject(subj);
    setCourseCode(subj.code);
    setSelectedChapters(subj.chapters);
  };

  // Toggle chapter selection
  const toggleChapter = (chapter: string) => {
    if (selectedChapters.includes(chapter)) {
      if (selectedChapters.length > 1) {
        setSelectedChapters(selectedChapters.filter((c) => c !== chapter));
      }
    } else {
      setSelectedChapters([...selectedChapters, chapter]);
    }
  };

  // Handle AI Paper Generation Call
  const handleGeneratePaper = async () => {
    setIsGenerating(true);
    setGenerationError(null);
    setStep(4);

    try {
      const response = await fetch('/api/generate-paper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          institutionName,
          courseCode,
          subjectName: selectedSubject.name,
          selectedChapters,
          totalMarks,
          durationMinutes,
          difficulty,
          difficultyRatio: { easy: easyRatio, medium: mediumRatio, hard: hardRatio },
          questionTypes: {
            mcqCount,
            mcqMarks,
            shortCount,
            shortMarks,
            longCount,
            longMarks,
          },
          bloomDistribution,
          generalInstructions,
        }),
      });

      const data = await response.json();

      if (!data.success || !data.paper) {
        throw new Error(data.error || 'Failed to generate paper.');
      }

      setGeneratedPaper(data.paper);
      onPaperGenerated(data.paper);
    } catch (err: any) {
      console.error('Paper generation error:', err);
      setGenerationError(err.message || 'Error communicating with AI server');
    } finally {
      setIsGenerating(false);
    }
  };

  // Save Paper
  const handleSavePaper = () => {
    if (generatedPaper) {
      const updatedPaper = { ...generatedPaper, isSaved: true };
      setGeneratedPaper(updatedPaper);
      onSaveToArchive(updatedPaper);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  // PDF Export Function
  const handleDownloadPDF = async () => {
    const paperElement = document.getElementById('printable-question-paper');
    if (!paperElement) return;

    try {
      const canvas = await html2canvas(paperElement, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${selectedSubject.code}_Question_Paper_${totalMarks}Marks.pdf`);
    } catch (e) {
      console.error('PDF export failed, falling back to print window:', e);
      window.print();
    }
  };

  // DOCX Export Function
  const handleExportDOCX = () => {
    if (!generatedPaper) return;

    let textContent = `${generatedPaper.institutionName.toUpperCase()}\n`;
    textContent += `COURSE: ${generatedPaper.subjectName} (${generatedPaper.courseCode})\n`;
    textContent += `TIME: ${generatedPaper.durationMinutes} MINUTES | MAXIMUM MARKS: ${generatedPaper.totalMarks}\n`;
    textContent += `=========================================================\n\n`;
    textContent += `GENERAL INSTRUCTIONS:\n`;
    generatedPaper.generalInstructions.forEach((inst, idx) => {
      textContent += `${idx + 1}. ${inst}\n`;
    });
    textContent += `\n`;

    generatedPaper.sections.forEach((sec) => {
      textContent += `\n${sec.title.toUpperCase()}\n`;
      textContent += `${sec.instructions}\n`;
      textContent += `---------------------------------------------------------\n`;

      sec.questions.forEach((q, idx) => {
        textContent += `\nQ${idx + 1}. (${q.bloomLevel} | ${q.marks} Marks) ${q.questionText}\n`;
        if (q.options && q.options.length > 0) {
          q.options.forEach((opt) => {
            textContent += `     ${opt}\n`;
          });
        }
        if (showAnswers && q.answerKey) {
          textContent += `   [ANSWER KEY & SCHEME]: ${q.answerKey}\n`;
        }
      });
    });

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${generatedPaper.courseCode}_Question_Paper.docx`;
    link.click();
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-16">
      {/* Wizard Step Progress Header */}
      <div className="sleek-card rounded-3xl p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-violet-600 dark:text-violet-400 animate-pulse" />
              Generate Question Paper
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              4-Step Automated AI Paper Studio
            </p>
          </div>
          <span className="rounded-full bg-violet-100/80 px-3 py-1 text-xs font-bold text-violet-700 ring-1 ring-violet-500/20 dark:bg-violet-950/80 dark:text-violet-300">
            Step {step} of 4
          </span>
        </div>

        {/* Step Indicators */}
        <div className="mt-6 grid grid-cols-4 gap-2 border-t border-slate-200/60 pt-4 dark:border-slate-800/80">
          {[
            { num: 1, label: 'Subject', icon: BookOpen },
            { num: 2, label: 'Chapters', icon: FileText },
            { num: 3, label: 'Configure', icon: Sliders },
            { num: 4, label: 'AI Preview', icon: FileCheck },
          ].map((s) => {
            const Icon = s.icon;
            const isDone = step > s.num;
            const isCurrent = step === s.num;

            return (
              <div
                key={s.num}
                onClick={() => {
                  if (s.num < step) setStep(s.num);
                }}
                className={`flex items-center gap-2 rounded-2xl p-2.5 transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20 ring-1 ring-white/10'
                    : isDone
                    ? 'bg-violet-50/80 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300'
                    : 'bg-slate-100/60 text-slate-400 dark:bg-slate-900/40'
                }`}
              >
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    isCurrent
                      ? 'bg-white text-violet-600'
                      : isDone
                      ? 'bg-violet-600 text-white'
                      : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {isDone ? <Check className="h-3.5 w-3.5" /> : s.num}
                </div>
                <span className="hidden text-xs font-bold sm:block">{s.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 1: SELECT SUBJECT */}
      {step === 1 && (
        <div className="sleek-card space-y-6 rounded-3xl p-6">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Step 1: Choose Target Subject
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Select an academic subject module or add your own custom course syllabus.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subj) => {
              const isSelected = selectedSubject.id === subj.id;

              return (
                <div
                  key={subj.id}
                  onClick={() => handleSelectSubject(subj)}
                  className={`relative cursor-pointer rounded-2xl border p-5 transition-all ${
                    isSelected
                      ? 'border-2 border-violet-600 bg-violet-50/50 shadow-md dark:border-violet-500 dark:bg-violet-950/40'
                      : 'border-slate-200/80 bg-white/60 hover:border-violet-300 dark:border-slate-800 dark:bg-slate-900/40'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-white shadow-xs">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                  )}
                  <span className="rounded-lg bg-violet-100 px-2 py-0.5 text-[10px] font-bold text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                    {subj.code}
                  </span>
                  <h4 className="mt-2 font-bold text-slate-900 dark:text-white text-base">
                    {subj.name}
                  </h4>
                  <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                    {subj.description}
                  </p>
                  <p className="mt-3 text-[11px] font-semibold text-violet-600 dark:text-violet-400">
                    {subj.chapters.length} Syllabus Units
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-200/60 dark:border-slate-800/80">
            <span className="text-xs text-slate-500">Selected: <strong>{selectedSubject.name} ({selectedSubject.code})</strong></span>
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-md shadow-violet-500/20 hover:scale-[1.02] transition-all"
            >
              <span>Next: Select Chapters</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: SELECT CHAPTERS */}
      {step === 2 && (
        <div className="space-y-6 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex justify-between items-start">
            <div>
              <span className="rounded-lg bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                {selectedSubject.code}
              </span>
              <h3 className="mt-1 text-lg font-extrabold text-slate-900 dark:text-white">
                Step 2: Select Syllabus Units & Chapters
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Questions will be generated proportionally across all selected chapters.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedChapters([...selectedSubject.chapters])}
                className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Select All
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {selectedSubject.chapters.map((ch, idx) => {
              const isChecked = selectedChapters.includes(ch);

              return (
                <div
                  key={idx}
                  onClick={() => toggleChapter(ch)}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ${
                    isChecked
                      ? 'border-indigo-500 bg-indigo-50/50 dark:border-indigo-500 dark:bg-indigo-950/30'
                      : 'border-slate-200/80 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                        isChecked
                          ? 'border-indigo-600 bg-indigo-600 text-white'
                          : 'border-slate-300 dark:border-slate-600'
                      }`}
                    >
                      {isChecked && <Check className="h-3.5 w-3.5" />}
                    </div>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      {ch}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    Active
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-1.5 rounded-2xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Back</span>
            </button>

            <button
              onClick={() => setStep(3)}
              className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-indigo-500"
            >
              <span>Next: Configure Paper Parameters</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: CONFIGURE EXAM & BLOOM'S TAXONOMY */}
      {step === 3 && (
        <div className="space-y-6 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Step 3: Exam Format & Bloom's Taxonomy Profile
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Configure marks allocation, question counts, difficulty ratios, and cognitive Bloom levels.
            </p>
          </div>

          {/* Exam Header Meta */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Institution / University Name
              </label>
              <input
                type="text"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 px-3 text-xs font-semibold text-slate-800 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Course Code
              </label>
              <input
                type="text"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 px-3 text-xs font-semibold text-slate-800 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              />
            </div>
          </div>

          {/* Marks & Duration */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Total Marks
              </label>
              <div className="flex gap-2">
                {[20, 40, 50, 60, 100].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setTotalMarks(m)}
                    className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${
                      totalMarks === m
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Duration (Minutes)
              </label>
              <select
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 px-3 text-xs font-semibold text-slate-800 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                <option value={30}>30 Minutes (Quiz)</option>
                <option value={60}>60 Minutes (1 Hour)</option>
                <option value={90}>90 Minutes (Mid-Sem)</option>
                <option value={120}>120 Minutes (2 Hours)</option>
                <option value={180}>180 Minutes (3 Hours Final)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Overall Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 px-3 text-xs font-semibold text-slate-800 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                <option value="Easy">Easy Level</option>
                <option value="Medium">Medium Standard</option>
                <option value="Hard">Hard / Competitive</option>
                <option value="Mixed">Mixed Proportional</option>
              </select>
            </div>
          </div>

          {/* Question Type Counts */}
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-3">
              Question Types & Marks Allocation
            </h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {/* Section A: MCQs */}
              <div className="rounded-xl bg-white p-3 border border-slate-200 dark:bg-slate-900 dark:border-slate-700">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">Section A: MCQs</span>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-500">Count</span>
                    <input
                      type="number"
                      min={0}
                      max={20}
                      value={mcqCount}
                      onChange={(e) => setMcqCount(Number(e.target.value))}
                      className="w-full rounded-lg border border-slate-200 p-1 text-xs font-bold text-center dark:border-slate-700 dark:bg-slate-800"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">Marks Each</span>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      value={mcqMarks}
                      onChange={(e) => setMcqMarks(Number(e.target.value))}
                      className="w-full rounded-lg border border-slate-200 p-1 text-xs font-bold text-center dark:border-slate-700 dark:bg-slate-800"
                    />
                  </div>
                </div>
              </div>

              {/* Section B: Short Answers */}
              <div className="rounded-xl bg-white p-3 border border-slate-200 dark:bg-slate-900 dark:border-slate-700">
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400">Section B: Short Answers</span>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-500">Count</span>
                    <input
                      type="number"
                      min={0}
                      max={10}
                      value={shortCount}
                      onChange={(e) => setShortCount(Number(e.target.value))}
                      className="w-full rounded-lg border border-slate-200 p-1 text-xs font-bold text-center dark:border-slate-700 dark:bg-slate-800"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">Marks Each</span>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={shortMarks}
                      onChange={(e) => setShortMarks(Number(e.target.value))}
                      className="w-full rounded-lg border border-slate-200 p-1 text-xs font-bold text-center dark:border-slate-700 dark:bg-slate-800"
                    />
                  </div>
                </div>
              </div>

              {/* Section C: Long Answers */}
              <div className="rounded-xl bg-white p-3 border border-slate-200 dark:bg-slate-900 dark:border-slate-700">
                <span className="text-xs font-bold text-pink-600 dark:text-pink-400">Section C: Long Answers</span>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-500">Count</span>
                    <input
                      type="number"
                      min={0}
                      max={10}
                      value={longCount}
                      onChange={(e) => setLongCount(Number(e.target.value))}
                      className="w-full rounded-lg border border-slate-200 p-1 text-xs font-bold text-center dark:border-slate-700 dark:bg-slate-800"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">Marks Each</span>
                    <input
                      type="number"
                      min={5}
                      max={25}
                      value={longMarks}
                      onChange={(e) => setLongMarks(Number(e.target.value))}
                      className="w-full rounded-lg border border-slate-200 p-1 text-xs font-bold text-center dark:border-slate-700 dark:bg-slate-800"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bloom's Taxonomy Distribution Sliders */}
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4 dark:border-slate-800 dark:bg-indigo-950/20">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Brain className="h-4 w-4 text-indigo-600" />
                Bloom's Taxonomy Cognitive Distribution (%)
              </h4>
              <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                Total Weight: 100%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {(
                [
                  'Remember',
                  'Understand',
                  'Apply',
                  'Analyze',
                  'Evaluate',
                  'Create',
                ] as BloomLevel[]
              ).map((lvl) => (
                <div key={lvl} className="rounded-xl bg-white p-2.5 border border-slate-200/80 dark:bg-slate-900 dark:border-slate-700">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-800 dark:text-slate-200">
                    <span>{lvl}</span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400">{bloomDistribution[lvl]}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={50}
                    value={bloomDistribution[lvl]}
                    onChange={(e) =>
                      setBloomDistribution({
                        ...bloomDistribution,
                        [lvl]: Number(e.target.value),
                      })
                    }
                    className="w-full mt-2 accent-indigo-600 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-1.5 rounded-2xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleGeneratePaper}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-8 py-3.5 text-xs font-extrabold text-white shadow-lg shadow-indigo-500/30 hover:scale-105"
            >
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>Generate Paper with AI</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: PREVIEW & EXPORT OUTPUT */}
      {step === 4 && (
        <div className="space-y-6">
          {/* Loading Animation State */}
          {isGenerating && (
            <div className="rounded-3xl border border-indigo-100 bg-white p-12 text-center shadow-xl dark:border-slate-800 dark:bg-slate-900 space-y-6">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white shadow-2xl shadow-indigo-500/40 animate-bounce">
                <Brain className="h-10 w-10 animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Generating AI Question Paper...
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                  Gemini 3.6 Flash engine is organizing syllabus chapters, balancing Bloom's Taxonomy cognitive levels, and generating solution schemes.
                </p>
              </div>

              <div className="mx-auto max-w-md space-y-2 text-left font-mono text-xs">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Checking syllabus chapter coverage: {selectedChapters.length} units</span>
                </div>
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Mapping Bloom's levels (Remember to Create)</span>
                </div>
                <div className="flex items-center gap-2 text-pink-600 dark:text-pink-400">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Structuring Sections A, B & C with marking keys</span>
                </div>
              </div>
            </div>
          )}

          {/* Error State */}
          {!isGenerating && generationError && (
            <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300">
              <div className="flex items-center gap-2 font-bold text-sm">
                <AlertCircle className="h-5 w-5 text-rose-600" />
                <span>Question Paper Generation Error</span>
              </div>
              <p className="text-xs mt-1">{generationError}</p>
              <button
                onClick={handleGeneratePaper}
                className="mt-4 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-rose-500"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Generated Paper View */}
          {!isGenerating && generatedPaper && (
            <div className="space-y-6">
              {/* Action Control Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-indigo-100 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAnswers(!showAnswers)}
                    className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition-all ${
                      showAnswers
                        ? 'border-purple-600 bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {showAnswers ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    <span>{showAnswers ? 'Hide Answer Keys' : 'Show Answer Keys'}</span>
                  </button>

                  {saveSuccess && (
                    <span className="flex items-center gap-1 rounded-xl bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      <Check className="h-3.5 w-3.5" /> Saved to Previous Papers!
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleGeneratePaper}
                    className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    <RotateCcw className="h-3.5 w-3.5 text-indigo-600" />
                    <span>Regenerate</span>
                  </button>

                  <button
                    onClick={handleSavePaper}
                    className="flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-700 shadow-2xs hover:bg-indigo-100 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-300"
                  >
                    <Save className="h-3.5 w-3.5 text-indigo-600" />
                    <span>Save Paper</span>
                  </button>

                  <button
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:opacity-95"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download PDF</span>
                  </button>

                  <button
                    onClick={handleExportDOCX}
                    className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-slate-800 dark:border-slate-700"
                  >
                    <FileText className="h-3.5 w-3.5 text-purple-400" />
                    <span>Export DOCX</span>
                  </button>
                </div>
              </div>

              {/* Formatted Formal Exam Paper Sheet */}
              <div
                id="printable-question-paper"
                className="relative mx-auto rounded-3xl border border-slate-300 bg-white p-8 text-slate-900 shadow-2xl dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 sm:p-12 font-serif"
              >
                {/* Header Section */}
                <div className="border-b-2 border-slate-800 pb-4 text-center dark:border-slate-200">
                  <h1 className="text-xl font-bold uppercase tracking-wide">
                    {generatedPaper.institutionName}
                  </h1>
                  <h2 className="mt-1 text-base font-bold text-indigo-900 dark:text-indigo-300 font-sans">
                    {generatedPaper.subjectName} ({generatedPaper.courseCode})
                  </h2>
                  <div className="mt-3 flex flex-wrap justify-between text-xs font-bold font-sans text-slate-700 dark:text-slate-300 border-t border-slate-200 pt-2 dark:border-slate-800">
                    <span>TIME: {generatedPaper.durationMinutes} MINUTES</span>
                    <span>MAXIMUM MARKS: {generatedPaper.totalMarks}</span>
                  </div>
                </div>

                {/* General Instructions */}
                <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs font-sans border border-slate-200 dark:bg-slate-800/50 dark:border-slate-700">
                  <p className="font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                    General Instructions:
                  </p>
                  <ol className="list-decimal list-inside space-y-0.5 text-slate-700 dark:text-slate-300">
                    {generatedPaper.generalInstructions.map((inst, idx) => (
                      <li key={idx}>{inst}</li>
                    ))}
                  </ol>
                </div>

                {/* Sections */}
                <div className="mt-6 space-y-8">
                  {generatedPaper.sections.map((section, sIdx) => (
                    <div key={sIdx} className="space-y-4">
                      <div className="border-b border-slate-300 pb-1.5 dark:border-slate-700">
                        <h3 className="font-sans font-extrabold text-sm uppercase text-slate-900 dark:text-white flex justify-between">
                          <span>{section.title}</span>
                          <span className="text-xs font-semibold text-slate-500">
                            [{section.totalMarks || 10} Marks]
                          </span>
                        </h3>
                        <p className="text-xs italic text-slate-600 dark:text-slate-400 font-sans mt-0.5">
                          {section.instructions}
                        </p>
                      </div>

                      <div className="space-y-4">
                        {section.questions.map((q, qIdx) => (
                          <div
                            key={q.id || qIdx}
                            className="group relative rounded-xl p-3 border border-slate-100 hover:border-indigo-200 transition-colors dark:border-slate-800 dark:hover:border-slate-700"
                          >
                            <div className="flex justify-between items-start gap-4">
                              <p className="text-sm font-medium leading-relaxed font-sans">
                                <strong className="font-bold mr-1">Q{qIdx + 1}.</strong>
                                {q.questionText}
                              </p>

                              <div className="flex shrink-0 items-center gap-1.5 font-sans">
                                <span className="rounded bg-indigo-50 px-1.5 py-0.5 text-[10px] font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                                  {q.bloomLevel}
                                </span>
                                <span className="font-bold text-xs text-slate-800 dark:text-slate-200">
                                  [{q.marks} Marks]
                                </span>
                              </div>
                            </div>

                            {/* MCQ Options */}
                            {q.options && q.options.length > 0 && (
                              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs font-sans pl-4">
                                {q.options.map((opt, oIdx) => (
                                  <div
                                    key={oIdx}
                                    className="rounded border border-slate-200 p-2 dark:border-slate-700"
                                  >
                                    {opt}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Optional Answer Key Box */}
                            {showAnswers && q.answerKey && (
                              <div className="mt-3 rounded-lg bg-purple-50/80 p-2.5 text-xs font-sans border border-purple-200 text-purple-900 dark:bg-purple-950/50 dark:border-purple-800 dark:text-purple-200">
                                <span className="font-bold uppercase text-[10px] text-purple-700 dark:text-purple-300 block mb-0.5">
                                  Solution Scheme / Answer Key:
                                </span>
                                <p className="italic">{q.answerKey}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
