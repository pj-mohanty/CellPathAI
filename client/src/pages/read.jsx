import React, {useState} from "react";
import { useParams } from "react-router-dom";
import {useNavigate} from "react-router-dom";

function Read() {
    const navigate = useNavigate();

    let slug = useParams().postId;
    const title = '';
    const summary = '';

    switch(slug) {
        case "glycolysis":
            //placeholder
            break;
        case "photosynthesis":
            //placeholder
            break;
        case "mitosis":
            //placeholder
            break;
        case "dna-replication":
            //placeholder
            break;
        case "protein-metabolism":
            //placeholder
            break;
        case "cell-membrane":
            //placeholder
            break;
        case "genetics":
            //placeholder
            break;

    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white py-8">
            <div className="mx-auto max-w-4xl px-4">
                <div className="rounded-2xl shadow-xl ring-1 ring-black/5 bg-white/80 backdrop-blur p-6 sm:p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => navigate(`/quiz/${slug}`)}
                                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:border-gray-400"
                            >
                                Take Quiz
                            </button>
                            <a
                                href="/"
                                className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white hover:bg-black"
                            >
                                Back
                            </a>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="mt-6 space-y-6">
                        {/* placeholder for actual AI summary */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Read;