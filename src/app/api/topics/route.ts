import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";
import { nanoid } from "nanoid";

export async function POST(request: Request) {
  const session = await validateRequest();
  if (!session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const { title, description, type, videoUrl, articleUrl, quizQuestions } = data;

  try {
    const newTopic = await prisma.topic.create({
      data: {
        id: nanoid(),
        title,
        description,
        type,
        videoUrl: type === "VIDEO" ? videoUrl : null,
        articleUrl: type === "ARTICLE" ? articleUrl : null,
        contributedById: session.user.id,
        // If quizQuestions are provided and valid, create a nested Quiz record.
        quiz:
          quizQuestions &&
          Array.isArray(quizQuestions) &&
          quizQuestions.length >= 3 &&
          quizQuestions.length <= 5
            ? {
                create: {
                  id: nanoid(), // Provide an id for the quiz.
                  questions: quizQuestions,
                },
              }
            : undefined,
      },
    });

    return NextResponse.json(newTopic);
  } catch (error) {
    console.error("Error creating topic:", error);
    return NextResponse.json({ error: "Failed to create topic" }, { status: 500 });
  }
}
