import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/dashboard/quizzes");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();

        const formatted = data.map(q => ({
          ...q,
          createdAt: q.createdAt?.seconds
            ? new Date(q.createdAt.seconds * 1000).toLocaleDateString()
            : q.createdAt,
          updatedAt: q.updatedAt?.seconds
            ? new Date(q.updatedAt.seconds * 1000).toLocaleDateString()
            : q.updatedAt,
        }));

        setQuizzes(formatted);
      } catch (err) {
        console.error("Failed to fetch quizzes:", err);
        setError("Failed to load quizzes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const total = quizzes.length;
  const passed = quizzes.filter(q => Number(q.score) >= 50).length;
  const failed = quizzes.filter(q => Number(q.score) < 50).length;

  const filteredQuizzes = selectedStatus === "All"
    ? quizzes
    : selectedStatus === "Passed"
    ? quizzes.filter(q => Number(q.score) >= 50)
    : selectedStatus === "Failed"
    ? quizzes.filter(q => Number(q.score) < 50)
    : quizzes;


  const handleDelete = async (id) => {
    setQuizzes(quizzes.filter(q => q.id !== id));
  };

  const handleRetake = (quiz) => {
    console.log("Retaking quiz:", quiz.id);
  };

  const handleAnalytics = (quiz) => {
    console.log("Viewing analytics for quiz:", quiz.id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[100vh]">
        <p className="text-gray-600 text-lg">Loading quizzes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[100vh]">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-8 bg-gray-50 min-h-[100vh]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Quiz Dashboard</h1>
        <button
          onClick={() => console.log("Take new quiz")}
          className="bg-green-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Take new Quiz
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          ["Total", total, "📘", "bg-blue-100", "All"],
          ["Passed (>50%)", passed, "✅", "bg-green-100", "Passed"],
          ["Failed (<50%)", failed, "❌", "bg-red-100", "Failed"],
        ].map(([label, count, icon, bg, status], idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setSelectedStatus(status)}
            className={`bg-white border rounded-lg p-4 flex items-center gap-3 shadow-sm transition-all duration-150 focus:outline-none ${selectedStatus === status ? "ring-2 ring-blue-400 border-blue-400" : ""}`}
          >
            <div className={`p-2 rounded-full ${bg} text-lg`}>{icon}</div>
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="text-2xl font-bold text-gray-800">{count}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-md font-semibold text-gray-800">
            Quiz Attempts
            {selectedStatus !== "All" && (
              <span className="text-sm text-gray-500 ml-2">
                (Filtered: {selectedStatus} - {filteredQuizzes.length} quizzes)
              </span>
            )}
          </h2>
          <select
            className="text-sm border rounded px-3 py-1 text-gray-700"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Passed">Passed</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        <table className="w-full text-sm">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Sl. no</th>
              <th className="px-6 py-3 text-left">Topic</th>
              <th className="px-6 py-3 text-left">Quiz no.</th>
              <th className="px-6 py-3 text-left">Score</th>
              <th className="px-6 py-3 text-left">Attempts</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuizzes.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No quizzes found.
                </td>
              </tr>
            ) : (
              filteredQuizzes.map((quiz, index) => (
                <tr key={quiz.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-800">{index + 1}</td>
                  <td className="px-6 py-4">{quiz.topic}</td>
                  <td className="px-6 py-4">{quiz.quiz}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        Number(quiz.score) >= 50
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {quiz.score}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{quiz.attempts}</td>
                  <td className="px-6 py-4 text-gray-700">{quiz.date}</td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <button
                      onClick={() => handleRetake(quiz)}
                      className="text-blue-600 hover:text-blue-800 text-lg"
                      title="Retake Quiz"
                    >
                      🔄
                    </button>
                    <button
                      onClick={() => handleDelete(quiz.id)}
                      className="text-red-600 hover:text-red-800 text-lg"
                      title="Delete Quiz"
                    >
                      🗑️
                    </button>
                    <button
                      onClick={() => handleAnalytics(quiz)}
                      className="text-green-600 hover:text-green-800 text-lg"
                      title="View Analytics"
                    >
                      📊
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
