import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Topics = () => {
  const [topics] = useState([
    "Glycolysis",
    "Photosynthesis",
    "Mitosis",
    "DNA Replication",
    "Protein Metabolism",
    "Cell Membrane",
    "Genetics",
  ]);

  const [summaries, setSummaries] = useState({});
  const [loadingTopic, setLoadingTopic] = useState(null);
  const [error, setError] = useState(null);
const [selectedQuizCategory, setSelectedQuizCategory] = useState({});

  const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const navigate = useNavigate();


  const generateSummary = async (topic) => {
    setError(null);
    setLoadingTopic(topic);
    
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are an expert biology tutor who explains concepts clearly and engagingly.",
            },
            {
              role: "user",
              content: `
                Explain the topic: **${topic}** in biology.
                
                Your response must include:
                - A simple introduction of what it is
                - Why it matters in living organisms
                - The key steps or mechanisms involved
                - A relatable analogy (but only one)
                
                Write the explanation in **2–3 paragraphs**, each 4–6 sentences. 
                Avoid unnecessary jargon. Answer like you're teaching a motivated student who wants to truly understand.`
            },
          ],
          max_tokens: 400,
          temperature: 0.7,
        }),
      });

      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

      const data = await response.json();
      const summary = data.choices[0].message.content;

      setSummaries((prev) => ({ ...prev, [topic]: summary }));
    } catch (err) {
      console.error("Error generating summary:", err);
      setError("Failed to generate summary. Please try again later.");
    } finally {
      setLoadingTopic(null);
    }
  };

  const handleQuizStart = (topic) => {
  const quizCategory = selectedQuizCategory[topic];
  if (!quizCategory) {
    alert("Please select a quiz category first!");
    return;
  }
  // Navigate to quiz page with topic and category as URL params
  navigate(`/quiz/${encodeURIComponent(topic)}/${encodeURIComponent(quizCategory)}`);
};



    const quizCategories = [
      "Function",
      "Pathway",
      "Mechanism",
      "Regulation",
      "Application",
    ];

  return (
    <div className="px-6 py-8 bg-gray-50 min-h-[100vh]">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">Biological Topics</h1>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded-md">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-xs text-gray-500 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">#</th>
              <th className="px-6 py-3 text-left">Topic</th>
              <th className="px-6 py-3 text-left w-1/2">Summary</th>
              <th className="px-6 py-3 text-left">Quiz</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {topics.map((topic, index) => (
              <tr
                key={topic}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-gray-800">{topic}</td>

                {/* Summary cell */}
                <td className="px-6 py-4 text-gray-700 max-w-md">
                  {loadingTopic === topic ? (
                    <span className="text-gray-500 italic">
                      Generating summary...
                    </span>
                  ) : summaries[topic] ? (
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {summaries[topic]}
                    </p>
                  ) : (
                    <span className="text-gray-400 italic">No summary yet</span>
                  )}
                </td>

                {/* Quiz cell */}
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-2">
                    {/* Dropdown for quiz number */}
                    <select
                      value={selectedQuizCategory[topic] || ""}
                      onChange={(e) =>
                        setSelectedQuizCategory((prev) => ({
                          ...prev,
                          [topic]: e.target.value,
                        }))
                      }
                      className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="">Select Category</option>
                      {quizCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>


                    {/* Take Quiz button */}
                    <button
                      onClick={() => handleQuizStart(topic)}
                      disabled={!selectedQuizCategory[topic]}
                      className={`px-3 py-1 rounded-md text-white text-sm font-medium transition-all ${
                        selectedQuizCategory[topic]
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}

                    >
                      Take Quiz
                    </button>
                  </div>
                </td>

                {/* Summary generation button */}
                <td className="px-6 py-4">
                  <button
                    onClick={() => generateSummary(topic)}
                    disabled={loadingTopic === topic}
                    className={`px-3 py-1 rounded-md text-white text-sm font-medium transition-all ${
                      loadingTopic === topic
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {loadingTopic === topic ? "Loading..." : "Generate Summary"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Topics;
