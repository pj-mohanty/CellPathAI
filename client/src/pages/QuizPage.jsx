import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const QuizPage = () => {
  const { topic, category } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

  useEffect(() => {
    const generateQuiz = async () => {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            { role: "system", content: "Create a clear MCQ quiz with one correct answer." },
            { role: "user", content: `
Generate 5 MCQs on **${topic}** under category **${category}**.
Each question:
- 4 options
- Return JSON only:
{"quiz":[{"question": "...","options": ["A","B","C","D"],"answer": "B"}]}` }
          ],
        }),
      });
      const data = await res.json();
      setQuestions(JSON.parse(data.choices[0].message.content).quiz);
    };
    generateQuiz();
  }, [topic, category]);

  const saveResult = async (finalScore) => {
    await fetch("http://localhost:8080/api/dashboard/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic,
        category,
        score: Math.round((finalScore / questions.length) * 100),
        attempts: 1,
        date: new Date().toLocaleDateString()
      }),
    });
  };

  const submitQuiz = async () => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) correct++;
    });
    setScore(correct);
    setSubmitted(true);
    saveResult(correct);
  };

  return (
    <div className="px-6 py-8 min-h-screen bg-gray-50">
      <button onClick={() => navigate(-1)} className="mb-4 px-3 py-1 bg-gray-200 rounded">← Back</button>
      <h1 className="text-2xl font-semibold mb-4">Quiz on {topic} — {category}</h1>

      {submitted && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-900 font-semibold rounded">
          🎉 Your Score: {score} / {questions.length} ({Math.round((score / questions.length) * 100)}%)
        </div>
      )}

      {questions.map((q, i) => (
        <div key={i} className="mb-4 p-4 bg-white rounded shadow">
          <p className="font-semibold">{i + 1}. {q.question}</p>
          {q.options.map((opt) => {
            const correct = submitted && opt === q.answer;
            const wrong = submitted && answers[i] === opt && opt !== q.answer;
            return (
              <label key={opt} className={`block p-2 border rounded my-1 cursor-pointer
                ${correct ? "bg-green-100 border-green-600" : ""}
                ${wrong ? "bg-red-100 border-red-600" : ""}`}>
                <input type="radio" disabled={submitted}
                  checked={answers[i] === opt}
                  onChange={() => setAnswers((prev) => ({ ...prev, [i]: opt }))} />
                {" "}{opt}
              </label>
            );
          })}
        </div>
      ))}

      {!submitted && (
        <button onClick={submitQuiz} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
          Submit Quiz
        </button>
      )}
    </div>
  );
};

export default QuizPage;
