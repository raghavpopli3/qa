import React, { useState } from 'react';
import {
  History,
  FileText,
  Search,
  Eye,
  Download,
  Copy,
  Trash2,
  Calendar,
  Clock,
  Award,
  X,
  Printer,
} from 'lucide-react';
import { QuestionPaper } from '../types';

interface PreviousPapersProps {
  papers: QuestionPaper[];
  onDeletePaper: (id: string) => void;
  onDuplicatePaper: (paper: QuestionPaper) => void;
}

export const PreviousPapers: React.FC<PreviousPapersProps> = ({
  papers,
  onDeletePaper,
  onDuplicatePaper,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPaper, setSelectedPaper] = useState<QuestionPaper | null>(null);

  const filteredPapers = papers.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="sleek-card flex flex-col justify-between gap-4 rounded-3xl p-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <History className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            Previous Papers Archive
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Access, preview, export or duplicate all previously generated examination papers.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search saved papers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl border border-slate-200/80 bg-slate-100/60 py-2 pl-9 pr-3 text-xs text-slate-800 focus:border-violet-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200"
          />
        </div>
      </div>

      {/* Grid of Papers */}
      {filteredPapers.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center text-slate-500 dark:border-slate-700">
          <FileText className="mx-auto h-10 w-10 text-slate-400 mb-2" />
          <p className="font-bold text-sm">No saved question papers found</p>
          <p className="text-xs">Generate your first question paper in the Generate Paper tab.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPapers.map((paper) => (
            <div
              key={paper.id}
              className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-lg bg-indigo-100 px-2.5 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    {paper.courseCode}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {paper.createdAt}
                  </span>
                </div>

                <h3 className="mt-3 font-extrabold text-slate-900 dark:text-white text-base leading-snug">
                  {paper.title}
                </h3>
                <p className="mt-1 text-xs font-semibold text-slate-600 dark:text-slate-400">
                  {paper.subjectName}
                </p>

                <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 dark:bg-slate-800">
                    <Award className="h-3 w-3 text-indigo-500" /> {paper.totalMarks} Marks
                  </span>
                  <span className="flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 dark:bg-slate-800">
                    <Clock className="h-3 w-3 text-purple-500" /> {paper.durationMinutes} Mins
                  </span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-6 flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setSelectedPaper(paper)}
                  className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Preview</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onDuplicatePaper(paper)}
                    className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                    title="Duplicate Paper"
                  >
                    <Copy className="h-4 w-4 text-purple-600" />
                  </button>
                  <button
                    onClick={() => onDeletePaper(paper.id)}
                    className="rounded-lg p-1.5 text-slate-500 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40"
                    title="Delete Paper"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Paper Preview Modal */}
      {selectedPaper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="sticky top-0 z-10 flex items-center justify-between bg-white pb-4 border-b border-slate-100 dark:bg-slate-900 dark:border-slate-800">
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">
                  {selectedPaper.title}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedPaper.subjectName} ({selectedPaper.courseCode}) • {selectedPaper.totalMarks} Marks
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white"
                >
                  <Printer className="h-3.5 w-3.5" /> Print / PDF
                </button>
                <button
                  onClick={() => setSelectedPaper(null)}
                  className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Paper Document Preview */}
            <div className="mt-6 space-y-6 font-serif text-slate-900 dark:text-slate-100 p-4 border rounded-2xl bg-slate-50/50 dark:bg-slate-950/50">
              <div className="text-center border-b pb-4">
                <h2 className="text-xl font-bold uppercase">{selectedPaper.institutionName}</h2>
                <h3 className="text-sm font-sans font-bold text-indigo-700">{selectedPaper.subjectName} ({selectedPaper.courseCode})</h3>
                <p className="text-xs font-sans mt-1">TIME: {selectedPaper.durationMinutes} MINS | MAX MARKS: {selectedPaper.totalMarks}</p>
              </div>

              {selectedPaper.sections.map((sec, idx) => (
                <div key={idx} className="space-y-3 font-sans">
                  <h4 className="font-bold text-sm uppercase text-slate-800 border-b pb-1">{sec.title}</h4>
                  <div className="space-y-3">
                    {sec.questions.map((q, qIdx) => (
                      <div key={qIdx} className="text-xs space-y-1">
                        <div className="flex justify-between font-medium">
                          <span><strong>Q{qIdx + 1}.</strong> {q.questionText}</span>
                          <span className="font-bold shrink-0">[{q.marks}M]</span>
                        </div>
                        {q.options && (
                          <div className="grid grid-cols-2 gap-2 pl-4 text-[11px]">
                            {q.options.map((opt, oIdx) => (
                              <div key={oIdx} className="rounded border p-1">{opt}</div>
                            ))}
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
  );
};
