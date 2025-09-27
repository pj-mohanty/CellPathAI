import React, { useState } from "react";

const Dashboard = () => {
  const [filterStatus, setFilterStatus] = useState("All");

  const stats = [
    { id: "total", label: "Total Quizzes", value: 8, color: "bg-blue-100 text-blue-700", icon: "📘" },
    { id: "attempted", label: "Attempted", value: 5, color: "bg-yellow-100 text-yellow-700", icon: "✏️" },
    { id: "passed", label: "Passed", value: 3, color: "bg-green-100 text-green-700", icon: "✅" },
    { id: "failed", label: "Failed", value: 2, color: "bg-red-100 text-red-700", icon: "❌" },
  ];

  const quizzes = [
    { id: "quiz-1", title: "Quiz 1", subject: "Protein Metabolism", status: "Passed", date: "08/10/2025" },
    { id: "quiz-2", title: "Quiz 3", subject: "Glycolysis", status: "Attempted", date: "08/15/2025" },
    { id: "quiz-3", title: "Quiz 1", subject: "Cell Cycle", status: "Failed", date: "08/20/2025" },
    { id: "quiz-4", title: "Quiz 2", subject: "DNA Replication", status: "Passed", date: "08/25/2025" },
  ];

  const filteredQuizzes = filterStatus === "All" 
    ? quizzes 
    : quizzes.filter(quiz => quiz.status === filterStatus);

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleQuizAction = (action, quizId) => {
    console.log(`${action} quiz: ${quizId}`);
    // TODO: Implement actual functionality
  };

  return (
    <div className="p-6 space-y-8">
      {/* Top stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" role="region" aria-label="Quiz Statistics">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className={`p-6 rounded-xl shadow-md flex items-center gap-4 border border-gray-200`}
            role="article"
            aria-label={`${stat.label}: ${stat.value}`}
          >
            <div className={`text-3xl ${stat.color} rounded-full p-3`} aria-hidden="true">{stat.icon}</div>
            <div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quiz table */}
      <div className="bg-white shadow-md rounded-xl">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Quiz Tracker</h2>
          <div className="flex items-center gap-2">
            <label htmlFor="status-filter" className="text-sm text-gray-600">
              Filter by status:
            </label>
            <select 
              id="status-filter"
              value={filterStatus}
              onChange={handleFilterChange}
              className="border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Filter quizzes by status"
            >
              <option value="All">All</option>
              <option value="Attempted">Attempted</option>
              <option value="Passed">Passed</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" role="table" aria-label="Quiz tracking table">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-sm font-medium text-gray-600">Quiz Title</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-600">Subject</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-600">Status</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-600">Date</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuizzes.map((quiz) => (
                <tr key={quiz.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium">{quiz.title}</td>
                  <td className="px-6 py-3">{quiz.subject}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        quiz.status === "Passed"
                          ? "bg-green-100 text-green-700"
                          : quiz.status === "Failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                      role="status"
                      aria-label={`Status: ${quiz.status}`}
                    >
                      {quiz.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">{quiz.date}</td>
                  <td className="px-6 py-3">
                    <div className="flex gap-3">
                      <button 
                        onClick={() => handleQuizAction("edit", quiz.id)}
                        className="text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
                        aria-label={`Edit ${quiz.title} quiz`}
                        title="Edit quiz"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleQuizAction("delete", quiz.id)}
                        className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-1"
                        aria-label={`Delete ${quiz.title} quiz`}
                        title="Delete quiz"
                      >
                        🗑️
                      </button>
                      <button 
                        onClick={() => handleQuizAction("view", quiz.id)}
                        className="text-purple-500 hover:text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded p-1"
                        aria-label={`View analytics for ${quiz.title} quiz`}
                        title="View analytics"
                      >
                        📊
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredQuizzes.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No quizzes found for the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
