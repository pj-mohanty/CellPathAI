
import React, { useState } from "react";

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


  const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

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
              content: `Write a detailed, easy-to-understand explanation of ${topic} in biology. Include 2–3 paragraphs with biological importance, key steps, and analogies where helpful.`,
            },
          ],
          max_tokens: 400,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      const summary = data.choices[0].message.content;

      setSummaries((prev) => ({
        ...prev,
        [topic]: summary,
      }));
    } catch (err) {
      console.error("Error generating summary:", err);
      setError("Failed to generate summary. Please try again later.");
    } finally {
      setLoadingTopic(null);
    }
  };

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
              <tr key={topic} className="border-t hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-gray-800">{topic}</td>

                {/* Summary Column */}
                <td className="px-6 py-4 text-gray-700 max-w-md">
                  {loadingTopic === topic ? (
                    <span className="text-gray-500 italic">Generating summary...</span>
                  ) : summaries[topic] ? (
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {summaries[topic]}
                    </p>
                  ) : (
                    <span className="text-gray-400 italic">No summary yet</span>
                  )}
                </td>

                {/* 🧪 Quiz Column */}
                <td className="px-6 py-4 text-gray-700">
                  <p className="text-gray-400 italic mb-2">
                    Coming soon
                  </p>
                  <button
                    disabled
                    className="px-3 py-1 bg-gray-300 text-white text-sm rounded-md cursor-not-allowed"
                  >
                    Take Quiz
                  </button>
                </td>

                {/* Actions Column */}
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
