import React, { useState, useEffect } from "react";

// Sample quiz data with the required structure
const sampleQuizzes = [
  { id: "quiz-1", topic: "Protein Metabolism", quiz: "Quiz 1", score: 85, attempts: 2, status: "Passed", date: "08/10/2025" },
  { id: "quiz-2", topic: "Glycolysis", quiz: "Quiz 2", score: 65, attempts: 1, status: "Attempted", date: "08/15/2025" },
  { id: "quiz-3", topic: "Cell Cycle", quiz: "Quiz 1", score: 45, attempts: 3, status: "Failed", date: "08/20/2025" },
  { id: "quiz-4", topic: "DNA Replication", quiz: "Quiz 2", score: 92, attempts: 1, status: "Passed", date: "08/25/2025" },
  { id: "quiz-5", topic: "Photosynthesis", quiz: "Quiz 3", score: 78, attempts: 2, status: "Attempted", date: "09/01/2025" },
  { id: "quiz-6", topic: "Enzyme Kinetics", quiz: "Quiz 1", score: 88, attempts: 1, status: "Passed", date: "09/05/2025" },
];

const Dashboard = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    setQuizzes(sampleQuizzes);
  }, []);

  // Stats calculation
  const total = quizzes.length;
  const attempted = quizzes.filter(quiz => quiz.status === "Attempted").length;
  const passed = quizzes.filter(quiz => quiz.status === "Passed").length;
  const failed = quizzes.filter(quiz => quiz.status === "Failed").length;

  const filteredQuizzes = selectedStatus === "All" 
    ? quizzes 
    : quizzes.filter(quiz => quiz.status === selectedStatus);

  const handleDelete = async (id) => {
    try {
      setQuizzes(quizzes.filter(quiz => quiz.id !== id));
    } catch (err) {
      console.error('Failed to delete quiz:', err);
    }
  };

  const handleRetake = (quiz) => {
    console.log('Retaking quiz:', quiz.id);
    // TODO: Navigate to quiz retake page
  };

  const handleAnalytics = (quiz) => {
    console.log('Viewing analytics for quiz:', quiz.id);
    // TODO: Navigate to analytics page
  };

  return (
    <div className="px-6 py-8 bg-gray-50 min-h-[100vh]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Quiz Dashboard</h1>
        <button
          onClick={() => console.log('Add new quiz')}
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Take a Quiz
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          ['Total Quizzes', total, '📘', 'bg-blue-100', 'All'],
          ['Attempted', attempted, '✏️', 'bg-yellow-100', 'Attempted'],
          ['Passed', passed, '✅', 'bg-green-100', 'Passed'],
          ['Failed', failed, '❌', 'bg-red-100', 'Failed']
        ].map(([label, count, icon, bg, status], idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setSelectedStatus(status)}
            className={`bg-white border rounded-lg p-4 flex items-center gap-3 shadow-sm transition-all duration-150 focus:outline-none ${selectedStatus === status ? 'ring-2 ring-blue-400 border-blue-400' : ''}`}
            style={{ cursor: 'pointer' }}
          >
            <div className={`p-2 rounded-full ${bg} text-lg`}>{icon}</div>
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="text-2xl font-bold text-gray-800">{count}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Quiz table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-md font-semibold text-gray-800">Quiz Attempts</h2>
          <select
            className="text-sm border rounded px-3 py-1 text-gray-700"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Attempted">Attempted</option>
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
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      quiz.score >= 80 ? 'bg-green-100 text-green-700' :
                      quiz.score >= 60 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
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
