import express from 'express';
import path from 'path';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const currentDirname = typeof __dirname !== 'undefined' ? __dirname : process.cwd();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy initialization of Groq AI client
function getGroqClient(): Groq {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error('GROQ_API_KEY environment variable is missing.');
  }
  return new Groq({ apiKey });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// AI Question Paper Generation endpoint using Groq
app.post('/api/generate-paper', async (req, res) => {
  try {
    const {
      institutionName = 'University Examination Board',
      courseCode = 'CS-101',
      subjectName = 'Data Structures & Algorithms',
      selectedChapters = [],
      totalMarks = 50,
      durationMinutes = 90,
      difficulty = 'Medium',
      difficultyRatio = { easy: 30, medium: 50, hard: 20 },
      questionTypes = {
        mcqCount: 5,
        mcqMarks: 2,
        shortCount: 3,
        shortMarks: 5,
        longCount: 2,
        longMarks: 12.5,
      },
      bloomDistribution = {
        Remember: 15,
        Understand: 25,
        Apply: 30,
        Analyze: 15,
        Evaluate: 10,
        Create: 5,
      },
      generalInstructions = [
        'All questions in Section A are compulsory.',
        'Answer any 3 questions from Section B.',
        'Draw neat diagrams wherever necessary.',
      ],
      includeAnswerKey = true,
    } = req.body;

    const groq = getGroqClient();

    const systemInstruction = `You are Bloomia AI, a world-class academic question paper designer and curriculum expert specializing in Bloom's Taxonomy aligned examination papers.
Your job is to generate a comprehensive, highly accurate, non-duplicative, university-level question paper based on the provided specifications.

CRITICAL CONSTRAINTS:
1. Syllabus Coverage: Strictly cover the specified chapters: ${selectedChapters.join(', ') || 'All syllabus units'}.
2. Bloom's Taxonomy Alignment: Ensure questions map accurately to Bloom's levels (Remember, Understand, Apply, Analyze, Evaluate, Create).
3. Question Formats & Sections:
   - Section A: Multiple Choice Questions (MCQs) (${questionTypes.mcqCount || 0} questions, ${questionTypes.mcqMarks || 2} marks each). Must provide 4 distinct options (A, B, C, D).
   - Section B: Short Answer Questions (${questionTypes.shortCount || 0} questions, ${questionTypes.shortMarks || 5} marks each).
   - Section C: Descriptive / Long Answer / Numerical / Code Questions (${questionTypes.longCount || 0} questions, ${questionTypes.longMarks || 10} marks each).
4. Marks Distribution: Ensure total marks equal ${totalMarks}.
5. Tone & Clarity: Professional, academic, precise, unambiguous. Include clear answer keys and step-by-step marking scheme / solutions for every question.
6. JSON Response: Output strictly valid JSON matching the exact schema specified in user prompt.`;

    const userPrompt = `Generate a ${totalMarks}-marks Question Paper for ${subjectName} (${courseCode}) at ${institutionName}.
Duration: ${durationMinutes} minutes.
Difficulty Level Target: ${difficulty} (Easy: ${difficultyRatio.easy}%, Medium: ${difficultyRatio.medium}%, Hard: ${difficultyRatio.hard}%).
Chapters covered: ${selectedChapters.join('; ')}.
Question breakdown requested:
- MCQs: ${questionTypes.mcqCount} questions of ${questionTypes.mcqMarks} marks each.
- Short Answer: ${questionTypes.shortCount} questions of ${questionTypes.shortMarks} marks each.
- Long Answer: ${questionTypes.longCount} questions of ${questionTypes.longMarks} marks each.
Bloom Taxonomy Weightage Emphasis:
- Remember: ${bloomDistribution.Remember}%
- Understand: ${bloomDistribution.Understand}%
- Apply: ${bloomDistribution.Apply}%
- Analyze: ${bloomDistribution.Analyze}%
- Evaluate: ${bloomDistribution.Evaluate}%
- Create: ${bloomDistribution.Create}%

Respond strictly with a JSON object following this format:
{
  "title": "${subjectName} Question Paper",
  "institutionName": "${institutionName}",
  "courseCode": "${courseCode}",
  "subjectName": "${subjectName}",
  "totalMarks": ${totalMarks},
  "durationMinutes": ${durationMinutes},
  "generalInstructions": ${JSON.stringify(generalInstructions)},
  "sections": [
    {
      "title": "Section A: Multiple Choice Questions",
      "instructions": "Answer all questions",
      "totalMarks": number,
      "questions": [
        {
          "id": "q1",
          "chapter": "Chapter name",
          "type": "MCQ",
          "bloomLevel": "Remember",
          "difficulty": "Easy",
          "marks": ${questionTypes.mcqMarks || 2},
          "questionText": "Question text...",
          "options": ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"],
          "answerKey": "A) Option 1",
          "explanation": "Explanation..."
        }
      ]
    }
  ]
}`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemInstruction },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.5,
    });

    const responseText = completion.choices[0]?.message?.content;

    if (!responseText) {
      throw new Error('Groq AI service returned empty response');
    }

    const paperData = JSON.parse(responseText);

    // Add unique IDs and timestamp
    const timestamp = new Date().toISOString().split('T')[0];
    const generatedPaper = {
      id: `paper-${Date.now()}`,
      ...paperData,
      selectedChapters,
      difficulty,
      difficultyBreakdown: difficultyRatio,
      bloomBreakdown: bloomDistribution,
      createdAt: timestamp,
      isSaved: false,
    };

    res.json({ success: true, paper: generatedPaper });
  } catch (error: any) {
    console.error('Error generating question paper:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate question paper.',
    });
  }
});

// Single AI question generator endpoint using Groq
app.post('/api/generate-question', async (req, res) => {
  try {
    const { subjectName, chapter, bloomLevel, difficulty, questionType, marks } = req.body;

    const groq = getGroqClient();

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content:
            'You are an academic question creator. Generate a single question matching user prompt. Output ONLY valid JSON containing: questionText, options (array of 4 strings if MCQ, null otherwise), answerKey, explanation.',
        },
        {
          role: 'user',
          content: `Generate a single ${difficulty} difficulty ${questionType} question worth ${marks} marks for subject ${subjectName}, chapter: ${chapter}. Bloom's Taxonomy Level: ${bloomLevel}.`,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.5,
    });

    const responseText = completion.choices[0]?.message?.content;

    if (!responseText) {
      throw new Error('Empty AI response');
    }

    const qData = JSON.parse(responseText);
    const newQuestion = {
      id: `q-${Date.now()}`,
      subjectId: subjectName ? subjectName.toLowerCase().replace(/\s+/g, '-') : 'general',
      subjectName: subjectName || 'General',
      chapter: chapter || 'General',
      type: questionType || 'Short Answer',
      bloomLevel: bloomLevel || 'Apply',
      difficulty: difficulty || 'Medium',
      marks: marks || 5,
      ...qData,
      createdAt: new Date().toISOString().split('T')[0],
    };

    res.json({ success: true, question: newQuestion });
  } catch (error: any) {
    console.error('Error generating question:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(currentDirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Bloomia AI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
