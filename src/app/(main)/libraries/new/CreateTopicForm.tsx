"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface QuizQuestion {
  question: string;
  answers: string[]; // Fixed to 4 answer options per question
  correctIndex: number; // 0-based index of the correct answer
}

function getYouTubeEmbedUrl(url: string): string {
    // A simple example to extract the video ID from common YouTube URL formats.
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regExp);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  }

export default function CreateTopicForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"VIDEO" | "ARTICLE">("VIDEO");
  const [videoUrl, setVideoUrl] = useState("");
  const [articleUrl, setArticleUrl] = useState("");
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([
    { question: "", answers: ["", "", "", ""], correctIndex: 0 },
    { question: "", answers: ["", "", "", ""], correctIndex: 0 },
    { question: "", answers: ["", "", "", ""], correctIndex: 0 },
  ]);

  const router = useRouter();

  // Add a new empty quiz question (max 5)
  const addQuestion = () => {
    if (quizQuestions.length < 5) {
      setQuizQuestions([
        ...quizQuestions,
        { question: "", answers: ["", "", "", ""], correctIndex: 0 },
      ]);
    }
  };

  // Remove the last quiz question (min 3)
  const removeQuestion = () => {
    if (quizQuestions.length > 3) {
      setQuizQuestions(quizQuestions.slice(0, -1));
    }
  };

  // Update a quiz question's field
  const updateQuestion = (
    index: number,
    field: "question" | "answers" | "correctIndex",
    value: string | number | string[],
    answerIndex?: number
  ) => {
    const updated = [...quizQuestions];
    if (field === "question") {
      updated[index].question = value as string;
    } else if (field === "answers" && typeof answerIndex === "number") {
      // Update one of the answer options
      const answers = [...updated[index].answers];
      answers[answerIndex] = value as string;
      updated[index].answers = answers;
    } else if (field === "correctIndex") {
      updated[index].correctIndex = value as number;
    }
    setQuizQuestions(updated);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validate: if quiz questions are provided, ensure there are between 3 and 5.
    if (quizQuestions.length < 3 || quizQuestions.length > 5) {
      alert("Quiz must have between 3 and 5 questions.");
      return;
    }

    // Construct body including quizQuestions
    const data = {
      title,
      description,
      type,
      videoUrl,
      articleUrl,
      quizQuestions, // We'll send the quiz questions as JSON
    };

    const res = await fetch("/api/topics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      console.error("Error creating topic");
      return;
    }

    router.push("/libraries");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold">Create a New Topic</h2>

      <div>
        <label className="block font-medium mb-1">Title</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Description</label>
        <textarea
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Topic Type</label>
        <select
          className="border border-gray-300 rounded px-3 py-2"
          value={type}
          onChange={(e) => setType(e.target.value as "VIDEO" | "ARTICLE")}
        >
          <option value="VIDEO">Video</option>
          <option value="ARTICLE">Article</option>
        </select>
      </div>

      {type === "VIDEO" && (
        <div>
          <label className="block font-medium mb-1">Video URL</label>
          <input
            type="url"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={videoUrl}
            onChange={(e) => setVideoUrl(getYouTubeEmbedUrl(e.target.value))}
            required
          />
        </div>
      )}

      {type === "ARTICLE" && (
        <div>
          <label className="block font-medium mb-1">Article URL</label>
          <input
            type="url"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={articleUrl}
            onChange={(e) => setArticleUrl(e.target.value)}
            required
          />
        </div>
      )}

      {/* Quiz Section */}
      <div className="border-t pt-4">
        <h3 className="text-lg font-semibold mb-2">
          Quiz (Optional: Provide between 3 and 5 questions)
        </h3>

        {quizQuestions.map((q, index) => (
          <div key={index} className="mb-4 p-4 border rounded">
            <label className="block font-medium mb-1">
              Question {index + 1}
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
              placeholder="Enter the question"
              value={q.question}
              onChange={(e) =>
                updateQuestion(index, "question", e.target.value)
              }
              required
            />

            <div className="space-y-2">
              {q.answers.map((ans, ansIndex) => (
                <div key={ansIndex} className="flex items-center gap-2">
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded px-3 py-2"
                    placeholder={`Answer option ${ansIndex + 1}`}
                    value={ans}
                    onChange={(e) =>
                      updateQuestion(index, "answers", e.target.value, ansIndex)
                    }
                    required
                  />
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name={`correct-${index}`}
                      checked={q.correctIndex === ansIndex}
                      onChange={() =>
                        updateQuestion(index, "correctIndex", ansIndex)
                      }
                    />
                    Correct
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex gap-4">
          {quizQuestions.length < 5 && (
            <button
              type="button"
              onClick={addQuestion}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Add Question
            </button>
          )}
          {quizQuestions.length > 3 && (
            <button
              type="button"
              onClick={removeQuestion}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Remove Question
            </button>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Create Topic
      </button>
    </form>
  );
}
