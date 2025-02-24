import prisma from "@/lib/prisma";
import QuizPlayer from "./QuizPlayer";
import { notFound } from "next/navigation";
import { QuizQuestion } from "./types";

function isQuizQuestionArray(value: unknown): value is QuizQuestion[] {
  if (!Array.isArray(value)) return false;
  return value.every(
    (item) =>
      typeof item?.question === "string" &&
      Array.isArray(item?.answers) &&
      item.answers.every((ans: unknown) => typeof ans === "string") &&
      typeof item?.correctIndex === "number"
  );
}

export default async function TopicDetailPage(props: { params: { topicId: string } }) {
  const { params } = props;
  const { topicId } = await Promise.resolve(params);

  const topic = await prisma.topic.findUnique({
    where: { id: topicId },
    include: { quiz: true },
  });

  if (!topic) {
    return notFound();
  }

  let quizQuestions: QuizQuestion[] = [];
  if (topic.quiz?.questions) {
    quizQuestions = topic.quiz.questions;
  }

  // Determine embedUrl: for VIDEO use videoUrl; for ARTICLE use articleUrl.
  let embedUrl: string | undefined;
  if (topic.type === "VIDEO" && topic.videoUrl) {
    embedUrl = topic.videoUrl;
  } else if (topic.type === "ARTICLE" && topic.articleUrl) {
    embedUrl = topic.articleUrl;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">{topic.title}</h1>
      <p className="text-gray-600 mb-4">{topic.description}</p>

      {/* For ARTICLE topics, if you wish to show a link fallback, you can add one here */}
      {topic.type === "ARTICLE" && !embedUrl && topic.articleUrl && (
        <a
          href={topic.articleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline mb-6 block"
        >
          Read Article
        </a>
      )}

      {/* Render QuizPlayer with the embedUrl (either video or article) */}
      {quizQuestions.length > 0 ? (
        <QuizPlayer questions={quizQuestions} embedUrl={embedUrl} />
      ) : (
        <p className="text-gray-500">No quiz available for this topic yet.</p>
      )}
    </div>
  );
}
