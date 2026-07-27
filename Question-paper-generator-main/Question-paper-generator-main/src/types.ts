export type BloomLevel = 'Remember' | 'Understand' | 'Apply' | 'Analyze' | 'Evaluate' | 'Create';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export type QuestionType = 'MCQ' | 'Short Answer' | 'Long Answer' | 'Numerical' | 'Code/Problem';

export interface Question {
  id: string;
  subjectId: string;
  subjectName: string;
  chapter: string;
  type: QuestionType;
  bloomLevel: BloomLevel;
  difficulty: DifficultyLevel;
  marks: number;
  questionText: string;
  options?: string[]; // For MCQs
  answerKey?: string;
  explanation?: string;
  createdAt: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  iconName: string;
  chapters: string[];
  description: string;
  questionCount: number;
}

export interface PaperSection {
  title: string; // e.g., "Section A (Multiple Choice Questions)"
  instructions: string;
  questions: Question[];
  totalMarks: number;
}

export interface QuestionPaper {
  id: string;
  title: string;
  institutionName: string;
  courseCode: string;
  subjectId: string;
  subjectName: string;
  selectedChapters: string[];
  totalMarks: number;
  durationMinutes: number;
  difficulty: DifficultyLevel | 'Mixed';
  difficultyBreakdown: { easy: number; medium: number; hard: number };
  bloomBreakdown: Record<BloomLevel, number>;
  sections: PaperSection[];
  generalInstructions: string[];
  createdAt: string;
  isSaved?: boolean;
}

export interface PaperConfig {
  institutionName: string;
  courseCode: string;
  subjectId: string;
  subjectName: string;
  selectedChapters: string[];
  totalMarks: number;
  durationMinutes: number;
  difficulty: DifficultyLevel | 'Mixed';
  difficultyRatio: { easy: number; medium: number; hard: number }; // Percentage total = 100
  questionTypes: {
    mcqCount: number;
    mcqMarks: number;
    shortCount: number;
    shortMarks: number;
    longCount: number;
    longMarks: number;
    numericalCount: number;
    numericalMarks: number;
  };
  bloomDistribution: Record<BloomLevel, number>; // Percentages total = 100
  generalInstructions: string[];
  includeAnswerKey: boolean;
}

export interface PaperTemplate {
  id: string;
  name: string;
  description: string;
  subjectId: string;
  subjectName: string;
  totalMarks: number;
  durationMinutes: number;
  difficulty: DifficultyLevel | 'Mixed';
  questionTypesSummary: string;
  bloomFocus: string;
  config: Partial<PaperConfig>;
  createdAt: string;
}

export interface AnalyticsData {
  totalPapers: number;
  totalQuestions: number;
  totalSubjects: number;
  qualityScore: number;
  monthlyTrends: { month: string; papers: number; questions: number }[];
  subjectDistribution: { name: string; value: number; color: string }[];
  bloomDistribution: { level: BloomLevel; count: number; percentage: number }[];
  difficultyDistribution: { name: string; count: number }[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'Educator' | 'Professor' | 'Admin';
  institution: string;
  department: string;
  plan: 'Free' | 'Pro' | 'Enterprise';
  avatarUrl?: string;
}
