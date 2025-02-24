"use client";

import { useState } from "react";
import { QuizQuestion } from "./types";

interface QuizPlayerProps {
  questions: QuizQuestion[];
  embedUrl?: string;
}

export default function QuizPlayer({ questions, embedUrl }: QuizPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  // An array to store the selected answer index for each question; initially null.
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );

  const currentQuestion = questions[currentIndex];
  const currentSelected = selectedAnswers[currentIndex];

  // Determine if the selected answer for the current question is correct.
  const isCorrect = currentSelected === currentQuestion.correctIndex;

  function handleAnswerClick(answerIndex: number) {
    // Update the selection for the current question.
    const newSelections = [...selectedAnswers];
    newSelections[currentIndex] = answerIndex;
    setSelectedAnswers(newSelections);
  }

  function handleNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      alert("Quiz completed!");
    }
  }

  function handleBack() {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left side: Embed content */}
      <div className="flex-1 bg-gray-100 rounded p-4">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            className="w-full aspect-video rounded"
            allowFullScreen
          />
        ) : (
          <div className="w-full aspect-video bg-gray-300 flex items-center justify-center rounded">
            <span className="text-gray-500">Content Placeholder</span>
          </div>
        )}
      </div>

      {/* Right side: Quiz question and navigation */}
      <div className="flex-1 bg-white rounded p-4 shadow flex flex-col">
        {/* Step indicators */}
        <div className="flex items-center space-x-2 mb-4">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-8 h-8 rounded-full flex items-center justify-center
                ${
                  index === currentIndex
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }
              `}
            >
              {index + 1}
            </div>
          ))}
        </div>

        {/* Current question */}
        <h2 className="text-lg font-semibold mb-3">{currentQuestion.question}</h2>

        {/* Answer choices */}
        <div className="space-y-2 mb-4">
          {currentQuestion.answers.map((answer, i) => {
            let bgColor = "bg-white"; // default
            if (currentSelected !== null && currentSelected === i) {
              bgColor =
                i === currentQuestion.correctIndex ? "bg-green-200" : "bg-red-200";
            }
            return (
              <button
                key={i}
                onClick={() => handleAnswerClick(i)}
                className={`block w-full text-left p-3 border border-gray-200 rounded hover:bg-gray-50 ${bgColor}`}
              >
                <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
                {answer}
              </button>
            );
          })}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentIndex === 0}
            className={`px-4 py-2 rounded ${
              currentIndex === 0
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!isCorrect}
            className={`px-4 py-2 rounded ${
              !isCorrect
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : currentIndex < questions.length - 1
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {currentIndex < questions.length - 1 ? "Next" : "Finish"}
          </button>
        </div>

        {/* Optional feedback message */}
        {currentSelected !== null && !isCorrect && (
          <div className="mt-4 text-center text-red-600 font-semibold">
            Incorrect, please try again.
          </div>
        )}
      </div>
    </div>
  );
}
