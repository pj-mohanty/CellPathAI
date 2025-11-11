import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MetricCard,
  ChartCard,
  Card,
  CustomPieChart,
  CustomBarChart,
  Legend,
} from "../components/AnalyticsComponents";


/** QUIZ ANALYTICS DASHBOARD **/
const QuizAnalyticsDashboard = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("All");

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/dashboard/quizzes");
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        const data = await res.json();
        setQuizzes(data);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
        setError("Failed to load quizzes.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  if (loading) return <p className="p-10 text-gray-600 text-center">Loading analytics...</p>;
  if (error) return <p className="p-10 text-red-600 text-center">{error}</p>;
  if (quizzes.length === 0) return <p className="p-10 text-center text-gray-500">No quiz data yet.</p>;

  // --- Derived analytics ---
  
  const total = quizzes.length;
  const passed = quizzes.filter((q) => q.score >= 50).length;
  const failed = total - passed;
  const avgScore = (quizzes.reduce((sum, q) => sum + q.score, 0) / total).toFixed(1);
  const avgAttempts = (quizzes.reduce((sum, q) => sum + (q.attempts || 1), 0) / total).toFixed(1);

  const recentActivity = quizzes.slice(-5).reverse();
  const bestTopic = quizzes.reduce((a, b) => (a.score > b.score ? a : b), quizzes[0]);

  const scoreDistribution = quizzes.map((q) => ({
    name: q.topic,
    value: q.score,
  }));

   const handleTakeNewQuiz = () => {
      navigate("/topics");
    };
  const pieData = [
    { name: "Passed", value: passed, color: "#22c55e" },
    { name: "Failed", value: failed, color: "#ef4444" },
  ];

  const filtered = selectedFilter === "All"
    ? quizzes
    : selectedFilter === "Passed"
    ? quizzes.filter((q) => q.score >= 50)
    : quizzes.filter((q) => q.score < 50);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">📊 Quiz Analytics</h1>
          <button
          onClick={handleTakeNewQuiz}
          className="bg-green-600 text-white text-sm px-4 py-2 rounded-md hover:bg-green-700"
        >
          Take New Quiz
        </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <MetricCard title="Total Quizzes" value={total} icon="📘" bg="blue" />
          <MetricCard title="Passed" value={passed} icon="✅" bg="green" />
          <MetricCard title="Failed" value={failed} icon="❌" bg="red" />
          <MetricCard title="Average Score" value={`${avgScore}%`} icon="📈" bg="purple" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Performance Overview">
            <CustomPieChart data={pieData} />
            <Legend items={pieData} />
          </ChartCard>

          <ChartCard title="Score Distribution">
            <CustomBarChart data={scoreDistribution} />
          </ChartCard>
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Recent Activity">
            {recentActivity.map((quiz, idx) => (
              <div key={idx} className="flex justify-between py-2 border-b">
                <p className="text-gray-700">{quiz.topic}</p>
                <span className={`text-sm font-semibold ${quiz.score >= 50 ? "text-green-600" : "text-red-600"}`}>
                  {quiz.score}%
                </span>
              </div>
            ))}
          </Card>

          <Card title="Performance Insights">
            <ul className="space-y-2 text-gray-700">
              <li>🏆 <strong>Best Topic:</strong> {bestTopic.topic} ({bestTopic.score}%)</li>
              <li>📅 <strong>Last Quiz:</strong> {recentActivity[0].topic} on {recentActivity[0].date}</li>
              <li>🌀 <strong>Average Attempts:</strong> {avgAttempts}</li>
            </ul>
          </Card>
        </div>

        {/* Table */}
        <Card title="Quiz Attempts">
          <div className="flex justify-between mb-3">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="border rounded px-3 py-1 text-sm"
            >
              <option value="All">All</option>
              <option value="Passed">Passed</option>
              <option value="Failed">Failed</option>
            </select>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Topic</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Score</th>
                <th className="px-4 py-2 text-left">Attempts</th>
                <th className="px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((q, i) => (
                <tr key={q.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2">{q.topic}</td>
                  <td className="px-4 py-2">{q.category}</td>
                  <td className="px-4 py-2 font-semibold">{q.score}%</td>
                  <td className="px-4 py-2">{q.attempts}</td>
                  <td className="px-4 py-2">{q.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

      </div>
    </div>
  );
};

export default QuizAnalyticsDashboard;
