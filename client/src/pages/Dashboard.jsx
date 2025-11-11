import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import {getAuth} from "firebase/auth";

function Dashboard() {
    const auth = getAuth();
    const navigate = useNavigate();

    const topics = [
        { slug: "cell-biology-basics", title: "Cell Biology Basics", blurb: "Organelles, membranes, transport" },
        { slug: "mitosis-meiosis", title: "Mitosis & Meiosis", blurb: "Cell division, checkpoints" },
        { slug: "dna-replication", title: "DNA Replication", blurb: "Enzymes, fidelity, repair" },
    ];

    // Optional: search filter
    const [q, setQ] = useState("");
    const filtered = topics.filter(t =>
        (t.title + " " + t.blurb).toLowerCase().includes(q.toLowerCase())
    );

    function TopicList({ items }) {
        return (
            <div className="space-y-3">
                {items.map((t) => (
                    <div key={t.slug} className="rounded-lg border border-gray-200 bg-white p-3">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">{t.title}</h3>
                                <p className="mt-0.5 text-xs text-gray-500">{t.blurb}</p>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                            <button
                                onClick={() => navigate(`/read/${t.slug}`)}
                                className="rounded-md bg-gray-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-black"
                            >
                                Read
                            </button>
                            <button
                                onClick={() => navigate(`/quiz/${t.slug}`)}
                                className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-gray-400"
                            >
                                Quiz
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-sky-100 to-white py-8">
            <div className="mx-auto max-w-6xl px-4">
                <div className="rounded-2xl shadow-xl ring-1 ring-black/5 bg-white/80 backdrop-blur p-6 sm:p-8">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900">Topics</h1>
                            <p className="text-sm text-gray-500">Select a topic to begin reading or take a quiz.</p>
                        </div>
                        <div className="hidden md:flex items-center gap-3">
                            <input
                                type="search"
                                placeholder="Search topics…"
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                className="w-64 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400"
                            />
                        </div>
                    </div>

                    {/* Layout */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {/* LEFT: Topic list (now using TopicList) */}
                        <aside className="md:col-span-1">
                            <TopicList items={filtered} />
                        </aside>

                        {/* RIGHT: Detail / preview */}
                        <section className="md:col-span-2">
                            <div className="h-full rounded-xl border border-gray-200 bg-white p-6">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-gray-900">Select Topic</h2>
                                    <div className="flex items-center gap-2">
                                        <button className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white hover:bg-black">
                                            Read
                                        </button>
                                        <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:border-gray-400">
                                            Quiz
                                        </button>
                                    </div>
                                </div>

                                <p className="text-sm leading-6 text-gray-600">
                                    Choose a topic on the left to see a quick overview here. Use <span className="font-medium text-gray-800">Read</span> to open the
                                    learning module, or <span className="font-medium text-gray-800">Quiz</span> to test your understanding.
                                </p>

                                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                    <div className="rounded-lg border border-gray-200 bg-white p-4">
                                        <p className="text-xs uppercase tracking-wide text-gray-500">Progress</p>
                                        <p className="mt-1 text-2xl font-semibold text-gray-900">—</p>
                                    </div>
                                    <div className="rounded-lg border border-gray-200 bg-white p-4">
                                        <p className="text-xs uppercase tracking-wide text-gray-500">Last studied</p>
                                        <p className="mt-1 text-sm text-gray-800">—</p>
                                    </div>
                                </div>

                                <div className="mt-6 h-40 rounded-lg border border-dashed border-gray-300 bg-gray-50"></div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;